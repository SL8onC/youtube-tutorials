import "./App.css";
import SignIn from "./SignIn";
import Todo from "./Todo";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return "Loading...";
  if (error) return "Error";

  return user ? <Todo /> : <SignIn />;
};

export default App;
