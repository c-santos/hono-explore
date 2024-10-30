import { FC } from 'hono/jsx';
import Layout from './Layout';

type LoginProps = {};

const Login: FC<LoginProps> = () => {
  return (
    <Layout>
      <form method="post" action="/api/auth/login" target={'_blank'}>
        <label>
          Username:
          <input type={'text'} name="username" id="username" />
        </label>
        <label>
          Password:
          <input type={'password'} name="password" id="password" />
        </label>
        <button>Login</button>
      </form>
    </Layout>
  );
};

export default Login;
