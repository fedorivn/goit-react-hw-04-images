import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import { Component } from 'react';
import {
  SearchBarStld,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  formSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim === '') {
      toast.error('Please enter your search request');
      return;
    }

    this.props.onSearchFormSubmit(this.state.query);
    this.setState({ query: '' });
  };

  changeSearchInput = e => {
    this.setState({ query: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <SearchBarStld>
        <SearchForm onSubmit={this.formSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
            <BiSearchAlt size={24} fill={'#4ab2d8'} />
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            value={this.state.query}
            onChange={this.changeSearchInput}
          />
        </SearchForm>
      </SearchBarStld>
    );
  }
}

SearchBar.propTypes = {
  onSearchFormSubmit: PropTypes.func.isRequired,
};
