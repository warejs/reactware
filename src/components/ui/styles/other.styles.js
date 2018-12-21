
import { css } from 'styled-components';

/* MPR - margin padding reset */
const MPR = css`
  margin: 0;
  padding: 0;
`;

const unselectable = css`
  user-select: none;
`;

const fullwidth = css`
  position: fixed;
  width: 100vh;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 2147483647;
`;

const other = {
  MPR,
  unselectable,
  fullwidth,
};

export default other;
