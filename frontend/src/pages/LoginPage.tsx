import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AccountContext } from "../Accounts";
import { Formik, FormikProps } from 'formik';
export {};


interface FormValues {
    username: string;
    password: string;
  }
  
  // Allows you to create a restaurant prop that is inherited from App.tsx
  interface LoginProps {
    from: string;
  }
  export const LoginPage:React.FC<LoginProps> = (props) => {
    
    const initialValues: FormValues = {
      username: '',
      password: ''
    };
    const { loggedInUser, signIn, resetCurrentAuthedUser } = useContext(AccountContext);
  
    let navigate = useNavigate();
    let from = props.from || "/";
  
    const onSubmit = (values:FormValues) => {
      // event.preventDefault();
      const { username, password } = values;

      signIn(username, password)
        .then((user) => {
          console.log("Logged in.", user);
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.error("Error logging in.", err);
        });
    };

    useEffect(() => {
      const checkAuth = async () => {
        await resetCurrentAuthedUser();
      };
      if (!loggedInUser) {
        checkAuth();
      }
    }, [loggedInUser, resetCurrentAuthedUser]);
    
  

const validate = (values: FormValues) => {
      const errors: Partial<FormValues> = {};
      if (!values.username) {
        errors.username = 'Required';
      } 
      if (values.password.length < 8) {
        errors.password = "Please make sure your password is longer than 8 characters."
      }
      return errors;
    };

  return (
    <div className="flex flex-col overflow-hidden
                    md:flex-row md:min-h-screen md:overflow-auto">
      {/* Left Content */}
      <div className="border-b-8 border-blue-500 flex flex-col items-center bg-gradient-to-b from-orange-500 to-yellow-300 text-white justify-between pb-10
                  md:w-7/12 md:justify-around
                  md:border-r-8 md:border-blue-500 md:border-b-0">
        <h1 className='w-full text-4xl font-bold mt-12 ml-5
                  md:text-5xl
                  lg:text-7xl lg:ml-16'>This is <span className='text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900'>WaitLoss</span>.</h1>
        <h2 className='w-3/4 text-4xl font-bold mt-7 -ml-4
                  md:text-5xl md:ml-4
                  lg:text-7xl'
        ><span className='text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900'>We're excited </span>to have you here.</h2>
        <p className='text-3xl items-center font-bold pb-2 mt-8 w-3/4 ml-24
                  md:text-5xl md:ml-6 md:w-10/12 md:-mr-20
                  lg:-mr-24 lg:text-7xl
                  form-xl:-mr-64
                  form-2xl:-mr-96'>To our <span className='text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900'>loyal </span>patrons, <span className='text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900'>welcome back.</span></p>
      </div>
      {/* Right Content */}
      <div className="flex flex-col items-center md:w-5/12 p-8">
        <h1 className="text-2xl mb-4">Log in to manage your waitlist!</h1>
        <Formik className="mb-0" initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }: FormikProps<FormValues>) => (
            <form onSubmit={handleSubmit} className="space-y-4 w-9/12">
              <input
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className="border rounded px-2 py-4 w-full"
                placeholder="Username"
              />
              {errors.username && touched.username && <div className="text-red-500">{errors.username}</div>}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="border rounded px-2 py-4 w-full"
                placeholder="Password"
              />
              {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export type {LoginProps};