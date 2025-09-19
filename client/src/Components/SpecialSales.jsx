import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const images = [
  "https://picsum.photos/600/300?car1",
  "https://picsum.photos/600/300?car2",
  "https://picsum.photos/600/300?car3",
];

function SpecialSales() {
  return (
    <section>
      <div className="flex justify-between items-stretch gap-3">
        <div style={{ margin: "auto" }} className="-z-10 w-2/3 overflow-hidden">
          <Slide autoplay={true} duration={3000} infinite={true}>
            {images.map((url, index) => (
              <div key={index} className="h-150">
                <img
                  src={url}
                  alt={`Slide ${index}`}
                  className="w-full rounded-[var(--standard-radius)] object-cover"
                />
              </div>
            ))}
          </Slide>
        </div>

        <div className="bg-black w-1/3">
            <h1>Hello</h1>
        </div>
      </div>
    </section>
  );
}

export default SpecialSales;
