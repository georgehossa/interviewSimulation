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

  const URL = 'https://api.datos.gob.mx/v2/sinaica';

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setPagination(data.pagination);
        setData(data.results);
      });
  }, [data]);

  const handlePagination = (pagination) => {
    fetch(`${URL}/${pagination.page + 1}`).then(res => res.json()).then(data => {
      setPagination(data.pagination);
      setData(data.results);
    });
  }

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
      <Table
        columns={columns}
        dataSource={data}
        onChange={handlePagination} />
    </div>
  );
}

export default App;
