import { useContext } from "react";
import { AccountContext } from "./Accounts";
import { LandingPage } from "./pages/LandingPage";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { loggedInUser } = useContext(AccountContext);

  if (!loggedInUser) {
    console.log(`status: not authed, redirecting to login...`);
    return <LandingPage />;
  }

  return children;
};

export default RequireAuth;