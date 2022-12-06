
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useMatch } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { userLoggedOut } from "../features/auth/authSlice";

export default function Navigation({handleSearch}) {


  
    const dispatch = useDispatch()

    const match =  useMatch("/projects")

    const {user} = useSelector(state => state?.auth)
    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    };

    let activeStyle = {
        color:"blue"
    }

    return (
        <div
        className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
    >
        <Link to="/">
        <img  src={logo} className="h-10 w-10" alt="logo"/>
        </Link>  
        {
            match && (    <input onChange={(e) => handleSearch(e.target.value)}
                className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
                type="search"
                placeholder="Search for anything…"
            />)
        }
        
        <div className="ml-10">
            <NavLink to="/projects"
                 className="mx-2 text-sm font-semibold hover:text-indigo-700"
                 style={({isActive}) => isActive ? activeStyle : undefined}
               
                >
                    Projects
                
                </NavLink
            >
            <NavLink
                className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                to="/team"
                style={({isActive}) => isActive ? activeStyle : undefined}
                >Team</NavLink
            >
        </div>
  
     
  
        <div className="flex items-center justify-center ml-auto">
       
         <span className=" mr-5 font-bold">
                                {user?.name}
                            </span>   
     
        
      
        <span className="cursor-pointer mr-5 font-bold" onClick={logout}>
                                Logout
                            </span>   

                            <button
            className="flex items-center justify-center  cursor-pointer"
        >
            <img className="w-9 h-9 rounded-full"
                src={user?.avatar}
                alt=""
            />
        </button> 
        
        </div>
    </div>
    );
}
