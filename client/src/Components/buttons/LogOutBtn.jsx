import React from "react";
import styled from "styled-components";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import useConfirmationStore from "../../Common/Store/useConfirmationStore";

const LogOutBtn = () => {


  const { handleConfirmation } = useConfirmationStore();

  return (
    <StyledWrapper>
      <button onClick={() => handleConfirmation("Are you sure you want to Log out?", "logout")}>
        <span className="text">Log out</span>
        <span className="icon">
          <FontAwesomeIcon icon={faRightFromBracket} size="1x" />
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    width: 120px;
    height: 35px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid var(--color-border);        /* theme border */
    border-radius: var(--standard-radius);        /* theme radius */
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
    transition: 200ms;
    background: transparent;                      /* clean bg */
    color: var(--color-font2);                    /* default text */
  }

  button .text {
    transform: translateX(20px);
    font-weight: bold;
    font-size: 0.8rem;
    transition: 200ms;
  }

  button .icon {
    position: absolute;
    border-left: 1px solid var(--color-border);   /* theme border */
    transform: translateX(85px);
    height: 25px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 200ms;
    color: var(--color-font2-light);              /* subtle icon */
  }

  button:hover {
    background: var(--color-danger);              /* theme red */
  }

  button:hover .text {
    color: transparent;
  }

  button:hover .icon {
    width: 120px;
    border-left: none;
    transform: translateX(0);
    color: var(--color-font1);                    /* light text */
  }

  button:focus {
    outline: none;
  }

  button:active .icon svg {
    transform: scale(0.9);
  }
`;

export default LogOutBtn;
