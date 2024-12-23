import direct from "../assets/direct.jpg"
import retailer from "../assets/retailer.jpg"
import wholesale from "../assets/wholesale.jpg"
const HowWeDoit = () => {
    return (
        <div className="bg-green-500 text-white py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">How We Do It</h2>
                <h2 className="text-3xl font-bold">Making Fresh Food Donations <br /> Simple and Accessible</h2>
                <p className="mt-4">
                    We streamline the process of donating surplus perishable food, ensuring businesses <br /> of all kinds can give back quickly and effectively.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-20">
                {/* Card 1 */}
                <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
                    <img src={retailer} alt="Retail Rescue" className="w-full h-40 object-cover" />
                    <div className="p-4">
                        <h3 className="font-bold text-lg">Retail Rescue</h3>
                        <p className="mt-2 text-sm">Helping stores donate surplus products effortlessly.</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
                    <img src={wholesale} alt="Wholesale Rescue" className="w-full h-40 object-cover" />
                    <div className="p-4">
                        <h3 className="font-bold text-lg">Wholesale Rescue</h3>
                        <p className="mt-2 text-sm">Partnering with distributors to save bulk food.</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden">
                    <img src={direct} alt="Direct Link" className="w-full h-40 object-cover" />
                    <div className="p-4">
                        <h3 className="font-bold text-lg">Direct Link</h3>
                        <p className="mt-2 text-sm">Bridging donors and recipients directly.</p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <button className="bg-white text-green-700 btn btn-wide rounded-md hover:bg-green-300">
                    Partner With Us
                </button>
            </div>
        </div>

    );
};

export default HowWeDoit;