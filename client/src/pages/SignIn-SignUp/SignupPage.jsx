import React, { useRef, useState } from "react";
import signupPic from "../../assets/images/signup-pic.svg";
import facebookPic from "../../assets/icons/facebook.png";
import googlePic from "../../assets/icons/google.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import useFetchFuncs from "../../Common/useFetchFuncs";
import useAlertStore from "../../Common/Store/useAlertStore";

const SignupPage = () => {
  const form = useRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { baseUrl } = useFetchFuncs();
  const { handleAlert } = useAlertStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleFillingForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      handleAlert("Passwords are not match!", 404);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        handleAlert(data.message, 200);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNo: "",
          address: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => navigate("/sign-in"), 1000);
      } else {
        handleAlert(data.message, 404);
      }
    } catch (error) {
      handleAlert(error.message, 500);
      console.log(error);
    }
  };

  return (
    <section className="login-page relative w-full h-screen">
      <div className="absolute top-[50%] left-[50%] -translate-[50%] bg-card-bg p-10 rounded-xl h-200 w-300 grid grid-cols-2 gap-2">
        {/* Image Section */}
        <div className="h-full relative border rounded-md">
          <img
            src={signupPic}
            alt="SignUp Picture"
            className="absolute bottom-0"
          />
        </div>

        {/* Signup Form  */}
        <div className="w-100 m-auto flex flex-col justify-center h-150">
          <h1 className="text-4xl text-center tracking-wider mb-10">
            Start with us!
          </h1>

          <div>
            <p className="mb-2 text-font2-light">
              "Join Us Today — Your Journey Starts Here."
            </p>
            {/* Form Request */}
            <form className="flex flex-col" onSubmit={handleSubmit}>
              {/* Name Request */}
              <div className="flex gap-3">
                <input
                  name="firstName"
                  type="text"
                  className="bg-white py-2 px-5 rounded-md w-full mb-3"
                  placeholder="First Name"
                  onChange={handleFillingForm}
                  value={formData.firstName}
                />
                <input
                  name="lastName"
                  type="text"
                  className="bg-white py-2 px-5 rounded-md w-full mb-3"
                  placeholder="Last Name"
                  onChange={handleFillingForm}
                  value={formData.lastName}
                />
              </div>
              {/* Email Request */}
              <input
                name="email"
                type="email"
                placeholder="Email"
                className=" bg-white py-2 px-5 rounded-md w-full mb-3"
                onChange={handleFillingForm}
                value={formData.email}
              />
              {/* Phone no Request */}
              <input
                name="phoneNo"
                type="text"
                placeholder="Phone Number"
                className=" bg-white py-2 px-5 rounded-md w-full mb-3"
                onChange={handleFillingForm}
                value={formData.phoneNo}
              />
              {/* Address Request */}
              <input
                name="address"
                type="text"
                placeholder="Address"
                className=" bg-white py-2 px-5 rounded-md w-full mb-3"
                onChange={handleFillingForm}
                value={formData.address}
              />{" "}
              {/* Password Request with eye icon */}
              <div className="relative w-full mb-3">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-white py-2 px-5 rounded-md w-full pr-10"
                  onChange={handleFillingForm}
                  value={formData.password}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {/* Confirm Password Request with eye icon */}
              <div className="relative w-full mb-3">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="bg-white py-2 px-5 rounded-md w-full pr-10"
                  onChange={handleFillingForm}
                  value={formData.confirmPassword}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </span>
              </div>
              <button className="w-full bg-iconic text-font1 py-2 px-5 rounded-md">
                Sign Up
              </button>
            </form>

            <p className="text-center text-font2-light my-5">
              Or continue with
            </p>

            {/* Other Login */}
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2 text-center bg-font1 py-2 px-5 rounded-md"
              >
                <img src={googlePic} alt="Google Pic" className="w-5" />
                <h1 className="text-lg">Google</h1>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 text-center bg-font1 py-2 px-5 rounded-md"
              >
                <img src={facebookPic} alt="Facebook Pic" className="w-5" />
                <h1 className="text-lg">Facebook</h1>
              </a>
            </div>

            <p className="text-center my-3 text-sm">
              Already have an account?
              <Link
                to={"/sign-in"}
                className="ml-2 text-iconic underline font-bold"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
