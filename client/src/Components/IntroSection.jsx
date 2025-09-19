import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import coverPic from "../assets/images/sale_man.svg";
import Container from "./EssentialComponents/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import ShopNowBtn from "./buttons/ShopNowBtn";
import Button3 from "./buttons/ViewMoreBtn";
import LearnMoreBtn from "./buttons/LearnMoreBtn";
import { Link } from "react-router-dom";
import useUser from "../Hook/useUser";

const IntroSection = () => {
  const { data } = useUser();
  const user = data?.user;

  // Greeting Function
  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  return (
    <section id="intro-section" className="h-screen py-10">
      <Container>
        <div className="flex justify-between items-center gap-5">
          <div>
            <div className="mb-5">
              <div className="flex items-center text-2xl ">
                <h1>{getGreeting()}</h1>
                {user?.firstName && (
                  <>
                    <span>, </span>
                    <h1 className="font-bold text-iconic ml-2">
                      {user?.lastName}
                    </h1>
                  </>
                )}
              </div>
              <h1 className="text-6xl font-bold text-font2 tracking-wider">
                Shopping easier, <br /> Getting faster.
              </h1>
            </div>

            <p className="text-xl text-font2-light mb-10 tracking-wider ">
              Shop the best deals at "AYEE" today! <br />
              We're ready to deliver to you with the fastest speed!
            </p>

            <div className="flex items-center gap-3">
              <Link to="/shop">
                <ShopNowBtn title="Shop Now" />
              </Link>
              <HashLink>
                <LearnMoreBtn />
              </HashLink>
            </div>
          </div>

          {/* Picture */}
          <div>
            <img src={coverPic} alt="Cover Picture" className="w-150" />
          </div>
        </div>

        <HashLink
          to="#discount-section"
          className="absolute bottom-20 left-1/2 border border-border rounded-full animate-bounce"
        >
          <FontAwesomeIcon icon={faAngleDown} className="text-4xl" />
        </HashLink>
      </Container>
    </section>
  );
};

export default IntroSection;
