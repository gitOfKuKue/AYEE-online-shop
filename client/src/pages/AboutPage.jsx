import React from "react";
import { Users, Heart, Target } from "lucide-react";

import myProfile from "../assets/profiles/my-profile.jpg";

const team = [
  {
    name: "Ku Kue",
    role: "Founder & CEO",
    img: myProfile,
  },
];

const AboutPage = () => {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-iconic to-[#D9E9CF] text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Discover our story, our values, and the people behind the vision.
        </p>
      </section>

      {/* Mission / Values */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <Heart className="w-12 h-12 text-pink-500" />
          <h2 className="text-2xl font-bold">Our Passion</h2>
          <p>
            We love building products that make life simpler and more
            delightful.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Target className="w-12 h-12 text-indigo-500" />
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p>
            To empower people with intuitive technology and a human-centered
            approach.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Users className="w-12 h-12 text-green-500" />
          <h2 className="text-2xl font-bold">Our Community</h2>
          <p>
            We value our users and thrive on collaboration and shared success.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-10">Meet the Team</h2>
          <div className="">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-gray-100 w-80 mx-auto rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
