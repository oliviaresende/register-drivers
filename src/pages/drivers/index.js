import React, { useState, useEffect } from 'react';
import { Descriptions, List, Typography, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';

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
  return (
    <>
      <Title>Motoristas</Title>
      {
        loading ? (
          <Spin />
        )
          :
          (
            <>
              <Button type="primary" htmlType="button"><Link to="/form">Cadastrar</Link></Button>
              <List
                itemLayout="vertical"
                dataSource={drivers}
                split="false"
                renderItem={item => (
                  <List.Item
                    key={item.key}
                  >
                    <Descriptions
                      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                      bordered
                    >
                      <Descriptions.Item label="Nome">{item.name}</Descriptions.Item>
                      <Descriptions.Item label="Telefone">{item.telephone}</Descriptions.Item>
                      <Descriptions.Item label="Data de Nascimento">{item.dateOfBirth}</Descriptions.Item>
                      <Descriptions.Item label="CNH">{item.cnh}</Descriptions.Item>
                      <Descriptions.Item label="Tipo CNH">{item.typeCNH}</Descriptions.Item>
                      <Descriptions.Item label="CPF">{item.cpf}</Descriptions.Item>
                      <Descriptions.Item><Link to={`/form/${item.id}`}>Editar</Link></Descriptions.Item>
                    </Descriptions>
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