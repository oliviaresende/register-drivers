import React, { useState, useEffect } from 'react';
import { List, Typography, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';

import CardDriver from '../../components/Card';

import { Alert } from '../../utils/notification';

import './drivers.scss';

const { Title } = Typography;

const Drivers = () => {
  const [drivers, setDrivers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/drivers')
      .then(res => res.json())
      .then(res => setDrivers(res))
      .catch(err => console.error(err, 'Nenhum motorista encontrado'))
      .finally(() => setLoading(false))
  }, [])

  const onSelect = (value, driver) => {
    fetch(`http://localhost:3001/drivers/${driver.id}`, {
      method: 'put',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        ...driver,
        "active": value
      })
    })
      .then(() => Alert('success', 'Sucesso!', `Motorista ${driver.name} ${value ? "ativado" : "desativado"} com sucesso!`))
      .catch(() => Alert('error', 'Ops! Algo deu errado!', `Não foi possível ${value ? "ativar" : "desativar"} ${driver.name}!`))
  }

  return (
    <>
      {
        loading ?
          (
            <div className="spinner">
              <Spin size="large" />
            </div>
          )
          :
          (
            <>
              <div className="header-container-drivers">
                <Title className="title-drivers">Motoristas</Title>
                <Button type="primary" htmlType="button"><Link to="/form">Novo</Link></Button>
              </div>
              <List
                itemLayout="vertical"
                dataSource={drivers}
                split="false"
                renderItem={item => (
                  <List.Item key={item.key}>
                    <CardDriver driver={item} onSelect={onSelect} />
                  </List.Item>
                )}
              />
            </>
          )
      }
    </>
  )
}

export default Drivers;