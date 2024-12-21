import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-6xl font-bold text-[#006B5D]">404</h1>
                <p className="text-xl mt-4">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="mt-6 px-4 py-2 bg-[#006B5D] text-white rounded-lg hover:bg-[#062b26] ">
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;