import React, { useContext, useState } from 'react';
// import { Auth } from 'aws-amplify';
import { AccountContext } from '../Accounts';
import { useNavigate } from 'react-router-dom';

export const Login = (props:any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [successMessage, setSuccessMessage] = useState('')
  
  const { loggedInUser, signIn, signOut } = useContext(AccountContext);

  let navigate = useNavigate();
  let from = props.from || "/";

  const onSubmit = (event:any) => {
    event.preventDefault();

    signIn(username, password)
      .then((data) => {
        console.log("Logged in.", data);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error("Error logging in.", err);
      });
  };

  return (
    <div className='flex flex-row w-4/12'>
    {!loggedInUser && (
    <form onSubmit={onSubmit} className='flex flex-row'>
      <label>
        Username:
        <input className="border-b-2" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input className="border-b-2" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {errorMessage && <p style={{marginTop: ".5%"}}>{errorMessage}</p>}
      {/* {successMessage && <p style={{marginTop: ".5%"}}>{successMessage}</p>} */}
      <div className="text-sm w-5/12 xl:w-2/12 mr-4 flex flex-row">
        {!loggedInUser && <button className="text-blue-800 bg-sky-100 px-4 rounded-lg mr-1"> Log in </button>}
    </div>    
    </form>
    )}
    {loggedInUser && <button onClick={() => signOut(() => navigate("/"))} className="text-white font-bold bg-orange-500 px-4 py-4 rounded-bl-lg right-0 top-0 absolute"> Log Out</button>}
    </div>
  );
  }
