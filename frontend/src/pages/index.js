import { Typography } from "antd";

const { Title } = Typography;

function Home() {
  const [res, setRes] = useState("no response");
  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:3001/user/3");
      setRes(res);
    }
    getUsers();
  }, [res]);
  return (
    <div>
      <Title>{res}</Title>
      <h4>Response</h4>
      {res}
    </div>
  );
}

export default Home;
