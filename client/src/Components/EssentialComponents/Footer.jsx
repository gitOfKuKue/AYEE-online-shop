import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import connects from "../../Details/connects.json";

import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import useAuthStore from "../../Common/Store/useAuthStore";

const Footer = () => {
  const iconsMap = {
    faFacebook: faFacebook,
    faInstagram: faInstagram,
    faTwitter: faTwitter,
  };

  const { isLoggedIn } = useAuthStore();

  return (
    <>
      <footer className="">
        <div id="footer-decoration"></div>
        <div className="bg-iconic pt-10">
          <Container className="mb-10">
            <div className="grid grid-cols-5">
              <div className="col-span-2 w-2/3">
                <h1 className="text-xl font-bold">
                  Sign up for our newsletter
                </h1>
                <p className="mb-10">
                  Don't worry, we reserve our newsletter for important news so
                  we only send a few updates a year.
                </p>
                {isLoggedIn ? (
                  <h1>Thank You!</h1>
                ) : (
                  <Link
                    to="/sign-in"
                    className="text-xl text-font2 hover:bg-font2-light hover:text-font1  bg-font1 px-5 py-2 rounded-[var(--standard-radius)]"
                  >
                    Sign In
                  </Link>
                )}
              </div>
              <ul>
                <li className="font-bold text-xl">Help and services</li>
                <li>How does it work</li>
                <li>FAQs</li>
                <li>Contact</li>
              </ul>

              <ul>
                <li className="font-bold text-xl">Top explore</li>
                <li>Accommodations</li>
                <li>Experience</li>
                <li>Blog</li>
              </ul>

              <ul>
                <li className="font-bold text-xl">Other possibilities</li>
                <li>Give away</li>
                <li>Subscribe</li>
              </ul>
            </div>
          </Container>
          <hr />
          <Container className="py-5">
            {/* Copyright & Connect */}
            <div className="flex justify-between items-center">
              <p>&copy; {new Date().getFullYear()} AYEE | Online Shop</p>

              {/* Connects */}
              <div className="flex items-center gap-3">
                {connects.map((connect) => (
                  <Link key={connect.id} to={connect.link}>
                    <FontAwesomeIcon
                      icon={iconsMap[connect.icon]}
                      className="text-4xl"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
};

export default Footer;
