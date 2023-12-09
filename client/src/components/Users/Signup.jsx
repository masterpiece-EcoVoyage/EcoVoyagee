import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assests/Images/logo.png";
import { useCookies } from 'react-cookie';
import axios from "axios";

const Signup = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const history = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    // if (e.target.name === "confirm_password") {
    //   setConfirm(e.target.value);
    // } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    // }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);

    
    // validateForm();
    // if (!errors) {
    try {
      if (!validateEmail(formData.email)) {
      setError("Please enter a valid email.");
      return;
    } else{
        setError("");
    }

    if (!validatePassword(formData.password)) {
      setError(`Password must contain at least one lowercase letter, one uppercase letter, \n
      one digit,\n one special character (@#$%^&!), and be between 6 and 30 characters in length.`);
      return;
    }   else {
        setError("");
    }
    if(!validateFirstName(formData.first_name))
    {
    setError("First Nmae must be between 3 and 20 characters in length.");
      return;
    }else {
       setError("");
    }

    if(!validateLastName(formData.last_name))
    {
    setError("Last Name must be between 3 and 20 characters in length.");
      return;
    }else {
       setError("");
    }
      if (formData.password !== formData.confirm_password) {
        setError("Password doesn't match");
      }else{
      setError("");
      const response = await axios.post(
        "http://localhost:3999/Signup",
        formData
      );
      const token = response.data.token;
      setCookie('token', token, { path: '/' });
      history("/");}
    } catch (error) {
      console.error("Error:", error);
    }
    // }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|net)$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{6,30}$/;
    return passwordPattern.test(password);
  };
  const validateFirstName = (first_name) => {
    return /^[A-Za-z\s]{3,20}$/.test(first_name);
  };
  
  const validateLastName = (last_name) => {
    return /^[A-Za-z\s]{3,20}$/.test(last_name);
  };
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1529718836725-f449d3a52881?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] py-10">
      <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <div className="min-h-screen flex justify-center items-center">
          <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
            <div className="flex flex-col justify-center items-center">
              <img className=" w-16" src={logo} alt="EcoVoyage logo" />
              <h1 className="text-3xl text-sky-900 font-bold text-center mb-4 cursor-pointer">
                Create An Account
              </h1>
              <p className="w-80 self-center text-center text-sm mb-8 font-semibold text-sky-700 tracking-wide cursor-pointer">
                Embark on Your Journey with Us - Sign Up Today!
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                  className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                  className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
              />
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={handleChange}
                className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
              />
            </div>
            <p className="text-sm text-start text-red-500 w-96">{error}</p>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 w-64 text-xl text-white hover:text-sky-900 bg-sky-900 border-2 hover:bg-white border-sky-900 rounded-2xl"
              >
                Sign Up
              </button>
              <p className="mt-4 text-sm text-sky-900">
                Already Have An Account?{" "}
                <Link to={"/login"}>
                  <span className="underline cursor-pointer"> Log In</span>
                </Link>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <Link
                  to="/"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Go back
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
