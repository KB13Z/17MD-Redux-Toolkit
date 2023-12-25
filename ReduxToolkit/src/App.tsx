import Form from './Components/Form/Form'
import AnimalCard from './Components/AnimalCard/AnimalCard'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFormData, selectFormData } from './app/formSlice'
import { predefinedImages } from './app/constants'
import './App.css'

interface AppFormData {
  uniqueId: string;
  imageUrl: string;
  animalName: string;
}

function App() {
  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const savedAnimals = JSON.parse(localStorage.getItem('animals') || '[]');
    if (savedAnimals.length > 0) {
      savedAnimals.forEach((animal: AppFormData) => {
        dispatch(addFormData(animal));
      });
    }
  }, [dispatch]);

  const sortedFormData = [...formData].sort((a, b) => {
    const nameA = a.animalName!.toLowerCase();
    const nameB = b.animalName!.toLowerCase();

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <>
      <h1>Animals</h1>
      <Form />
      <div className='sortingButtonsWrapper'>
        <button className='sortingButton' onClick={() => setSortOrder('asc')}>Sort A-Z</button>
        <button className='sortingButton' onClick={() => setSortOrder('desc')}>Sort Z-A</button>
      </div>
      <div className='animalCardsWrapper'>
        {sortedFormData.length > 0 ? (
          sortedFormData.map((data) => (
            <div key={data.uniqueId}>
              <AnimalCard
                imageUrl={data.imageUrl!}
                animalName={data.animalName!}
                uniqueId={data.uniqueId}
                predefinedImages={predefinedImages}
              />
            </div>
          ))
        ) : (
          <p className='noAnimalsText'>No animals are added</p>
        )}
      </div>
    </>
  );
}

export default App
