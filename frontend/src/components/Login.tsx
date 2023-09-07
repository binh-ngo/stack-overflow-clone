import React, { useContext, useState } from 'react';
// import { Auth } from 'aws-amplify';
import { AccountContext } from '../Accounts';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const config = {
  SignUpConfig: {
    autoConfirmUser: true,
    autoVerifyEmail: true,
  },
};

Auth.configure(config);

export const Login = (props:any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [successMessage, setSuccessMessage] = useState('')
  
  const { loggedInUser, signIn, signUp, signOut } = useContext(AccountContext);

  let navigate = useNavigate();
  let from = props.from || "/";

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // Check if the user exists
      const existingUser = await signIn(username, password);
      console.log("Logged in.", existingUser);
      navigate(from, { replace: true });
    } catch (loginError) {
      console.error("Error logging in.", loginError);
      setErrorMessage("Invalid username or password.");
    }
  };

  const onSignUp = async (event: any) => {
    event.preventDefault();

    try {
      // Sign up the user with username, email, and password
      const newUser = await signUp(username, email, password);
      console.log("Account created.", newUser);
      // Now, log in the newly created user
      const loggedInNewUser = await signIn(username, password);
      console.log("Logged in.", loggedInNewUser);
      navigate(from, { replace: true });
    } catch (signupError) {
      console.error("Error creating account.", signupError);
      setErrorMessage("Failed to create an account. Please try again.");
    }
  };
  return (
    <div className='flex flex-row w-4/12'>
      {!loggedInUser && (
        <form onSubmit={onSubmit} className='flex flex-row'>
          <label>
            Username:
            <input className="border-b-2 mx-3" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input className="border-b-2 mx-3" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {errorMessage && <p style={{ marginTop: ".5%" }}>{errorMessage}</p>}
          <div className="text-sm w-5/12 xl:w-2/12 mr-4 flex flex-row">
            {!loggedInUser && <button className="text-blue-800 bg-sky-100 px-6 rounded-lg mr-1"> Login </button>}
          </div>
        </form>
      )}

      {!loggedInUser && (
        <form onSubmit={onSignUp} className='flex flex-row ml-20'>
          <label>
            Username:
            <input className="border-b-2 mx-3" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Email:
            <input className="border-b-2 px-1" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input className="border-b-2 mx-3" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {errorMessage && <p style={{ marginTop: ".5%" }}>{errorMessage}</p>}
          <div className="text-sm w-5/12 xl:w-2/12 mr-4 flex flex-row">
            {!loggedInUser && <button className="text-blue-800 bg-sky-100 px-6 rounded-lg mr-1"> Signup </button>}
          </div>
        </form>
      )}

      {loggedInUser && <button onClick={() => signOut(() => navigate("/"))} className="text-white font-bold bg-orange-500 px-4 py-4 rounded-bl-lg right-0 top-0 absolute"> Log Out</button>}
    </div>
  );
  }
