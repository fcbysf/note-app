import { useState, useEffect, use } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./noteApp.css";
import { useUser } from "./userContext";

export default function NoteApp() {
  const { isLogedin, userId, loading, logout } = useUser();
  const { userId: id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [notes, setNotes] = useState([]);
  const [noteAdded, setNoteAdded] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [noteAdded]);

  if (loading) return <h2>Loading user...</h2>;

  if (!isLogedin) return <Navigate to="/login" replace />;
  if (String(id) !== String(userId))
    return <Navigate to={`/notes/${userId}`} replace />;

  const logOut = () => {
    logout();
    <Navigate to={'/'}/>;
  };
    const refetchNotes = () => {
    fetch("http://localhost:3001/notes")
      .then(res => res.json())
      .then(data=>setNotes(data));
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const note = Object.fromEntries(formData);

    fetch("http://localhost:3001/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: notes.length + 1,
        userId,
        ...note,
      }),
    });
    setNoteAdded((prev) => !prev);
    e.target.reset();
  };
  const delet = (id) => {
    fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setNoteAdded((prev) => !prev);
        refetchNotes()
      }
    })
    
  };
  const userNote = notes.filter(n=>n.userId == userId)
  const style = (note) => {
    const colors = {
      work: "rgba(83, 83, 218, 0.733)",
      study: "rgba(243, 240, 88, 0.95)",
      life: "rgba(156, 255, 136, 0.8)",
      sport: "rgba(33, 158, 207, 0.95)",
      homework: "rgba(255, 174, 24, 0.84)",
      science: "rgba(19, 189, 62, 0.84)",
      love: "rgba(253, 148, 227, 1)",
    };
    return { backgroundColor: colors[note.category] };
  };
  const color = (note) => {
    const clrs = {
      work: "rgba(83, 83, 218, 0.733)",
      study: "rgba(243, 240, 88, 0.95)",
      life: "rgba(156, 255, 136, 0.8)",
      sport: "rgba(33, 158, 207, 0.95)",
      homework: "rgba(255, 174, 24, 0.84)",
      science: "rgba(19, 189, 62, 0.84)",
      love: "rgba(253, 148, 227, 1)",
    };
    return { color: clrs[note.category] };
  };
  
  return (
    <div className="appContainer">
      <header>
        <div className="left">
          <h2>
            LIFE <b>NOTE</b>
          </h2>
          <img src="/images/logo.png" alt="note" width={100} />
        </div>
        <input type="checkbox" id="check" style={{ display: "none" }} />
        <div className="right">
          <input
            type="text"
            className="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <label htmlFor="check">
            <img
              src="/images/search (1).png"
              alt="search icon"
              width={36}
              id="svg"
            />
          </label>
          <button onClick={logOut}>Log out</button>
        </div>
      </header>

      <div className="main">
        <aside className="leftSide">
          <form className="form" onSubmit={submit}>
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              minLength={3}
              required
            />
            <input
              type="text"
              name="NoteContent"
              placeholder="Note Content"
              minLength={5}
              required
            />
            <label htmlFor="">Category</label>
            <select name="category" defaultValue="work">
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="life">Life</option>
              <option value="sport">Sport</option>
              <option value="homework">Homework</option>
              <option value="science">Science</option>
              <option value="love">Love</option>
            </select>
            <label>Date: </label>
            <input type="date" name="date" required />
            <button type="submit">Add Note</button>
          </form>
          <hr className="hr" />
          <div className="filterC">
            <h2>Filter by: category</h2>
            <select
              name="category"
              defaultValue="all"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={"all"}>all</option>
              <option value={"work"}>Work</option>
              <option value={"study"}>Study</option>
              <option value={"life"}>Life</option>
              <option value={"sport"}>Sport</option>
              <option value={"homework"}>Homework</option>
              <option value={"science"}>Science</option>
              <option value={"love"}>Love</option>
            </select>
          </div>
        </aside>

        <section className="notesContainer">
          {notes.map(
            (n) =>
              ((n.category == category && search.length == 0) ||
                (n.title.toLowerCase().includes(search.toLowerCase()) &&
                  search.length > 0) ||
                (category == "all" && search.length == 0)) && n.userId == userId &&(
                <article key={n.id} className="note" style={style(n)}>
                  <div className="topCard">
                    <h3>{n.title}</h3>
                    <span style={color(n)}>{n.category}</span>
                  </div>
                  <p>{n.NoteContent}</p>
                  <b className="date">{n.date}</b>
                  <div className="buttons">
                    <span onClick={() => delet(String(n.id))} className="delete">
                      ❌
                    </span>
                  </div>
                </article>
              )
          )}
          {userNote.length == 0 && (
            <h1 className="nonote">you have 0 notes</h1>
          )}
        </section>
      </div>
    </div>
  );
}
