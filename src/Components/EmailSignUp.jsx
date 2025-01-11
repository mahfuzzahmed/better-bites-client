import { useState } from 'react';

const EmailSignUp = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log('Email submitted:', email);
    };

    return (
        <div className="min-h-[300px] w-full container mx-auto border  mt-10 mb-10  flex items-center justify-center  rounded-xl">
            <div className="w-full max-w-3xl mx-auto text-center px-4 py-8">
                <h2 className="text-black text-xl sm:text-2xl md:text-3xl mb-6 font-extrabold">
                    Ready to get involved? Enter your email.
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="w-full sm:w-2/3">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 text-base  border border-gray-600 rounded text-black focus:outline-none focus:border-gray-400 placeholder-gray-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 bg-yellow-500 hover:bg-yellow-700 text-black font-medium rounded text-lg transition-colors duration-200 flex items-center justify-center"
                    >
                        Get Started
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailSignUp;