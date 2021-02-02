import React, {useState, useEffect} from 'react';
import './App.css';
import {Table} from 'antd'

function App() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 0,
  });
  const API_URL = 'https://api.datos.gob.mx/v2/sinaica';




  useEffect(() => {
    const getData = async (url) => {
      try {
        let res = await fetch(`${url}`);
        let data = await res.json();
        setPagination({
          ...pagination,
          pageSize: data.pagination.pageSize,
          total: data.pagination.total,
        })
        return setData(data.results);
      } catch(err) {
        console.log(err);
      }
    };
    getData(API_URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePagination = (pagination, filters, sorter) => {
    console.log(pagination);
    fetch(`${API_URL}?page=${pagination.current}`).then(res => res.json()).then(data => setData(data.results));
    setPagination({...pagination})
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
