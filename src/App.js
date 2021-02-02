import React, {useState, useEffect} from 'react';
import './App.css';
import {Table} from 'antd'

function App() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: null,
    page: null,
    total: null,
  });

  useEffect(() => {
    fetch('https://api.datos.gob.mx/v2/sinaica')
      .then(res => res.json())
      .then(data => {
        setPagination(data.pagination);
        setData(data.results);
      });
  }, [data]);

  let columns = [
    {
      title: 'City',
      dataIndex: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
    },
    {
      title: 'Valororig',
      dataIndex: 'valororig',
    },
    {
      title: 'Parametro',
      dataIndex: 'parametro',
    }
  ]


  return (
    <div className="App">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default App;
