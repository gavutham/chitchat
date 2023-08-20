import { useState } from "react";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setErr(false);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chit Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
        <p>
          Not a member? Do <Link to={"/register"}>Register</Link>
        </p>
        {loading && (
          <span style={{ color: "green", fontSize: 12 }}>
            Logging in, Please wait...
          </span>
        )}
        {err && (
          <span style={{ color: "red", fontSize: 12 }}>
            Something went wrong
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
