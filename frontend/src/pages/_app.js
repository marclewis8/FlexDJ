import '../styles/antd-custom.less';
import '../styles/styles.less';
import { UserContextProvider } from '../components';

export default function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
