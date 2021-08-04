import React from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import styled from "styled-components";

const CreateContactsBtn = styled.button``;
const LogoutBtn = styled.button``;
const SearchBox = styled.section``;
const Header = () => {
  return (
    <>
      <section className="header">
        <CreateContactsBtn>
          <img
            src="https://img.icons8.com/plasticine/50/000000/plus-math.png"
            alt="plus icon"
          />
          Create Contact
        </CreateContactsBtn>
        <SearchBox>
          <FaSearch />
          <input type="text" />
          <FaTimes />
          <div className="search_results"></div>
        </SearchBox>
        <LogoutBtn>Logout</LogoutBtn>
      </section>
    </>
  );
};

export default Header;
