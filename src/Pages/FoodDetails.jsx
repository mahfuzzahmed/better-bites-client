import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const FoodDetails = () => {
    const food = useLoaderData(); // Load specific food data by ID
    const { user } = useContext(AuthContext); // Logged-in user info
    const navigate = useNavigate();

    const handleRequest = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const requestData = Object.fromEntries(formData.entries());
        requestData.foodStatus = "requested";

        fetch(`https://server-side-alpha-ecru.vercel.app/foods/request`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: "success",
                        title: "Food Requested Successfully!",
                        text: "The food has been added to your requests.",
                    });
                    navigate("/foodRequest"); 
                }
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg mt-7">
            <h2 className="text-2xl font-bold mb-4">{food.foodName}</h2>
            <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p><strong>Quantity:</strong> {food.foodQuantity}</p>
            <p><strong>Pickup Location:</strong> {food.pickupLocation}</p>
            <p><strong>Expire Date:</strong> {food.expiredDate}</p>
            <p><strong>Donator Name:</strong> {food.donatorName}</p>
            <p><strong>Donator Email:</strong> {food.donatorEmail}</p>
            <p><strong>Additional Notes:</strong> {food.additionalNotes || "N/A"}</p>

            <label
                htmlFor="request-modal"
                className="btn btn-primary mt-4"
            >
                Request Food
            </label>

            {/* Modal */}
            <input type="checkbox" id="request-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="request-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <form onSubmit={handleRequest}>
                        <input
                            type="hidden"
                            name="foodId"
                            value={food._id}
                        />
                        <div className="form-control">
                            <label className="label">Food Name</label>
                            <input
                                type="text"
                                name="foodName"
                                value={food.foodName}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Food Image</label>
                            <input
                                type="text"
                                name="foodImage"
                                value={food.foodImage}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Donator Name</label>
                            <input
                                type="text"
                                name="donatorName"
                                value={food.donatorName}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Donator Email</label>
                            <input
                                type="text"
                                name="donatorEmail"
                                value={food.donatorEmail}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">User Email</label>
                            <input
                                type="text"
                                name="userEmail"
                                value={user?.email}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Request Date</label>
                            <input
                                type="text"
                                name="requestDate"
                                value={new Date().toLocaleString()}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Pickup Location</label>
                            <input
                                type="text"
                                name="pickupLocation"
                                value={food.pickupLocation}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Expire Date</label>
                            <input
                                type="text"
                                name="expiredDate"
                                value={food.expiredDate}
                                className="input input-bordered"
                                readOnly
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">Additional Notes</label>
                            <textarea
                                name="additionalNotes"
                                className="textarea textarea-bordered"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mt-4 w-full"
                        >
                            Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
