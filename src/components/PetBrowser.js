import React, { useState, useEffect } from 'react';
import Pet from './Pet'; // Ensure Pet is imported correctly

function PetBrowser({ pets = [], onAdoptPet }) {
  const [petList, setPetList] = useState(pets);

  useEffect(() => {
    setPetList(pets);
  }, [pets]);

  return (
    <div>
      {petList.map(pet => (
        <Pet key={pet.id} pet={pet} onAdoptPet={onAdoptPet} />
      ))}
    </div>
  );
}

export default PetBrowser;