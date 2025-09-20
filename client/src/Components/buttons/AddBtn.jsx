import React from 'react';
import styled from 'styled-components';

const AddBtn = () => {
  return (
    <StyledWrapper>
      <button type="button" className="button">
        <span className="button__text">Add Item</span>
        <span className="button__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            className="svg"
          >
            <line y2={19} y1={5} x2={12} x1={12} />
            <line y2={12} y1={12} x2={19} x1={5} />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 120px;         
    height: 35px;         
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid var(--color-border);
    border-radius: 5px;
  }

  .button,
  .button__icon,
  .button__text {
    transition: all 0.3s;
  }

  .button .button__text {
    transform: translateX(22px);  /* adjusted for new width */
    color: var(--color-font2);
    font-weight: 600;
    font-size: 0.8rem;
  }

  .button .button__icon {
    position: absolute;
    transform: translateX(88px);   /* adjusted so icon stays at right */
    height: 100%;
    width: 30px;                   /* icon container */
    background-color: var(--color-border);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button .svg {
    width: 20px;                   /* plus icon size */
    stroke: #fff;
  }

  .button:hover {
    background: var(--color-iconic);
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 118px;                  /* almost full width on hover */
    transform: translateX(0);
    background-color: var(--color-iconic);
  }

  .button:active .button__icon {
    background-color: var(--color-iconic);
  }

  .button:active {
    border: 1px solid var(--color-iconic);
  }
`;

export default AddBtn;
