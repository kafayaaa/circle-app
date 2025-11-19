import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser } from "../redux/slices/authSlice";
import AuthLayout from "@/layouts/Auth";
import { useState } from "react";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ identifier, password }));

    // 🟢 Jika login berhasil (fulfilled)
    if (loginUser.fulfilled.match(result)) {
      navigate("/"); // 👉 Redirect ke halaman profile
    } else {
      // 🟠 Jika login gagal (rejected)
      console.log(error);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayout>
      {error && (
        <div className="absolute top-40 inset-x-0 w-fit mx-auto p-5 bg-red-400 text-white rounded-xl">
          <p>{error}</p>
        </div>
      )}
      <form
        onSubmit={handleLogin}
        className="w-1/4 flex flex-col justify-center gap-5"
      >
        <div>
          <h1 className="text-5xl font-semibold text-[#04a51e] mb-4">circle</h1>
          <h1 className="text-3xl font-semibold text-white">Login to Circle</h1>
        </div>
        <div>
          <input
            type="text"
            name="identifier"
            id="identifier"
            placeholder="Email/Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full border border-stone-600 rounded-lg p-3 text-stone-400 mb-4"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-stone-600 rounded-lg p-3 text-stone-400"
            required
          />
        </div>
        <Link className="text-right text-white" to="/">
          Forgot password?
        </Link>
        <button
          type="submit"
          className="w-full bg-[#04a51e] p-3 rounded-full text-white font-semibold"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-white flex">
          Don't have an account yet?&nbsp;
          <Link to="/register" className="text-[#04a51e] text-semibold">
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
