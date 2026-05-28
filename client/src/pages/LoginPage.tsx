import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8">Analyst Login</h1>

        <div className="space-y-4">
          <input
            className="w-full border p-3 rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 rounded-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
