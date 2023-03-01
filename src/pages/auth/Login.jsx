import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Loader from "../../components/Loader/Loader"
import "./login.scss"

import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage("");
      setIsLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setMessage("Failed to login");
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className='container'>
        <div className='header'>
          <h2>Log in your account</h2>
          {
            message && (
              <h4 className='error'>{message}</h4>
            )
          }
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder='Email'
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button text="Login" color="orange" type="submit" />
        </form>
        <p>Don’t have an account?</p>
        <Link to="/register" className='form-link'>Create one now</Link>
      </section>
    </>
  )
}

export default Login