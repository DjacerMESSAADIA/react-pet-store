import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    gender: "",
    search: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pets");
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) => {
    const matchesType = !filters.type || pet.type === filters.type;
    const matchesGender = !filters.gender || pet.gender === filters.gender;
    const matchesSearch = !filters.search || 
      pet.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      pet.description.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesType && matchesGender && matchesSearch;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Available Pets</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search pets..."
              value={filters.search}
              onChange={handleFilterChange}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          {/* Type Filter */}
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Types</option>
            <option value="dog">Dogs</option>
            <option value="cat">Cats</option>
            <option value="bird">Birds</option>
            <option value="other">Other</option>
          </select>

          {/* Gender Filter */}
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <Link
            key={pet._id}
            to={`/pets/${pet._id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={pet.photo}
              alt={pet.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{pet.name}</h2>
              <p className="text-gray-600 capitalize">{pet.type}</p>
              <p className="text-sm text-gray-500">
                Born: {format(new Date(pet.birthdate), "PP")}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No pets found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 