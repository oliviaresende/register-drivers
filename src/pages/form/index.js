import React from 'react';
import { Form, Input, Typography, DatePicker, Select, Button } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const FormRegister = () => {
  const [form] = Form.useForm();
  const initialValues = {
    "name": "",
    "telephone": "",
    "dateOfBirth": "",
    "cnh": "",
    "typeCNH": "",
    "cpf": "",
  }
  const onFinish = values => {
    fetch('http://localhost:3001/drivers', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        "id": String(Math.ceil(Math.random() * Math.pow(10, 5))),
        "name": values["name"],
        "telephone": values["telephone"],
        "dateOfBirth": values["dateOfBirth"].format("DD/MM/YYYY"),
        "cnh": values["cnh"],
        "typeCNH": values["typeCNH"],
        "cpf": values["cpf"],
        "active": true,
      })
    })
    form.setFieldsValue(initialValues)
  }
  return (
    <>
      <Title>Cadastro</Title>
      <Form
        layout="horizontal"
        initialValues={initialValues}
        form={form}
        onFinish={onFinish} preserve="false">
        <Form.Item label="Nome" name="name" rules={[{ required: true, disabled: true, message: 'Por favor, insira o nome completo do motorista!' }]}>
          <Input placeholder="Insira o nome completo do motorista." />
        </Form.Item>
        <Form.Item label="Telefone" name="telephone" >
          <Input placeholder="Insira o telefone do motorista." />
        </Form.Item>
        <Form.Item label="Data de Nascimento" name="dateOfBirth" >
          <DatePicker format="DD/MM/YYYY" />
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
      </Form>
    </>
  )
}
export default FormRegister;