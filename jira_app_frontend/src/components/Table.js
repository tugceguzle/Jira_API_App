import React from 'react';

const Table = ({ tasks }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };


  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className=" text-gray-800">
          <tr>
            <th className="th-td-style border-left-yellow">Key</th>
            <th className="th-td-style">Ad Soyad</th>
            <th className="th-td-style">Tarih</th>
            <th className="th-td-style">Özet</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="hover:bg-gray-100 text-center">
              <td className="th-td-style border-left-yellow">{task.key}</td>
              <td className="th-td-style">
              {task.reporter_name}
            </td>
            <td className="th-td-style">
              {task.created_at ? `${formatDate(task.created_at)} ` : '---'}

            </td>
            <td className="th-td-style">
              {task.summary}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
