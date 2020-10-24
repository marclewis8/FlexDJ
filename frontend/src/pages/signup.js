import Link from 'next/link'
import { Form, Input, Button, Checkbox } from 'antd';

function Signup() {
    return (
        <div>
          <h1 id="sidetitle">FlexDJ</h1>
          <h2>Start your FlexDJ journey here!</h2>
          <MakeForm></MakeForm>
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
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
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
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Last Name"
            name="lname"
            rules={[{ required: true, message: 'Please input your last name!' }]}
            >
        <Input />
        </Form.Item>

        <Form.Item
            label="Preferred Pronouns"
            name="pronouns"
            >
        <Input />
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
            <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Link href="..">
                <Button type="primary">
                Back
                </Button>
            </Link>
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>

    </Form>
  );
};


export default Signup;