import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { ArrowLeftIcon, CalendarIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";

export default function PetDetailsPage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error("Error fetching pet:", error);
        toast.error("Failed to load pet details");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Pet not found</h2>
          <p className="mt-2 text-gray-600">The pet you're looking for doesn't exist.</p>
          <Link
            to="/pets"
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to pets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/pets"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-500 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to pets
      </Link>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative h-96 lg:h-full">
            <img
              src={pet.photo}
              alt={pet.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{pet.name}</h1>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <TagIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">Type:</span>
                <span className="ml-2 capitalize">{pet.type}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">Birth Date:</span>
                <span className="ml-2">{format(new Date(pet.birthdate), "PP")}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <UserIcon className="h-5 w-5 mr-2" />
                <span className="font-medium">Gender:</span>
                <span className="ml-2 capitalize">{pet.gender}</span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                <p className="text-gray-600 leading-relaxed">{pet.description}</p>
              </div>

              <div className="pt-6">
                <Link
                  to="/pets"
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors w-full sm:w-auto text-center"
                >
                  Interested in Adopting?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
