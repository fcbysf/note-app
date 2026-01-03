import Login from "./login";
import NoteApp from "./noteApp";
import SignUp from "./signUp";
import Welcome from "./Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import PageNotFound from "./pageNoteFound";
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/notes/:userId"
          element={
            <ProtectedRoute>
              <NoteApp />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
