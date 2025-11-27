import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ThreadPage from "./pages/Threads";
import ThreadDetail from "./pages/ThreadDetail";
import FollowPage from "./pages/Follow";
import {
  AuthCheck,
  ProtectedRoute,
} from "./redux/authentication/ProtectedRouted";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setupSocketListeners } from "./hooks/useSocket";
import { setToken } from "./redux/slices/authSlice";
import type { RootState } from "./redux/store";
import { registerSocketUser } from "./lib/socketRegister";
import FollowingPage from "./pages/Following";
import FollowerPage from "./pages/Follower";
import SearchPage from "./pages/Search";
import ProfilePage from "./pages/Profile";
import MyThreadsPage from "./pages/MyThreads";
import MyMediasPage from "./pages/MyMedias";
import MyMediaDetailPage from "./pages/MyMediaDetail";

function App() {
  registerSocketUser();
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
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/follow"
            element={
              <ProtectedRoute>
                <FollowPage />
              </ProtectedRoute>
            }
          >
            <Route index element={<FollowingPage />} />
            <Route
              path="/follow/followings"
              element={
                <ProtectedRoute>
                  <FollowingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/follow/followers"
              element={
                <ProtectedRoute>
                  <FollowerPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<MyThreadsPage />} />
            <Route
              path="/profile/my-threads"
              element={
                <ProtectedRoute>
                  <MyThreadsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/my-medias"
              element={
                <ProtectedRoute>
                  <MyMediasPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/my-medias/:id"
              element={
                <ProtectedRoute>
                  <MyMediaDetailPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
