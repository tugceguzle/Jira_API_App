import * as XLSX from 'xlsx';

export const exportToExcel = (data) => {
  const filteredData = data.map(({ reporter_name, key, summary,  created_at }) => {
    // const formattedDate = created_at ? new Date(created_at).toLocaleDateString('tr-TR') : '';
  
    return {
      Key: key,
      Name: reporter_name,
      Summary: summary,
      Date: created_at,
    };
  });
  

  const worksheet = XLSX.utils.json_to_sheet(filteredData);

  worksheet['!cols'] = [
    { width: 25 }, 
    { width: 15 },
    { width: 15 }, 
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Loglar');

  XLSX.writeFile(workbook, 'tasks.xlsx');
};
