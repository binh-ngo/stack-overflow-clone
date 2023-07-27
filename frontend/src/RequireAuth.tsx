import { useContext, ReactNode, useEffect, useState } from "react";
import { AccountContext } from "./Accounts";
import { useLocation, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Auth } from "aws-amplify";

interface RequireAuthProps {
  isAuthenticated: () => Promise<boolean>;
  children: ReactNode;
  restaurant: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  isAuthenticated,
  restaurant,
}) => {
  const { loggedInUser } = useContext(AccountContext);
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthorization = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated && loggedInUser) {
        const userAttributes = await Auth.userAttributes(loggedInUser);
        const userProfile = userAttributes.find(
          (attr) => attr.Name === "profile"
        );
        if (userProfile) {
          const { restaurant: userRestaurant } = JSON.parse(
            userProfile.Value
          );
          // Add your authorization logic here
          // Example: Check if the user's restaurant matches the required restaurant
          setIsAuthorized(userRestaurant === restaurant);
        }
      } else {
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, [isAuthenticated, loggedInUser, restaurant]);

  if (!loggedInUser) {
    console.log(`status: not authed, redirecting to login...`);
    return <LoginPage from={location.pathname} />;
  }

  // if (!isAuthorized) {
  //   return <Navigate to="/" />;
  // }

  return <>{children}</>;
};

export default RequireAuth;
