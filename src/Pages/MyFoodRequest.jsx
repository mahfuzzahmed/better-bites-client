import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaStickyNote } from "react-icons/fa";


const MyFoodRequest = () => {
    // const [foodRequests, setFoodRequests] = useState([]);
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext); 
    const userEmail = user?.email
    console.log(userEmail)

    // Fetch food requests of logged-in user
    const { isLoading, data: foodRequests, isError, error } = useQuery({
        queryKey: ['foodRequests'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/my-food-requests?email=${userEmail}`);
            return res.json();
        },
    });
    console.log(foodRequests)


    // Mutation for deleting a request
    const updateAndDeleteMutation = useMutation({
        mutationFn: async ({ foodId }) => {
            const res = await fetch(`http://localhost:5000/update-food-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ foodId }),
            });
            return res.json();
        },
        onSuccess: () => {
            // Refetch the food requests after successful mutation
            queryClient.invalidateQueries(['foodRequests', userEmail]);
        },
        
    });
    

    // Delete Confirmation Handler
    const handleUpdateAndDelete = (foodId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will make the food available again and remove your request.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, proceed!",
        }).then((result) => {
            if (result.isConfirmed) {
                updateAndDeleteMutation.mutate({ foodId });
            }
        });
    };


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Food Requests</h1>

        <div className="flex flex-col space-y-4">
            {foodRequests?.map((request) => (
                <div
                    key={request._id}
                    className="card card-side bg-base-100 shadow-xl"
                >
                    <figure>
                        <img
                            src={request.foodImage}
                            alt={request.foodName}
                            className="w-96 h-full object-cover"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{request.foodName}</h2>
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-500" />
                            <p className="text-gray-700 font-medium">{request.donatorName}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-blue-500" />
                            <p className="text-gray-700">{request.donatorEmail}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaMapMarkerAlt className="text-green-500" />
                            <p className="text-gray-700">{request.pickupLocation}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-yellow-500" />
                            <p className="text-gray-700">Expires: {request.expiredDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-yellow-500" />
                            <p className="text-gray-700">Requested: {request.requestDate}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaStickyNote className="text-purple-500" />
                            <p className="text-gray-700">
                                {request.additionalNotes || "No additional notes"}
                            </p>
                        </div>
                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleUpdateAndDelete(request._id)}
                            >
                                Cancel Request
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default MyFoodRequest;
