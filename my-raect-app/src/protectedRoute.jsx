import { Navigate } from "react-router-dom";
import { useUser } from "./userContext";


export default function ProtectedRoute({ children }) {


const { isLogedin} = useUser();
  if (!isLogedin) {
    return <Navigate to={'/login'} replace/>;
  }
  return children;
}


