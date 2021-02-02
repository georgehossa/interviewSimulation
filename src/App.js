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
        setPagination({
          ...pagination,
          pageSize: data.pagination.pageSize,
          page: data.pagination.page,
          total: data.pagination.total,
        });
        setData(data.results);
      });
  }, [data, pagination]);

  const handlePagination = (pagination) => {
    console.log(pagination);
    fetch(`${URL}?page=${pagination.current}`).then(res => res.json()).then(data => {
      setPagination({
        ...pagination,
        pageSize: data.pagination.pageSize,
        page: data.pagination.page,
        total: data.pagination.total,
      });
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
        pagination={pagination}
        onChange={handlePagination} />
    </div>
  );
}

export default App;
