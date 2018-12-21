import React from 'react';
import styled, { css } from 'styled-components';

const ResizeHandleStyled = styled.div`
  cursor: n-resize;
  -background: #8c8888;
  font-size: 10px;
  line-height: 5px;
  text-align: center;
  -border: 1px solid #a7a7a7;
  border-top: none;
  justify-content: center;
  align-items: center;
  color: white;
  height: 100%;
  widows: 100%;
  display: flex;

  ${props => props.direction && css` 
    cursor: ${props.direction}-resize; 
  `}
`;

const ResizeHandle = (props) => {
  const {
    E,
    NE,
    NW,
    area,
    onMouseDown,
    ...rest
  } = props;

  //const text = '';
  const text = NE ? "·" : ((NW) ? '·' : (E ? '⋮' : '···')); //eslint-disable-line
  const direction = NE ? "ne" : ((NW) ? 'nw' : (E ? 'e' : '')); //eslint-disable-line

  return (
    <ResizeHandleStyled
      direction={direction}
      onMouseDown={event => onMouseDown(event, area)}
      {...rest}
    >
      { text }
    </ResizeHandleStyled>
  );
};

export default ResizeHandle;
