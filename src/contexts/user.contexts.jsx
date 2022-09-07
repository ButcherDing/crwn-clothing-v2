import { createContext, useState, useEffect } from "react";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signOutUser,
} from "../utils/firebase/firebase.utils";

// actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// provider - the component you want to use to get access to the value
export const UserProvider = ({ children }) => {
  // set up your values (user data)
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // essentially wrap the whole app so that all children have access to the data
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

<UserProvider>
  <app />
</UserProvider>;
