import React, { useState, useEffect } from 'react';
import { Form, Input, Typography, Select, Button, Spin } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

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
    "cpf": "",
  };

  useEffect(() => {
    fetch(`http://localhost:3001/drivers/${id}`)
      .then(res => res.json())
      .then(res => setDriver(res))
      .catch(err => console.error(err, 'Nenhum motorista encontrado'))
      .finally(() => setLoading(false))
  }, [id])

  const post = values => (
    fetch('http://localhost:3001/drivers', {
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

  const put = values => (
    fetch(`http://localhost:3001/drivers/${id}`, {
      method: 'put',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(values)
    })
  )

  const onFinish = values => {
    if (id) {
      put(values);
      history.push("/");
    } else {
      post(values).then(() => console.log("Cadastrado com sucesso!"))
      form.resetFields();
    }
  }
  return (
    <>
      <Title>Cadastro</Title>
      {
        loading ? (
          <Spin />
        )
          :
          (<Form
            layout="horizontal"
            initialValues={id ? driver : initialValues}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item label="Nome" name="name" rules={[{ required: true, disabled: true, message: 'Por favor, insira o nome completo do motorista!' }]}>
              <Input placeholder="Insira o nome completo do motorista." />
            </Form.Item>
            <Form.Item label="Telefone" name="telephone" >
              <Input placeholder="Insira o telefone do motorista." />
            </Form.Item>
            <Form.Item label="Data de Nascimento" name="dateOfBirth" >
              <Input placeholder="Insira a data de nascimento no formato DD/MM/AAAA" />
            </Form.Item>
            <Form.Item label="CNH" name="cnh" >
              <Input placeholder="Insira a CNH do motorista." />
            </Form.Item>
            <Form.Item label="Tipo CNH" name="typeCNH" >
              <Select>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="AB">AB</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
                <Option value="E">E</Option>
              </Select>
            </Form.Item>
            <Form.Item label="CPF" name="cpf" >
              <Input placeholder="Insira a CPF do motorista." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cadastrar
          </Button>
            </Form.Item>
          </Form>)
      }
    </>
  )
}
export default FormRegister;