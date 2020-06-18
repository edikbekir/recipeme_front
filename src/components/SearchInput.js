import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {
  NavLink as BSNavLink,
} from 'reactstrap';

const SearchInput = props => {
  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        onChange={(e) => props.onSearch(e.target.value)}
        type="search"
        className="cr-search-form__input"
        placeholder={props.t('search')}
      />
      <ul className="search-recipes-list">
        {props.searchResult.map( data => {
          return(
            <BSNavLink
              id="showNavItem"
              to={`/recipes/${data.id}`}
              tag={NavLink}
              activeClassName="active"
              exact={true}
            >
              <span>
                {data.name}
              </span>
            </BSNavLink>
          )
          return <li>{}</li>
        })}
      </ul>
    </Form>
  );
};

export default SearchInput;
