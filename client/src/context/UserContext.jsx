import React, { useContext, useState } from "react";
const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  //get all the contacts for a spcific userId
  //   async function fetchContacts(userId) {
  //     try {
  //       const option = {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //           Origin: "http://localhost:3000",
  //           "Access-Control-Allow-Credentials": true,
  //           "Access-Control-Allow-Headers":
  //             "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Credentials",
  //         },
  //       };
  //       const res = await fetch(
  //         `http://localhost:3000/allContacts/?userId=${userId}`,
  //         option
  //       );
  //       const fetchAllContacts = await res.json();

  //       if (fetchAllContacts.success) {
  //         allContacts = fetchAllContacts.data;
  //         renderContacts(allContacts);
  //       } else {
  //         alert(fetchAllContacts.message);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  const value = {
    val: 10,
  };
  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};
