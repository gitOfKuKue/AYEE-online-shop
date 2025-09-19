import React from "react";
import {
  faSearch,
  faLightbulb,
  faCog,
  faFlask,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const steps = [
  {
    id: 1,
    icon: faSearch,
    color: "bg-pink-500",
    title: "Step 01",
    description:
      "Explore and research all the available options carefully before moving forward.",
  },
  {
    id: 2,
    icon: faLightbulb,
    color: "bg-purple-600",
    title: "Step 02",
    description:
      "Brainstorm ideas and identify the most creative and effective solution.",
  },
  {
    id: 3,
    icon: faCog,
    color: "bg-yellow-500",
    title: "Step 03",
    description:
      "Plan and configure the process, making sure all gears are aligned and ready.",
  },
  {
    id: 4,
    icon: faFlask,
    color: "bg-blue-500",
    title: "Step 04",
    description:
      "Experiment and test your strategy to ensure it works as expected before launch.",
  },
  {
    id: 5,
    icon: faBullseye,
    color: "bg-green-500",
    title: "Step 05",
    description:
      "Reach your final target and achieve the desired goals with precision.",
  },
];

const ProcessFlowGraphic = () => {
  return (
    <section className="w-full px-8 py-12 mb-10">
      <h1 className="text-center text-3xl font-bold text-gray-700 mb-12">
        Shopping<span className="text-background"> GRAPHICS </span> Flow
      </h1>

      <div className="relative flex justify-between items-start max-w-6xl mx-auto z-0">
        {/* horizontal line */}
        <div className="absolute top-10 left-0 right-0 border-t-2 border-gray-300 z-0"></div>

        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center w-1/5">
            <div
              className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center text-white text-3xl shadow-lg`}
            >
              <FontAwesomeIcon icon={step.icon} />
            </div>

            <h2 className="mt-6 text-lg font-bold text-gray-700">{step.title}</h2>
            <p className="mt-2 text-center text-sm text-gray-600 px-2">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessFlowGraphic;
