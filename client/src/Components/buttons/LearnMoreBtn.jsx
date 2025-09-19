import React from "react";
import styled from "styled-components";

const LearnMoreBtn = () => {
  return (
    <StyledWrapper>
      <button>
        <span>Learn more</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: inline-block;
    border: 1px solid var(--color-iconic);       /* border color */
    border-radius: var(--standard-radius);       /* from theme */
    color: var(--color-iconic);                   /* text color */
    text-align: center;
    padding: 12px 32px;
    font-size: 16px;
    transition: all 0.5s;
    cursor: pointer;
    background: transparent;                     /* cleaner look */
  }

  button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
    color: var(--color-iconic);                   /* darker text */
  }

  button span:after {
    content: '»';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -15px;
    transition: 0.5s;
    color: var(--color-iconic);             /* subtle arrow */
  }

  button:hover span {
    padding-right: 15px;
  }

  button:hover span:after {
    opacity: 1;
    right: 0;
  }
`;

export default LearnMoreBtn;
