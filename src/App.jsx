import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const user = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
