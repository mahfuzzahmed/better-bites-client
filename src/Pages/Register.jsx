import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate()
    const { createNewUser, setUser, googleSignIn, updateUserProfile } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const handleRegister = (e) => {
        e.preventDefault()

        setError('')

        const email = e.target.email.value
        const password = e.target.password.value
        const name = e.target.name.value
        const photo = e.target.photo.value

        const uppercaseRegex = /^(?=.*[A-Z]).*$/;
        const lowercaseRegex = /^(?=.*[a-z]).*$/;

        // validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
        }

        if (!uppercaseRegex.test(password)) {
            setError("Password must include at least one uppercase letter.");
            return
        }

        if (!lowercaseRegex.test(password)) {
            setError("Password must include at least one lowercase letter.");
        }

        // creating new user
        createNewUser(email, password)
            .then(res => {
                console.log(res.user)
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                });
                setUser(res.user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        navigate("/");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            })
            .catch(err => {
                console.log("error", err)
            })


    }
    const handleGoogleLogin = () => {
        // login with google 
        googleSignIn()
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "Logged in Successfully",
                });
                console.log(res.user)
                navigate("/");
                setUser(res.user)
            })
            .catch(err => {
                console.log("error", err)
            })
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                <h2 className="text-2xl font-semibold text-center">
                    Register your account
                </h2>
                <form onSubmit={handleRegister} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="name"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    {/* {error.name && (
                    <label className="label text-sx text-red-500">{error.name}</label>
                )} */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="photo-url"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    {/* email input  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            required
                        />
                        <label className="label">
                            {error && <label className="label text-red-700 text-sm">{error}</label>}
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-neutral rounded-lg">Register</button>
                    </div>
                </form>

                <p className="flex justify-center items-center">

                    <button onClick={handleGoogleLogin} className='btn btn-ghost font-semibold'><span><FcGoogle /></span>Continue with Google</button>
                </p>
                <p className="text-center font-semibold">
                    Already Have An Account ?{" "}
                    <Link className="text-red-500" to="/auth/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;