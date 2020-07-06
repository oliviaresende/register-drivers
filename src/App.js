import React from 'react';
import Routes from './Routes';
import { Row, Col } from 'antd';

const App = () => {


  return (
    <>
      <Row style={{ padding: '2rem 0 2rem 0', color: '#312E38' }}>
        <Col xs={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }} xl={{ span: 12, offset: 6 }} >
          <Routes />
        </Col>
      </Row>
    </>
  );
}

export default App;
