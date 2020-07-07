import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Switch, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { dateFormatter } from '../../utils/formatter';
import './card.scss';

const CardDriver = ({ driver, onSelect }) => {
  const itens = [
    {
      title: 'CPF',
      value: `${driver.cpf}`,
    },
    {
      title: 'Nasc.',
      value: `${dateFormatter(driver.dateOfBirth)}`,
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
      title: 'Cel.',
      value: `${driver.telephone}`,
    },
  ]
  return (
    <Card>
      <div className="title-container">
        <p className="title" >{driver.name}</p>
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
      <div className="switch-container">
        <Switch
          size="small"
          defaultChecked={driver.active}
          onChange={(value) => onSelect(value, driver)} />
      </div>
    </Card >
  )
}

export default CardDriver;;