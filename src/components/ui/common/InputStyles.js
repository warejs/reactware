import { css } from 'styled-components';

// -font-family: Helvetica, sans-serif;
// font-size: 10px;
// line-height: 1em;

// padding: 3px 5px;

// color: white;
// border: 1px solid 303030;
// background: #3a3a3a;
// outline: #696969;

// border: 1px solid transparent;
// border-image: linear-gradient(to bottom, #535353 0%, #545454 90%, #545454 61%, #696969 100%);
// border-image-slice: 1;
// box-shadow: inset 0px 0px 1px #000000;
// outline: 1px solid transparent;

const InputStyles = css`

  font-size: 10px;
  line-height: 1em;
  padding: 3px 5px;
  color: white;
  background: #3a3a3a;
  box-shadow: inset 0px 1px 1px #303030;
  outline: 1px solid transparent;
  width: 100%;
  border: 1px solid #303030;
  box-sizing: border-box;
  box-shadow: 0px 1px 0px 0px #696969;

  &::placeholder {
    font-size: 10px;
    line-height: 1em;
    letter-spacing: 0px;
  }
  
  &:focus {
    color: black;
    outline: none;
    background: white;
    box-shadow: 0px 0px 0px 1px #506fac;
  }

  width: 100%;
  box-sizing: border-box;
  
`;

export default InputStyles;
