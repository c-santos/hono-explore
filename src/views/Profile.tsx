import { FC } from 'hono/jsx';
import Layout from './layout';

export type ProfileProps = {
  username: string;
  createdAt: string;
};

const Profile: FC<ProfileProps> = (props) => {
  const { username, createdAt } = props;

  return (
    <Layout title="My Profile">
      <h1>{username}</h1>
      <span>user since {createdAt}</span>
    </Layout>
  );
};

export default Profile;
