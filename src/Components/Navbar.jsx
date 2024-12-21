import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
    // const navigate = useNavigate()
    const { user, userLogOut } = useContext(AuthContext)

    const links = <>
        <li className="text-white"><NavLink to="/">Home</NavLink></li>
        <li className="text-white"><NavLink to="/availableFood">Available Food</NavLink></li>
        <li className="text-white"><NavLink to="/addFood">Add Food</NavLink></li>
        <li className="text-white"><NavLink to="/manageFoods">Manage Foods</NavLink></li>
        <li className="text-white"><NavLink to="/foodRequest">My Food Request</NavLink></li>
    </>
    return (
        <div>
            <div className="navbar z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/'><button className=" text-xl text-[#008080] font-bold">Better<span className="text-[#FFC107]">Bites</span></button></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user && user?.email ? (
                        <div className="flex gap-3 items-center ">
                            {/* Profile Photo */}
                            <img
                                src={user?.photoURL}
                                alt="User Profile"
                                className="w-10 h-10 rounded-full border border-[#006B5D] object-cover cursor-pointer"
                            />

                            {/* logout button */}

                            <button
                                onClick={userLogOut}
                                className="btn btn-neutral text-white bg-[#006B5D] rounded-lg">
                                Log-Out
                            </button>

                        </div>

                    ) : (
                        <div className="flex gap-4">
                            <Link to="/auth/login" className="btn text-white btn-neutral rounded-lg bg-[#006B5D]">
                                Login
                            </Link>
                            <Link to="/auth/register" className="btn text-white btn-neutral rounded-lg bg-[#006B5D]">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;