import { FaApple, FaGooglePlay } from "react-icons/fa";
import appImage from "../assets/app.png"

const AppDownloadSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between  py-10 px-5 md:px-20">
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src={appImage}
                    alt="App preview"
                    className="h-96"
                />
            </div>

            {/* Right Side: Text and Ratings */}
            <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
                <h1 className="text-4xl font-bold text-[#008080] mb-4">
                    Better <span className="text-[#FFC107]">Bites</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Share, Save, Savor – Anytime, Anywhere. <br />
                    <span className="font-semibold text-[#008080]">
                        Download the App Today and Start Sharing!
                    </span>
                </p>

                {/* Ratings */}
                <div className="flex justify-center md:justify-start items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <FaApple className="text-black text-xl" />
                        <span className="text-gray-700 font-semibold">4.9</span>
                        <span className="text-yellow-500 text-lg">★★★★★</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaGooglePlay className="text-black text-xl" />
                        <span className="text-gray-700 font-semibold">4.6</span>
                        <span className="text-yellow-500 text-lg">★★★★☆</span>
                    </div>
                </div>

                {/* Download Button */}
                <div className="flex justify-center md:justify-start">
                    <button className="bg-[#008080] hover:bg-[#0d5353] text-white py-3 px-6 rounded-full text-lg">
                        Get the App
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppDownloadSection;
