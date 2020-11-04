import Link from 'next/link';
import { Form, Input, Button, DatePicker, Row, Col } from 'antd';
import { Footer, Navbar } from '../components';

import { postUserSignUp } from '../endpoints/';
import '../styles/signup.less';

function Signup() {
  return (
    <div>
      <Navbar />
      <h1 id="sidetitle">FlexDJ</h1>
      <div className="form">
        <MakeForm />
      </div>
      <Footer />
    </div>
  );
}

function MakeForm() {
  const onFinish = (values) => {
    postUserSignUp(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="signup">
      <h2>Start your FlexDJ journey here!</h2>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input a valid email!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker style={{ marginTop: 20, paddingBottom: 0 }} />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="buttons">
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Signup;
