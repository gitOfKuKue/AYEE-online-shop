import React, { useRef, useState } from "react";
import signupPic from "../../assets/images/signup-pic.svg";
import facebookPic from "../../assets/icons/facebook.png";
import googlePic from "../../assets/icons/google.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useFetchFuncs from "../../Common/useAPICalling";
import useAlertStore from "../../Common/Store/useAlertStore";
import { X } from "lucide-react";

const SignupPage = () => {
  const form = useRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtp, setIsOtp] = useState(false);

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
    otp: "",
  });

  const handleFillingForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Send OTP to email
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      handleAlert("Passwords do not match!", 404);
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNo ||
      !formData.address ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      handleAlert("Please fill all fields!", 404);
      return;
    }

    handleAlert("OTP is sending...", 200);

    try {
      const otpRes = await fetch(`${baseUrl}/api/sign-up/sendingOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const otpData = await otpRes.json();
      if (otpRes.ok) {
        handleAlert(otpData.message, 200);
        setTimeout(() => setIsOtp(true), 2000);
      } else {
        handleAlert(otpData.message, 404);
      }
    } catch (error) {
      handleAlert(error.message, 500);
    }
  };

  // Submit form with OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

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
          otp: "",
        });
        setIsOtp(false);
        setTimeout(() => navigate("/sign-in"), 1000);
      } else {
        handleAlert(data.message || "Failed to create user!", 404);
      }
    } catch (error) {
      handleAlert(error.message || "Something went wrong!", 500);
      console.log(error);
    }
  };

  return (
    <>
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

          {/* Signup Form */}
          <div className="w-120 m-auto flex flex-col justify-center h-150">
            <h1 className="text-4xl text-center tracking-wider mb-10">
              Start with us!
            </h1>

            <p className="mb-2 text-font2-light">
              "Join Us Today — Your Journey Starts Here."
            </p>

            <form className="flex flex-col" onSubmit={handleFormSubmit}>
              <div className="flex gap-3">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={handleFillingForm}
                  value={formData.firstName || ""}
                  className="bg-white py-2 px-5 rounded-md w-full mb-3"
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={handleFillingForm}
                  value={formData.lastName || ""}
                  className="bg-white py-2 px-5 rounded-md w-full mb-3"
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleFillingForm}
                value={formData.email || ""}
                className="bg-white py-2 px-5 rounded-md w-full mb-3"
              />
              <input
                name="phoneNo"
                type="text"
                placeholder="Phone Number"
                onChange={handleFillingForm}
                value={formData.phoneNo || ""}
                className="bg-white py-2 px-5 rounded-md w-full mb-3"
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                onChange={handleFillingForm}
                value={formData.address || ""}
                className="bg-white py-2 px-5 rounded-md w-full mb-3"
              />

              <div className="relative w-full mb-3">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleFillingForm}
                  value={formData.password || ""}
                  className="bg-white py-2 px-5 rounded-md w-full pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>

              <div className="relative w-full mb-3">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={handleFillingForm}
                  value={formData.confirmPassword || ""}
                  className="bg-white py-2 px-5 rounded-md w-full pr-10"
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
                Send OTP
              </button>
            </form>

            <p className="text-center text-font2-light my-5">
              Or continue with
            </p>

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
      </section>

      {/* OTP Modal */}
      {isOtp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
            <button
              onClick={() => setIsOtp(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              OTP Verification
            </h2>
            <p className="text-sm text-gray-700 text-center mb-4">
              Enter the 6-digit code sent to {formData.email}
            </p>
            <form
              className="flex flex-col items-center gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="otp"
                placeholder="6-digit code"
                maxLength={6}
                value={formData.otp || ""}
                onChange={handleFillingForm}
                className="w-48 text-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                pattern="\d{6}"
              />
              <button
                type="submit"
                className="w-full bg-iconic text-white py-2 rounded-xl hover:bg-green-600"
              >
                Submit OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupPage;
