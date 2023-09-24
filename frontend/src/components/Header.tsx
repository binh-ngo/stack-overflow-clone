import logo from "../assets/BINH_8_12_23.png"
// import SearchButton from "./SearchButton"
// import SearchComponent from "./SearchComponent"
import { Login } from './Login';

export const Header = () => {
    // const [isScreenLarge, setIsScreenLarge] = useState(false);

    // useEffect(() => {
    //   const handleResize = () => {
    //     setIsScreenLarge(window.innerWidth >= 501); // Adjust the breakpoint to your desired screen size.
    //   };
  
      // Add event listener to update isScreenLarge state on window resize.
      // window.addEventListener('resize', handleResize);
  
      // Initial check for screen size on component mount.
      // handleResize();
  
      // Clean up the event listener when the component unmounts.
    //   return () => window.removeEventListener('resize', handleResize);
    // }, []);
  
  return (
    <div className="flex items-center border-b-2 border-black-200">
        <img className="w-24 ml-4" src={logo} alt="stackoverflow logo"/> 
        {/* {isScreenLarge ? <SearchComponent /> : <SearchButton />} */}
        <div className='ml-28'>
        <Login />
        </div>
    </div>
  )
}
