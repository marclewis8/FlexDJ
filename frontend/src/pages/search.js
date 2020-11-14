import Link from 'next/link';
import { Form, Input, Button, Checkbox } from 'antd';

const axios = require('axios');
// https://developers.google.com/youtube/v3/docs/search/list -YT API

function Search() {
  return (
    <div>
      <p> Hello There </p>
      <SearchBox></SearchBox>
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

function SearchBox() {
  const onFinish = async (values) => {
    let result = await axios({
      method: 'get',
      url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${values.name}&type=video&key=${process.env.youtubeAPIKey}`,
    });
    console.log(result);
    // TODO, actually build search results into visible data
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
        label="Search"
        name="name"
        rules={[{ required: true, message: 'Fill in this field' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

// function SearchResults(props) {
//   // props should contain JSON responses
// }

// export default Search, SearchResults;
// export default SearchResults;
