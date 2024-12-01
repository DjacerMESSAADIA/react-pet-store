import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import PetFormModal from "../components/PetFormModal";

export default function DashboardPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pets");
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      toast.error("Failed to load pets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAddPet = () => {
    setSelectedPet(null);
    setIsModalOpen(true);
  };

  const handleEditPet = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleDeletePet = async (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await axios.delete(`http://localhost:5000/api/pets/${id}`);
        toast.success("Pet deleted successfully");
        fetchPets();
      } catch (error) {
        console.error("Error deleting pet:", error);
        toast.error("Failed to delete pet");
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (selectedPet) {
        await axios.put(
          `http://localhost:5000/api/pets/${selectedPet._id}`,
          formData
        );
        toast.success("Pet updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/pets", formData);
        toast.success("Pet added successfully");
      }
      handleModalClose();
      fetchPets();
    } catch (error) {
      console.error("Error saving pet:", error);
      toast.error("Failed to save pet");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Pets</h1>
        <button
          onClick={handleAddPet}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add New Pet
        </button>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Photo
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Birth Date
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Gender
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pets.map((pet) => (
                    <tr key={pet._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <img
                          src={pet.photo}
                          alt={pet.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {pet.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                        {pet.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(pet.birthdate), "PP")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                        {pet.gender}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditPet(pet)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePet(pet._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <PetFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        pet={selectedPet}
      />
    </div>
  );
}
