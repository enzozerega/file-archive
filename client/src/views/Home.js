import { Files, Users } from "../components";

export const Home = ({ user, setUser }) => {
  if (user) return <Files />;
  else return <Users setUser={setUser} />;
};
