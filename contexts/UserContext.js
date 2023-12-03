import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userUid, setUserUid] = useState(null);

  // Function to set userUid
  const setUserUidValue = (uid) => {
    setUserUid(uid);
  };

  return (
    <UserContext.Provider value={{ userUid, setUserUidValue }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}