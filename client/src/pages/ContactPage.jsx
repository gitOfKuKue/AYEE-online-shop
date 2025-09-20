import {
  faAddressBook,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import useEmailJsApi from "../Common/useEmailJsApi";
import useAlertStore from "../Common/Store/useAlertStore";

const ContactPage = () => {
  const orgInfos = [
    {
      id: 1,
      title: "Email",
      content: "ayee.shop.official@gmail.com",
      icon: faEnvelope,
    },
    {
      id: 2,
      title: "Phone Number",
      content: "+959 796 000 227",
      icon: faPhone,
    },
    {
      id: 3,
      title: "Address",
      content:
        "No-10, Merchant Quarter, Aung Chan Thar St, Daik-U, Bago Region, Myanmar",
      icon: faAddressBook,
    },
  ];
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    time: "",
  });

  const { sendEmail } = useEmailJsApi();
  const { handleAlert } = useAlertStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const finalForm = { ...form, time: new Date().toISOString() };

      setForm(finalForm); // update state for UI (optional)
      sendEmail(finalForm, emailjs, handleAlert); // pass correct data immediately

      handleAlert("Thank you for your message!", 200);
      console.log(finalForm);

      // clear fields but keep time if you wish, or reset completely:
      setForm({ name: "", email: "", message: "", time: "" });
    } catch (error) {
      handleAlert(error.message, 500);
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-background flex justify-center items-center p-8">
      <div className="max-w-6xl w-full bg-card-bg rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Section – Info */}
        <div className="bg-iconic text-font1 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <p className="mb-4">
            We’d love to hear from you! Whether you have a question about
            products, orders, or anything else, our team is ready to answer all
            your questions.
          </p>
          <div className="mt-6 space-y-3">
            {orgInfos.map((info) => (
              <div key={info.id}>
                <strong>{info.title} :</strong>{" "}
                {info.title === "Phone Number" ? (
                  <a href={`tel:${info.content}`} className="block">
                    {info.content}
                  </a>
                ) : (
                  <p>{info.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section – Form */}
        <form
          onSubmit={handleSubmit}
          className="p-10 flex flex-col justify-center bg-[#FFFDFB]"
        >
          <h2 className="text-3xl font-semibold text-font2 mb-6">
            Send us a message
          </h2>

          <label className="mb-4">
            <span className="block mb-1 font-medium">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-iconic"
              placeholder="Enter your name"
            />
          </label>

          <label className="mb-4">
            <span className="block mb-1 font-medium">Email Address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-iconic"
              placeholder="Enter your email"
            />
          </label>

          <label className="mb-6">
            <span className="block mb-1 font-medium">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-iconic resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </label>

          <button
            type="submit"
            className="bg-iconic text-font1 font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
