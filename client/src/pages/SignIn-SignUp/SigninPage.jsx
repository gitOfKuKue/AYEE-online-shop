import React, { useEffect, useState } from "react";
import loginPic from "../../assets/images/login-pic.svg";
import facebookPic from "../../assets/icons/facebook.png";
import googlePic from "../../assets/icons/google.png";
import { data, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useFetchFuncs from "../../Common/useAPICalling";
import useAlertStore from "../../Common/Store/useAlertStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFillingForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false); // 👁 state for toggle
  const { handleAlert } = useAlertStore();
  const { baseUrl } = useFetchFuncs();

  // Posting data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataPost = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const acc = await dataPost.json();

      if (dataPost.ok) {
        setFormData({ email: "", password: "" });
        setTimeout(() => {
          navigate("/");
        }, 1000);
        handleAlert(acc.message, 200);
        localStorage.setItem("user", JSON.stringify(acc.user));
        localStorage.setItem("token", acc.token);
      } else {
        setFormData({ email: formData.email, password: "" });
        handleAlert(acc.message, 404);
      }
    } catch (error) {
      handleAlert(error.message, 500);
      console.error(error.message);
    }
  };

  return (
    <section className="login-page relative w-full h-screen">
      <div className="absolute top-[50%] left-[50%] -translate-[50%] bg-card-bg p-10 rounded-xl h-200 w-300 grid grid-cols-2 gap-2">
        {/* Login Form */}
        <div className="w-100 m-auto flex flex-col justify-center h-150">
          <h1 className="text-4xl text-center tracking-wider mb-10">
            Welcome Back!
          </h1>

          <div>
            <p className="text-font2-light mb-2">
              "Log In. Stay Connected. Keep Going."
            </p>

            {/* Form */}
            <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="bg-white py-2 px-5 rounded-md w-full mb-3"
                value={formData.email}
                onChange={handleFillingForm}
              />

              {/* Password with eye icon */}
              <div className="relative w-full mb-3">
                <input
                  type={showPassword ? "text" : "password"} // 👁 toggle
                  placeholder="Password"
                  name="password"
                  className="bg-white py-2 px-5 rounded-md w-full pr-10"
                  value={formData.password}
                  onChange={handleFillingForm}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <a href="#" className="text-sm mb-3">
                Forgot Password!
              </a>
              <button className="w-full bg-iconic text-font1 py-2 px-5 rounded-md">
                Sign In
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
              Not registered yet?
              <Link
                to={"/sign-up"}
                className="ml-2 text-iconic underline font-bold"
              >
                Create account.
              </Link>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="h-full relative border rounded-md">
          <img
            src={loginPic}
            alt="LogIn Picture"
            className="absolute bottom-0"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
