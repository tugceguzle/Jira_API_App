import express from 'express';
import fetch from 'node-fetch';
import pkg from 'pg';
import cors from 'cors'
import dotenv from 'dotenv';


const { Pool } = pkg;
const app = express();
app.use(cors());
const port = 3000;
dotenv.config();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DB,
    password: process.env.DB_PASS,
    port: 5432,
  });
  

const fetchJiraData = async () => {
    try {
      const response = await fetch(process.env.JIRA_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${process.env.JIRA_USERNAME}:${process.env.JIRA_API_TOKEN}`).toString('base64'),
          'Accept': 'application/json',
        },
        qs: {
          jql: 'project = KAN',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching data from Jira: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.issues;
    } catch (error) {
      console.error('Error fetching data from Jira:', error);
      return [];
    }
  };

const saveDataToPostgres = async (data) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const insertQuery = 'INSERT INTO jira_issues (id, key, summary , reporter_name , created_at) VALUES ($1, $2, $3 , $4 , $5) ON CONFLICT (id) DO NOTHING';

    // Proje ID= {event.id} - Proje KEY= {event.key} - Summary= {event.fields.summary} - Tarih {event.fields.created} - Kullanıcı - {event.fields.creator.displayName}

    for (const issue of data) {
      await client.query(insertQuery, [issue.id, issue.key, issue.fields.summary ,  issue.fields.creator.displayName ,issue.fields.created]);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving data to PostgreSQL:', error);
  } finally {
    client.release();
  }
};

//verileri jiradan database tarafına aktarmak için 
app.get('/fetch-and-save', async (req, res) => {
  const jiraData = await fetchJiraData();
  await saveDataToPostgres(jiraData);
  res.send('Data fetched from Jira and saved to PostgreSQL');
});

//databasedeki verileri reacta göndermek için
app.get('/issues', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jira_issues');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data from PostgreSQL:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



