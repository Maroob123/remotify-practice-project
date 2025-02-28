import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Favorites, Home, Login, SignUp } from "../routes";
import { RootLayout } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../redux/notificationSlice";

const PrivateRoutes = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.user);
  dispatch(
    showNotification({ message: "You must log in first!", severity: "warning" })
  );
  return !auth?.uid ? <Navigate to="/login" /> : <Outlet />;
};

const PublicRoutes = () => {
  const auth = useSelector((state) => state.auth.user);
  return !auth?.uid ? <Outlet /> : <Navigate to="/" />;
};

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
