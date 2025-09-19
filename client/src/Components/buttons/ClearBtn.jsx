import React from "react";
import styled from "styled-components";
import useCommonFuncs from "../../Common/useCommonFuncs";
import { useNavigate } from "react-router";

const ClearBtn = () => {
  const { handleConfirmation } = useCommonFuncs();
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <button className="button" onClick={() => handleConfirmation("Are you sure to clear all?", "clearall")}>
        <svg viewBox="0 0 448 512" className="svgIcon">
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    width: 40px; /* comfortable size */
    height: 40px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 14px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
  }

  .svgIcon {
    width: 10px; /* balanced icon size */
    transition: all 0.3s ease;
  }

  .svgIcon path {
    fill: white;
  }

  /* Hover expands pill shape & highlights */
  .button:hover {
    width: 120px; /* enough room for text */
    border-radius: 30px; /* pill look */
    background-color: rgb(255, 69, 69);
    transition: all 0.3s ease;
  }

  .button:hover .svgIcon {
    width: 36px; /* grow icon slightly */
    transform: translateY(65%);
    transition: all 0.3s ease;
  }

  .button::before {
    position: absolute;
    top: -16px; /* space above */
    content: "Clear all";
    color: white;
    font-size: 2px; /* start tiny so it's hidden */
    opacity: 0;
    transition: all 0.3s ease;
  }

  .button:hover::before {
    font-size: 11px; /* readable label */
    opacity: 1;
    transform: translateY(24px);
    transition: all 0.3s ease;
  }
`;

export default ClearBtn;
