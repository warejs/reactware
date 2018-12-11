import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const AbsoluteStyled = styled.div`
  ${props => props.absolute && css`position: absolute;`}
  ${props => props.fixed && css`position: fixed;`}
  ${props => props.top && css`top: ${props.top};`}
  ${props => props.top && css`top: ${props.top};`}
  ${props => props.left && css`left: ${props.left};`}
  ${props => props.right && css`right: ${props.right};`}
  ${props => props.bottom && css`bottom: ${props.bottom};`}
  ${props => props.width && css`width: ${props.width};`}
  ${props => props.height && css`height: ${props.height};`}
`;

const RelativeStyled = styled.div`
  display: inline-block;
  position: relative;
`;

const Absolute = (props) => {
  const { children, wrap, ...rest } = props;
  if (wrap) {
    return (
      <RelativeStyled>
        <AbsoluteStyled {...rest}>{children}</AbsoluteStyled>
      </RelativeStyled>
    );
  }
  return <AbsoluteStyled {...rest}>{children}</AbsoluteStyled>;
};

Absolute.propTypes = {
  absolute: PropTypes.bool,
  fixed: PropTypes.bool,
  wrap: PropTypes.bool,
  top: PropTypes.string,
  left: PropTypes.string,
  bottom: PropTypes.string,
  right: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Absolute.defaultProps = {
  absolute: null,
  fixed: null,
  wrap: null,
  top: null,
  left: null,
  bottom: null,
  right: null,
  width: null,
  height: null,
};

export default Absolute;