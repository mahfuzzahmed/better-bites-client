// FeaturedFoods.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const FeaturedFoods = () => {
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedFoods = async () => {
            try {
                const response = await axios.get('https://server-side-alpha-ecru.vercel.app/featured-foods');
                setFoods(response.data);
                setLoading(false);
            } catch (err) {
                // console.log(err)
                setError('Error fetching featured foods');
                setLoading(false);
            }
        };

        fetchFeaturedFoods();
    }, []);

    if (loading) return <div>Loading Featured Foods...</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Featured Foods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
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
                                className="btn btn-primary mt-4 w-full"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center items-center'>
                <Link to={'/availableFood'}><button className='mt-8 btn btn-wide bg-green-500 text-center'>Show All</button></Link>
            </div>
        </div>
    );
};

export default FeaturedFoods;
