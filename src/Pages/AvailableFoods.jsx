import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [isThreeColumn, setIsThreeColumn] = useState(true); 
    const navigate = useNavigate();

    // Fetch available foods
    useEffect(() => {
        fetch("https://server-side-alpha-ecru.vercel.app/foods?status=available")
            .then((res) => res.json())
            .then((data) => {
                setFoods(data);
                setFilteredFoods(data);
            });
    }, []);

    // Handle search functionality
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = foods.filter((food) =>
            food.foodName.toLowerCase().includes(term)
        );
        setFilteredFoods(filtered);
    };

    // Handle sort functionality
    const handleSort = (order) => {
        setSortOrder(order);

        const sorted = [...filteredFoods].sort((a, b) => {
            const dateA = new Date(a.expiredDate);
            const dateB = new Date(b.expiredDate);

            return order === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredFoods(sorted);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Available Foods</h2>
            <div className="text-center mb-16">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by Food Name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="input input-bordered w-full sm:w-1/3"
                />
            </div>
            {/*Sort, and Layout Toggle Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-11">


                {/* Sort Dropdown */}
                <select
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="" disabled>
                        Sort
                    </option>
                    <option value="asc">Sort by Expiry Date (Ascending)</option>
                    <option value="desc">Sort by Expiry Date (Descending)</option>
                </select>


                {/* Layout Toggle Button */}
                <div className="flex justify-end ">
                    <button
                        onClick={() => setIsThreeColumn(true)}
                        className={`btn ${isThreeColumn ? "btn bg-[#FFC107] " : "btn-outline"} rounded-none rounded-l-md`}
                    >
                        3 Column 
                    </button>
                    <button
                        onClick={() => setIsThreeColumn(false)}
                        className={`btn ${!isThreeColumn ? "btn bg-[#FFC107] " : "btn-outline"} rounded-none rounded-r-md `}
                    >
                        2 Column 
                    </button>
                </div>

            </div>

            {/* Foods Section */}
            <div
                className={`grid gap-6 ${isThreeColumn ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
                    }`}
            >
                {filteredFoods.map((food) => (
                    <div key={food._id} className="card shadow-md">
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="h-48 w-full object-cover rounded-t-md"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{food.foodName}</h3>
                            <p className="text-sm text-gray-500">
                                Quantity: {food.foodQuantity}
                            </p>
                            <p className="text-sm text-gray-500">
                                Expiry Date: {food.expiredDate}
                            </p>
                            <p className="text-sm text-gray-500">
                                Location: {food.pickupLocation}
                            </p>
                            <button
                                onClick={() => navigate(`/food/${food._id}`)}
                                className="btn bg-green-500 hover:bg-green-700 border-none text-black mt-4 w-full"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;
