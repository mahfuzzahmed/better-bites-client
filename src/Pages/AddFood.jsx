import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";

const AddFood = () => {
    const { user } = useContext(AuthContext); 
    const [foodData, setFoodData] = useState({
        foodName: "",
        foodImage: "",
        foodQuantity: "",
        pickupLocation: "",
        expiredDate: "",
        additionalNotes: "",
        foodStatus: "available",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFoodData({ ...foodData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const newFood = {
            ...foodData,
            donatorName: user?.displayName || "Anonymous",
            donatorEmail: user?.email || "N/A",
            donatorImage: user?.photoURL || "",
        };


        fetch("http://localhost:5000/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFood),
        })

        .then(res => res.json())
        .then(data => {
        if (data.insertedId) {
            Swal.fire({
                icon: "success",
                title: "Food Added Successfully!",
                text: "Your food item is now listed for sharing.",
            });
            setFoodData({
                foodName: "",
                foodImage: "",
                foodQuantity: "",
                pickupLocation: "",
                expiredDate: "",
                additionalNotes: "",
                foodStatus: "available",
            });
        }
    })
};

return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add Food</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Food Name</span>
                </label>
                <input
                    type="text"
                    name="foodName"
                    value={foodData.foodName}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Food Image (URL)</span>
                </label>
                <input
                    type="url"
                    name="foodImage"
                    value={foodData.foodImage}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Food Quantity</span>
                </label>
                <input
                    type="number"
                    name="foodQuantity"
                    value={foodData.foodQuantity}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Pickup Location</span>
                </label>
                <input
                    type="text"
                    name="pickupLocation"
                    value={foodData.pickupLocation}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Expiration Date</span>
                </label>
                <input
                    type="date"
                    name="expiredDate"
                    value={foodData.expiredDate}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Additional Notes</span>
                </label>
                <textarea
                    name="additionalNotes"
                    value={foodData.additionalNotes}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered"
                ></textarea>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
                <FaPlus /> Add Food
            </button>
        </form>
    </div>
);
};

export default AddFood;
