import React, { useState, useEffect } from 'react';
import { Form, Input, Typography, Button, Spin, Row, Col } from 'antd';
import { useParams, useHistory, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { cpfMask, telMask } from '../../utils/formatter';
import { generateAge } from '../../utils/generateAge';
import Alert from '../../components/Alert';

import './form.scss';

const { Title } = Typography;

const URL = process.env.REACT_APP_URL;

const post = values => (
  fetch(`${URL}/drivers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        "id": String(Math.ceil(Math.random() * Math.pow(10, 5))),
        ...values,
        "active": true,
      }
    )
  })
)

const put = (values, id, active) => (
  fetch(`${URL}/drivers/${id}`, {
    method: 'put',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      id,
      ...values,
      active
    })
  })
)

const FormRegister = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const history = useHistory();
  const [driver, setDriver] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialValues = {
    "name": "",
    "telephone": "",
    "dateOfBirth": "",
    "cnh": "",
    "typeCNH": "",
    "cpf": ""
  };

  useEffect(() => {
    if (id) {
      fetch(`${URL}/drivers/${id}`)
        .then(res => res.json())
        .then(res => setDriver(res))
        .catch(err => console.error(err, 'Nenhum motorista encontrado'))
        .finally(() => setLoading(false))
    }
    else setLoading(false)
  }, [id])

  const onFinish = values => {
    if (id) {
      put(values, id, driver.active)
        .then(() => {
          Alert('success', 'Sucesso!', 'Dados alterados com sucesso!');
          setTimeout(() => {
            history.push("/");
          }, 3000)
        })
        .catch(() => Alert('error', 'Ops! Algo deu errado!', 'Não foi possível alterar os dados!'));
    } else {
      post(values)
        .then(() => {
          Alert('success', 'Sucesso!', 'Motorista cadastrado com sucesso!');
          form.resetFields();
        })
        .catch(() => Alert('error', 'Ops! Algo deu errado!', 'Não foi possível cadastrar motorista!'));
    }
  }

  return (
    <>
      {
        loading ? (
          <div className="spinner">
            <Spin size="large" />
          </div>
        )
          :
          (
            <div className="form-container">
              <div className="header-container">
                <Link to="/"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                <Title className="title">{id ? "Editar Motorista" : "Novo Motorista"}</Title>
              </div>
              <Form
                layout="vertical"
                initialValues={id ? driver : initialValues}
                form={form}
                onFinish={onFinish}
                scrollToFirstError
              >
                <Row>
                  <Col xs={{ span: 24 }} sm={{ span: 11 }}>
                    <Form.Item
                      label="Nome"
                      name="name"
                      rules={[{ required: true, disabled: true, message: "Por favor, insira o nome completo do motorista!" }]}
                    >
                      <Input placeholder="Insira o nome completo do motorista." />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 11, push: 2 }}>
                    <Form.Item
                      label="Telefone Celular"
                      name="telephone"
                      rules={[{ required: true, min: 14, max: 14, message: "Por favor, insira os números do telefone!" }]}
                    >
                      <Input
                        type="tel"
                        placeholder="Insira o telefone do motorista."
                        minLength="14"
                        maxLength="14"
                        onChange={(e) => form.setFieldsValue({ telephone: telMask(e.target.value) })}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 11 }}>
                    <Form.Item
                      label="Data de Nascimento"
                      name="dateOfBirth"
                      rules={[{
                        required: true,
                        message: "Por favor, insira a data de nascimento!"
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || generateAge(getFieldValue("dateOfBirth")) >= 18) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Menor de 18 anos não pode dirigir!");
                        }
                      }),
                      ]}
                    >
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 11, push: 2 }}>
                    <Form.Item
                      label="CNH"
                      name="cnh"
                      rules={[{ required: true, min: 11, max: 11, message: "Por favor, insira o número completo da CNH!" }]}
                    >
                      <Input maxLength="11" minLength="11" placeholder="Insira a CNH do motorista." />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 11 }}>
                    <Form.Item
                      label="Categoria CNH"
                      name="typeCNH"
                      rules={[{ required: true, min: 1, max: 2, message: "Por favor, indira a categoria da CNH!" }]}
                    >
                      <Input
                        minLength="1"
                        maxLength="2"
                        placeholder="Insira a categoria da CNH"
                        onChange={(e) => form.setFieldsValue({ typeCNH: e.target.value.toLocaleUpperCase() })}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 11, push: 2 }}>
                    <Form.Item
                      label="CPF"
                      name="cpf"
                      rules={[{ required: true, min: 14, max: 14, message: "Por favor, insira os números do CPF!" }]}
                    >
                      <Input
                        maxLength="14"
                        minLength="14"
                        placeholder="Insira o CPF do motorista."
                        onChange={(e) => form.setFieldsValue({ cpf: cpfMask(e.target.value) })}
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={{ span: 24 }}
                    className="button-container"
                  >
                    <Form.Item className="button-cancel">
                      <Button type="link"><Link to="/">Cancelar</Link></Button>
                    </Form.Item>
                    <Form.Item>
                      <Button className="button-submit" type="primary" htmlType="submit">
                        {id ? 'Editar' : 'Cadastrar'}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          )
      }
    </>
  )
}
export default FormRegister;