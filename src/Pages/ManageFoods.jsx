import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import UseAxiosSecure from "../Axios/UseAxiosSecure";

const ManageFoods = () => {
    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [editingFood, setEditingFood] = useState(null); // Food to edit
    
    const axiosSecure = UseAxiosSecure()

    // Fetch user's foods
    useEffect(() => {
        // fetch(`https://server-side-alpha-ecru.vercel.app/manage-foods?email=${user?.email}`)
        //     .then((res) => res.json())
        //     .then((data) => setFoods(data));
        axiosSecure.get(`/manage-foods?email=${user?.email}`)
        .then(res => setFoods(res.data))


    }, [axiosSecure, user?.email]);

    // Handle delete action
    const handleDelete = (foodId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://server-side-alpha-ecru.vercel.app/deleteFood/${foodId}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            setFoods(foods.filter((food) => food._id !== foodId));
                            Swal.fire("Deleted!", "Your food has been deleted.", "success");
                        }
                    });
            }
        });
    };

    // Handle update form submission
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedFood = {
            foodName: form.foodName.value,
            foodQuantity: form.foodQuantity.value,
            pickupLocation: form.pickupLocation.value,
            expiredDate: form.expiredDate.value,
            additionalNotes: form.additionalNotes.value,
        };

        fetch(`https://server-side-alpha-ecru.vercel.app/updateFood/${editingFood._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFood),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    setFoods((prevFoods) =>
                        prevFoods.map((food) =>
                            food._id === editingFood._id ? { ...food, ...updatedFood } : food
                        )
                    );
                    Swal.fire("Updated!", "Your food has been updated.", "success");
                    setEditingFood(null); // Close modal
                }
            });
    };

    return (
        <div className="p-4 mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">Manage Your Foods</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Food Name</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Pickup Location</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food) => (
                            <tr key={food._id}>
                                <td className="border border-gray-300 px-4 py-2">{food.foodName}</td>
                                <td className="border border-gray-300 px-4 py-2">{food.foodQuantity}</td>
                                <td className="border border-gray-300 px-4 py-2">{food.pickupLocation}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => setEditingFood(food)}
                                        className="btn btn-sm btn-warning mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(food._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {editingFood && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Update Food</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="form-control">
                                <label>Food Name</label>
                                <input
                                    type="text"
                                    name="foodName"
                                    defaultValue={editingFood.foodName}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    name="foodQuantity"
                                    defaultValue={editingFood.foodQuantity}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label>Pickup Location</label>
                                <input
                                    type="text"
                                    name="pickupLocation"
                                    defaultValue={editingFood.pickupLocation}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label>Expiration Date</label>
                                <input
                                    type="date"
                                    name="expiredDate"
                                    defaultValue={editingFood.expiredDate}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label>Additional Notes</label>
                                <textarea
                                    name="additionalNotes"
                                    defaultValue={editingFood.additionalNotes}
                                    className="textarea textarea-bordered"
                                ></textarea>
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingFood(null)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageFoods;
