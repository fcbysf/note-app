import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import { useState, useEffect } from "react";
import { useUser } from "./userContext";

export default function Login() {
  const navigate = useNavigate();
  const { isLogedin, userId, setIsLogedIn, setUserId } = useUser();

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notlogedIn, setNotLogedIn] = useState(null);
  useEffect(() => {
    if (isLogedin && userId) {
      navigate(`/notes/${userId}`);
    }
  }, [isLogedin, userId, navigate]);
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  const check = () => {
    const foundUser = users.find(
      (user) => user.userName === userName && user.password === password
    );

    if (foundUser) {
      setIsLogedIn(true);
      setUserId(String(foundUser.id));

      localStorage.setItem("isLogedin", "true");
      localStorage.setItem("userId", String(foundUser.id));

      setTimeout(() => navigate(`/notes/${foundUser.id}`), 0);
    } else {
      setNotLogedIn("Username or password incorrect!");
    }
  };

  if (isLoading) return <h1 className="loading">Loading users...</h1>;

  return (
    <>
          <header>
        <div className="left">
          <h2>
            LIFE <b>NOTE</b>
          </h2>
          <img src="/images/logo.png" alt="(note photo)" width={100} />
        </div>
        <div className="right">
          <NavLink to={"/"}>
            <button>Go back</button>
          </NavLink>
        </div>
      </header>
    <div className="loginContainer">
      
      <div className="loginDiv">
        <div className="top">
          <h1>Login to </h1>
          <img src="/images/logo.png" alt="" width={90} />
        </div>
        <div className="logininputs">
          <input
            type="text"
            placeholder="👤 Username"
            onChange={(e) => {
              setUserName(e.target.value);
              setNotLogedIn("");
            }}
          />
          <input
            type="password"
            placeholder="🔒 password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {notlogedIn && <p style={{ color: "red" }}>{notlogedIn}</p>}
          <button onClick={check}>LogIn</button>
          <NavLink to={"/signUp"} className="aa">
            signUp
          </NavLink>
        </div>
      </div>
    </div>
    </>
  );
}
