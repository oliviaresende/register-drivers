import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Switch, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { date } from '../../utils/formatter';
import './card.scss';

const CardDriver = ({ driver, onSelect }) => {
  const itens = [
    {
      title: 'CPF',
      value: `${driver.cpf}`,
    },
    {
      title: 'Nasc.',
      value: `${date(driver.dateOfBirth)}`,
    },
    {
      title: 'CNH',
      value: `${driver.cnh}`,
    },
    {
      title: 'Categoria',
      value: `${driver.typeCNH}`,
    },
    {
      title: 'Fone',
      value: `${driver.telephone}`,
    },
  ]
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ fontWeight: 'bold', fontSize: '16px' }} >{driver.name}</p>
        <Link to={`/form/${driver.id}`} className="edit-container">
          <div className="edit-label">Editar</div>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
      </div>
      <Row>
        {
          itens.map(item => (
            <Col
              xs={{ span: 12 }}
              md={{ span: 8 }}
              style={{ marginBottom: '0.5rem' }}
              key={item.title}
            >
              <strong>{item.title}:</strong> {item.value}
            </Col>
          ))
        }
      </Row>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Switch
          size="small"
          defaultChecked={driver.active}
          onChange={(value) => onSelect(value, driver)} />
      </div>
    </Card >
  )
}

export default CardDriver;;