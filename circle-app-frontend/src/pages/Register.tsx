import AuthLayout from "@/layouts/Auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerUser } from "@/redux/slices/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useAppSelector((state) => state.auth);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      registerUser({ username, full_name, email, password })
    );

    if (registerUser.fulfilled.match(result)) {
      navigate("/login");
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
        onSubmit={handleRegister}
        className="w-1/4 flex flex-col justify-center gap-5"
      >
        <div>
          <h1 className="text-5xl font-semibold text-[#04a51e] mb-4">circle</h1>
          <h1 className="text-3xl font-semibold text-white">
            Register to Circle
          </h1>
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-stone-600 rounded-lg p-3 text-stone-400 mb-4"
            required
          />
          <input
            type="text"
            name="full_name"
            id="full_name"
            placeholder="Fullname"
            value={full_name}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full border border-stone-600 rounded-lg p-3 text-stone-400 mb-4"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button
          type="submit"
          className="w-full bg-[#04a51e] p-3 rounded-full text-white font-semibold"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-white flex">
          Already an account?&nbsp;
          <Link to="/login" className="text-[#04a51e] text-semibold">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
