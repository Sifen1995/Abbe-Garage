import React,{useState} from 'react'
import Layout from '../../components/layout/Layout'
import axios from '../../Api/axios'
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:4500/api/user/login", {
        email,
        password,
      });

      const token = response.data.token;
      login(token);
      navigate("/"); // redirect to home
    } catch (err: any) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className='p-[6.3%] ml-[50px]' >
        <header className='mb-10'>
            <h1 className='font-semibold text-[35px] '>Log In To Your Account</h1>
        </header>
       <form onSubmit={handleSubmit}>
  
  <div className="mb-10">
    <input
      type="text"
      name="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
    />
  </div>

  <div className="mb-10">
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
    />
  </div>

  <button
    type="submit"
    className="w-1/6 bg-red-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-200 font-medium"
   >
    Log In
  </button>

 
</form>

      </div>
    </Layout>
  )
}
