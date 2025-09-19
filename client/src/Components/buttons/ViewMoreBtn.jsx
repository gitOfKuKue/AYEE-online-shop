import React from 'react';
import styled from 'styled-components';
import '../../index.css';

const ViewMoreBtn = ({ title }) => {
  return (
    <StyledWrapper>
      <button>
        <span>{title}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: inline-block;
    border: 1px solid var(--color-border);
    border-radius: var(--standard-radius);
    color: var(--color-font1);
    text-align: center;
    padding: 5px 15px;
    font-size: 14px;
    height: 35px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
    background: var(--color-background);
  }

  button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
    color: var(--color-font2);
  }

  button span:after {
    content: '»';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -15px;
    transition: 0.5s;
  }

  button:hover span {
    padding-right: 15px;
  }

  button:hover span:after {
    opacity: 1;
    right: 0;
  }
`;

export default ViewMoreBtn;
