import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Textbox from '../textbox';
import Select from '../select';

export default class Combobox extends React.Component {
  static propTypes = {
    search: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    placeholder: PropTypes.string,
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    search: '',
    size: 3,
    options: [],
    selected: '',
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      search: props.search,
      selected: props.selected,
    };
  }

  onChangeTextbox(value, event) {
    const { onChange } = this.props;
    this.setState({
      search: value,
      selected: '',
    });
    onChange(value, null, event);
  }

  onChangeSelect(value, option, event) {
    const { onChange } = this.props;
    this.setState({
      search: option.label,
      selected: value,
    });
    onChange(value, option, event);
  }

  render() {
    const {
      props: { size, options, placeholder },
      state: { search, selected },
    } = this;

    // fuzzy searched options
    const fopts = options.filter((option) => {
      const s = search.toLowerCase();
      const hay = option.label.toLowerCase();
      let i = 0;
      let n = -1;
      let l;
      for (; l = s[i++] ;) if (!~(n = hay.indexOf(l, n + 1))) return false; //eslint-disable-line
      return true;
    });

    // Exact maches need to be updated
    const exact = (fopts.length === 1 && fopts[0].label.toLowerCase() === search.toLowerCase());
    if (exact && !selected) this.onChangeSelect(fopts[0].value, fopts[0], null);

    return (
      <React.Fragment>
        <Textbox
          value={search}
          onChange={(value, event) => this.onChangeTextbox(value, event)}
          onFocus={(event) => event.target.selectedIndex = -1}
          placeholder={placeholder}
        />
        <Select
          selected={selected}
          size={size}
          options={fopts}
          onChange={(value, option, event) => this.onChangeSelect(value, option, event)}
        />
      </React.Fragment>
    );
  }
}
