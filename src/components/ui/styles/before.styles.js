
import { css } from 'styled-components';

/* White underline highlight - rounded; */
const beforeBorderBottom = css`
  &:before {
    content: " ";
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    left: -1px;
    top: -1px;
    border-bottom: 1px solid #696969;
    border-radius: 3px;
  }
`;

const before = {
  border: {
    bottom: beforeBorderBottom,
  },
};

export default before;
