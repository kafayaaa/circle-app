import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ThreadPage from "./pages/Threads";
import {
  AuthCheck,
  ProtectedRoute,
} from "./redux/authentication/ProtectedRouted";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setupSocketListeners } from "./hooks/useSocket";
import { setToken } from "./redux/slices/authSlice";
import ThreadDetail from "./pages/ThreadDetail";
import type { RootState } from "./redux/store";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      setupSocketListeners(dispatch);
    }
  }, [dispatch, user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    } else {
      dispatch(setToken(null));
    }
  }, [dispatch]);

  useEffect(() => {
    setupSocketListeners(dispatch);
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthCheck>
                <LoginPage />
              </AuthCheck>
            }
          />
          <Route
            path="/register"
            element={
              <AuthCheck>
                <RegisterPage />
              </AuthCheck>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ThreadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/thread-detail/:id"
            element={
              <ProtectedRoute>
                <ThreadDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
