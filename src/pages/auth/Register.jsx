import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Loader from "../../components/Loader/Loader";
import "./login.scss";
import * as RiIcons from "react-icons/ri";

import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const [isHidden, setIsHidden] = useState(true);
  const toggleHidden = () => {
    setIsHidden(prev => !prev)
  }

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
    } catch (error) {
      const mg = error.message;
      setMessage(mg
        .slice(mg.indexOf(":") + 2, mg.indexOf("(")));
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className='container'>
        <div className='header'>
          <h1>Register new account</h1>
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
          <div className='input-wrapper'>
            <input
              type={isHidden ? "password" : "text"}
              placeholder='Password'
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="button" className='button-hidden'
              onClick={toggleHidden}>
              {
                isHidden ? < RiIcons.RiEyeOffLine /> : < RiIcons.RiEyeLine />
              }
            </button>
          </div>
          <div className="input-wrapper">
            <input
              type={isHidden ? "password" : "text"}
              placeholder='Confirm password'
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <button type="button" className='button-hidden'
              onClick={toggleHidden}>
              {
                isHidden ? < RiIcons.RiEyeOffLine /> : < RiIcons.RiEyeLine />
              }
            </button>
          </div>
          <Button className="button-submit" text="Register" color="orange" type="submit"  />
        </form>
        <p>Already have an account?</p>
        <Link to="/login" className='form-link'>Log in now</Link>
      </section>
    </>
  )
}

export default Register