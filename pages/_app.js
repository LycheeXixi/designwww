import '../styles/global.css';
import { UserProvider } from '../contexts/UserContext';


function MyWebsite({ Component, pageProps }) {

  return (
    <UserProvider>
    <Component {...pageProps} />
  </UserProvider>
  );
}

export default MyWebsite;