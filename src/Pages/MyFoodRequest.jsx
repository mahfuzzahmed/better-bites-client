import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const MyFoodRequest = () => {
    // const [foodRequests, setFoodRequests] = useState([]);
    const queryClient = useQueryClient();
    const { user } = useContext(AuthContext); // Replace with dynamic email from user context
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
            {/* Scrollable container for the table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Food Name</th>
                            <th className="border px-4 py-2 hidden sm:table-cell">Donor Name</th>
                            <th className="border px-4 py-2 hidden md:table-cell">Pickup Location</th>
                            <th className="border px-4 py-2 hidden lg:table-cell">Expire Date</th>
                            <th className="border px-4 py-2 hidden lg:table-cell">Request Date</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodRequests?.map((request) => (
                            <tr key={request._id}>
                                <td className="border px-4 py-2">{request.foodName}</td>
                                <td className="border px-4 py-2 hidden sm:table-cell">
                                    {request.donatorName}
                                </td>
                                <td className="border px-4 py-2 hidden md:table-cell">
                                    {request.pickupLocation}
                                </td>
                                <td className="border px-4 py-2 hidden lg:table-cell">
                                    {request.expiredDate}
                                </td>
                                <td className="border px-4 py-2 hidden lg:table-cell">
                                    {request.requestDate}
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleUpdateAndDelete(request._id)}
                                    >
                                        Cancel Request
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyFoodRequest;
