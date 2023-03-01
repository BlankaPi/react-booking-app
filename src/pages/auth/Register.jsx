import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Loader from "../../components/Loader/Loader";
import "./login.scss";

import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match")
    }
    try {
      setMessage("");
      setIsLoading(true);
      await signup(email, password);
      navigate("/dashboard");
    } catch {
      setMessage("Failed to create an account");
    }
    setIsLoading(false);    
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className='container'>
        <div className='header'>
          <h2>Register new account</h2>
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
          <input
            type="password"
            placeholder='Confirm password'
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <Button text="Register" color="orange" type="submit" />
        </form>
        <p>Already have an account?</p>
        <Link to="/login" className='form-link'>Log in now</Link>
      </section>
    </>
  )
}

export default Register