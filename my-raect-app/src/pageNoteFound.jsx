import { NavLink } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <h1>Page Not Found</h1>
      <p>don't mess with the url</p>
      <NavLink to={"/"}>
        <button
          style={{
            padding: 10,
            border: 0,
            borderRadius: 10,
            backgroundColor: "lightblue",
            cursor: "pointer",
          }}
        >
          go back
        </button>
      </NavLink>
    </div>
  );
}
