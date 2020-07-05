import React, { useState, useEffect } from 'react';
import { Descriptions, List, Typography, Spin, Button, Select } from 'antd';
import { Link } from 'react-router-dom';

import { date } from '../../utils/formatter';

import './drivers.scss';

const { Title } = Typography;
const { Option } = Select;

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
  }

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
                      <Descriptions.Item label="Data de Nascimento">{date(item.dateOfBirth)}</Descriptions.Item>
                      <Descriptions.Item label="CNH">{item.cnh}</Descriptions.Item>
                      <Descriptions.Item label="Tipo CNH">{item.typeCNH}</Descriptions.Item>
                      <Descriptions.Item label="CPF">{item.cpf}</Descriptions.Item>
                      <Descriptions.Item label="Situação">
                        <Select defaultValue={item.active} onSelect={(value) => onSelect(value, item)}>
                          <Option value="true">Ativo</Option>
                          <Option value="false">Inativo</Option>
                        </Select>
                      </Descriptions.Item>
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