## PostgreSQL Veritabanı Kurulumu

1. PostgreSQL'e bağlanın ve aşağıdaki komutları çalıştırarak veritabanını ve tabloyu oluşturun:

    ```sql
    CREATE DATABASE jira_db;
    \c jira_db;
    CREATE TABLE jira_issues (
      id SERIAL PRIMARY KEY,
      key VARCHAR(255) NOT NULL,
      summary TEXT NOT NULL,
      reporter_name VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

## Backend Ayağa Kaldırma

1. Proje dizinine gidin:

    ```bash
    cd kron_app
    ```

2. Gerekli paketleri yükleyin:

    ```bash
    npm install
    ```
3. Server.js dosyasındaki postgreSQL bağlantısı için password, host ve Jira Api bağlantısı için URL, username, token alanlarını aynı dizinde .env dosyası oluşturup kendi bilgilerinizle doldurun.

4. Sunucuyu başlatın:

    ```bash
    node server.js
    ```

## Frontend Ayağa Kaldırma

1. Frontend proje dizinine gidin:

    ```bash
    cd kron_app_frontend
    ```

2. Gerekli paketleri yükleyin:

    ```bash
    npm install
    ```

3. Frontend uygulamasını başlatın:

    ```bash
    npm start
    ```

## PROJE GÖRÜNTÜSÜ

![Görsel](/jira_app_frontend/src/assets/excelss.png)

