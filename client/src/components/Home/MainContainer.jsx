import React from "react";
import StarredContacts from "./StarredContacts";
import Contacts from "./Contacts";
import styled from "styled-components";

const MainContaier = () => {
  return (
    <div className="main_container">
      <StarredContacts />
      <Contacts />
    </div>
  );
};

export default MainContaier;
