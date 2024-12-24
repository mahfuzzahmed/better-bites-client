import bannerIMG from '../assets/bannerIMG.jpg'
const Banner = () => {
    return (
        <div
            className="relative flex items-center justify-center"
        >
            <img className='w-full h-[550px] object-cover' src={bannerIMG} alt="" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="absolute z-10 top-48 left-9 max-w-2xl px-4 md:px-8">
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                    Fighting Food Waste, Feeding Communities
                </h1>
                <p className="text-white text-lg md:text-xl mb-6">
                    Better Bites helps reduce food waste by redistributing surplus food
                    to those in need. Join our mission to make a difference!
                </p>
                <div className="flex flex-col md:flex-row gap-4 ">
                    <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl">
                        Donate Now
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl">
                        Get Involved
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
