import React from 'react';
import Routes from './Routes';
import { Row, Col } from 'antd';

const App = () => {


  return (
    <>
      <Row>
        <Col xs={{ span: 22, offset: 1 }}>
          <Routes />
        </Col>
      </Row>
    </>
  );
}

export default App;
