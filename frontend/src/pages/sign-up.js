import Link from 'next/link';
import { Form, Input, Button, DatePicker } from 'antd';
import { Footer, Navbar } from '../components';

import { postUserSignUp } from '../endpoints/';
import '../styles/styles.less';

function Signup() {
  return (
    <div>
      <Navbar />
      <h1 id="sidetitle">FlexDJ</h1>
      <h2>Start your FlexDJ journey here!</h2>
      <MakeForm></MakeForm>
      <Footer />
    </div>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function MakeForm() {
  const onFinish = (values) => {
    postUserSignUp(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
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
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input a valid email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Birthday" name="birthday">
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input type="password" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Link href="..">
          <Button type="primary">Back</Button>
        </Link>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Signup;
