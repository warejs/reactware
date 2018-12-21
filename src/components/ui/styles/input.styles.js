import { css } from 'styled-components';
import font from './font.styles';

const input = css`
  ${font.size};

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
    ${font.size};
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

export default input;
