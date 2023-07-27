import { createContext, ReactNode, useState, useEffect } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";

interface AccountContextType {
  loggedInUser: CognitoUser | null;
  resetCurrentAuthedUser: () => Promise<any>;
  signIn: (username: string, password: string) => Promise<any>;
  signOut: (callback: VoidFunction) => Promise<any>;
}

const AccountContext = createContext<AccountContextType>(null!);


const Account = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<CognitoUser | null>(null);
  
  const resetCurrentAuthedUser = async () => {
    if (!loggedInUser) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          setLoggedInUser(user);
        }
      } catch (err) {
        console.error("Error retrieving the current authenticated user.", err);
      }
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const user = await Auth.signIn(username, password);
      setLoggedInUser(user);
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store user data in local storage
      return user; // Return the user object
    } catch (err) {
      console.error("Error signing in.", err);
      throw err; // Throw the error for handling in the component
    }
  };

  const signOut = async (callback: VoidFunction) => {
    try {
      await Auth.signOut();
      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser"); // Remove user data from local storage
      callback();
    } catch (err) {
      console.error("Error signing out.", err);
      throw err; // Throw the error for handling in the component
    }
  };

  useEffect(() => {
    // Check for user data in local storage on component mount
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setLoggedInUser(user);
    }
  }, []);

  let value = {
    loggedInUser,
    resetCurrentAuthedUser,
    signIn,
    signOut,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export { Account, AccountContext };