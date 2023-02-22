import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { BiSearchAlt } from 'react-icons/bi';
import {useState } from 'react';

import {
  SearchBarStld,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';


export const SearchBar =({onSearchFormSubmit})=> {
 const [query, setQuery]= useState('')
  

  const formSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter your search request');
      return;
    }

    onSearchFormSubmit(query);
    setQuery('');
  };

  const changeSearchInput = e => {
    setQuery( e.target.value.toLowerCase() );
  };

  
    return (
      <SearchBarStld>
        <SearchForm onSubmit={formSubmit}>
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
            value={query}
            onChange={changeSearchInput}
          />
        </SearchForm>
      </SearchBarStld>
    );
  }


SearchBar.propTypes = {
  onSearchFormSubmit: PropTypes.func.isRequired,
};
