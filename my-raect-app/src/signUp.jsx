import { useEffect, useState,  } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [error, setError] = useState(null);
  const [UserNameerror, setUserNameError] = useState("");
      useEffect(()=>{
        fetch('http://localhost:3001/users')
        .then(res=>{
            if(!res.ok){
                throw new Error("failed to fetch")
            }
            return res.json()
        })
        .then(data=>{
            setUsers(data)
        })
    },[])
  useEffect(() => {
    const saved = localStorage.getItem("Users");
    if (saved) {
      setUsers(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    if (userName.length < 4) {
      setError("username should have 4 or more characters");
    }
    if (password.length < 8) {
      setError("password should have more than 7 characters");
    } else {
      setIsError(false);
    }
        users.forEach(user=>{
        if(userName == user.userName){
            setIsUserNameError(true)
        }
        else{
            setUserNameError('')
        }
       
    })

  }, [userName, password]);
  const check = () => {
    if (userName.length < 4 || password.length < 8) {
      setIsError(true);
      return
    }
        if(isUserNameError){
            setUserNameError("userName not available");
            return
        }
        
    fetch("http://localhost:3001/users",
        {
            method : 'post',
            headers:{ 'Content-Type' : 'application/json'}, 
            body :  JSON.stringify({
                id : users.length+1,
                userName : userName,
                password: password
            })
        }
      )
              fetch('http://localhost:3001/users')
        .then(res=>{
            if(!res.ok){
                throw new Error("failed to fetch")
            }
            return res.json()
        })
        .then(data=>{
            setUsers(data)
        })
        setUserName('')
        setPassword("")
        localStorage.setItem('Users', JSON.stringify(users))
        navigate('/login')
    };
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
          <h1>signUp to </h1>
          <img src="/images/logo.png" alt="" width={90} />
        </div>
        <div className="logininputs">
          <input type="text" placeholder="🖊 full Name" />
          <input type="email" placeholder="✉ email" />

          <input
            type="text"
            placeholder="👤 Username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setIsUserNameError(false)
            }}
          />
          <input
            type="password"
            placeholder="🔒 password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isError && <p>{error} </p>}
          {isUserNameError && UserNameerror.length>1 ? <p style={{color : 'orange'}}>{UserNameerror}</p> : null}
            <button onClick={check}>signUp</button>
          <NavLink to={"/login"} className="aa">
            logIn
          </NavLink>
        </div>
      </div>
    </div>
    </>
  );
}
