import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import * as Styles from '../styles';

// /${Styles.before.border.bottom}

const ProgressContainer = styled.div`
  ${Styles.other.unselectable}
  ${Styles.before.border.bottom}
  
  width: 100%;
  height: 5px;
  margin: 0;
  outline: none;
  border-radius: 9px;
  border: 1px solid #232323;
  background-image: linear-gradient(#2b2b2b,#4b4b4b);
  box-sizing: border-box;
  position: relative;
`;

const ProgressBar = styled.div`
  ${Styles.other.unselectable}
  
  height: 3px;
  border-radius: 3px;
  background: #0b5fff;
  background-image: linear-gradient(#ffffff 0%, #0b5fff 15%, #265cc1 100%);
  width: 0%;

  ${props => props.complete && css`
    width: ${props.complete}%;
  `} 
`;

export default class Progress extends React.Component {
  static propTypes = {
    complete: PropTypes.number,
  };

  static defaultProps = {
    complete: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      props: {
        complete, ...rest
      },
    } = this;

    return (
      <ProgressContainer {...rest}>
        <ProgressBar complete={complete} />
      </ProgressContainer>
    );
  }
}
