import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // const emailRef = useRef()

    const { userLogin, googleSignIn, setUser, } = useContext(AuthContext)
    console.log(error,"this one")

    const handleLogin = (e) => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        // login with email and password
        userLogin(email, password)
            .then(res => {
                navigate(location?.state ? location.state : "/");
                console.log(res.user)
            })
            .catch(err => {
                setError(err);
                console.log("error", err)
            })

    }
    const handleGoogleLogin = () => {
        // login with google 
        googleSignIn()
            .then(res => {
                setUser(res.user)
                console.log(res.user)
                navigate("/");
            })
            .catch(err => {
                console.log("error", err)
            })
    }



    return (
        <div>
            <div className="min-h-screen flex justify-center items-center animate__animated animate__shakeX">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                    <h2 className="text-2xl font-semibold text-center">
                        Login your account
                    </h2>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            {/* <label className="label">
                                <a onClick={resetEmail} className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                            <label className="label">
                                {error && <label className="label text-red-700 text-sm">{error.message}</label>}
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className='text-center mb-4 font-semibold'>
                        New to this website? please <Link className="text-red-700" to="/auth/register">Register</Link>
                    </p>
                    <p className="flex justify-center items-center">

                        <button onClick={handleGoogleLogin} className='btn btn-wide font-semibold'><span><FcGoogle /></span>Continue with Google</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;