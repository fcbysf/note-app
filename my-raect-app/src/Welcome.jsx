import { NavLink } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
  return (
    <div className="container">
      <header>
        <div className="left">
          <h2>
            LIFE <b>NOTE</b>
          </h2>
          <img src="/images/logo.png" alt="(note photo)" width={100} />
        </div>
        <div className="right">
          <NavLink to={"/login"}>
            <button>Add Note !?</button>
          </NavLink>
        </div>
      </header>
      <main>
        <div className="welcomeMsg">
          <h1>
            Welcome to <b>LIFE NOTE</b>
          </h1>
          <p>
            your application to track your bright ideas for free in with the
            simplist way{" "}
          </p>
          <NavLink to={"/login"}>
            <button>LOGIN </button>
          </NavLink>
          <NavLink to={'/signUp'}>
          <button>new to LIFE NOTE?</button>
          </NavLink>
        </div>
        <div className="image">
          <img src="/images/stickyNote.png" alt="none" className="img"/>
        </div>
      </main>
    </div>
  );
}
