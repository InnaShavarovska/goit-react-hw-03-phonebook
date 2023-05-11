import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export class Filter extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <label className={css.label}>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={value}
          onChange={onChange}
          placeholder="Enter name"
          className={css.input}
        />
      </label>
    );
  }
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
