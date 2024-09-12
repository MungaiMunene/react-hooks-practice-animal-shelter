import React, { useEffect, useState, useCallback } from 'react';
import Pet from './Pet';
import Filters from './Filters';

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: 'all' }); // Initialize filters state

  const fetchPets = useCallback(async () => {
    let url = 'http://localhost:3001/pets';
    if (filters.type !== 'all') {
      url += `?type=${filters.type}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  }, [filters]); // Dependencies of useCallback

  useEffect(() => {
    fetchPets(); // Fetch pets when the component mounts or filters change
  }, [fetchPets]); // Dependency array includes fetchPets

  const handleFindPetsClick = () => {
    fetchPets(); // Fetch pets when button is clicked
  };

  const handleChangeType = (type) => {
    setFilters((prevFilters) => ({ ...prevFilters, type })); // Update filter type
  };

  const handleAdoptPet = (petId) => {
    // Update pet's adopted status
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, isAdopted: true } : pet
      )
    );
  };

  return (
    <div>
      <Filters
        filters={filters} // Pass current filters state
        onFindPetsClick={handleFindPetsClick} // Pass click handler
        onChangeType={handleChangeType} // Pass filter type change handler
      />
      <div className="ui container">
        <div className="ui grid">
          {pets.map((pet) => (
            <Pet key={pet.id} pet={pet} onAdoptPet={handleAdoptPet} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;