import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setImageUrl, setAnimalName, addFormData } from '../../app/formSlice'
import { predefinedImages } from '../../app/constants'
import { object, string } from 'zod'
import styles from './Form.module.css'

interface FormData {
    uniqueId: string;
    imageUrl: string;
    animalName: string;
}

const formDataSchema = object({
    imageUrl: string().min(7, 'Please select an image'),
    animalName: string().min(3, 'Please enter the name of the animal'),
});

const Form: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [animalNameForm, setAnimalNameForm] = useState<string>('');
    const dispatch = useDispatch();

    const generateUniqueId = (): string => {
        return Math.random().toString(36).substring(7);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData: FormData = {
            uniqueId: generateUniqueId(),
            imageUrl: selectedImage,
            animalName: animalNameForm,
        };

        try {
            formDataSchema.parse(formData);
            dispatch(setImageUrl(selectedImage));
            dispatch(setAnimalName(animalNameForm));
            dispatch(addFormData(formData));

            setSelectedImage('');
            setAnimalNameForm('');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.animalForm}>
            <h2 className={styles.headingForm}>Animal form</h2>
            <label className={styles.labelForm}>
                Choose the image:
            </label>
            <select
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
                className={styles.selectForm}
                required
            >
                <option value="" disabled>Choose the image</option>
                {predefinedImages.map((imageUrl, index) => (
                    <option value={imageUrl} key={index}>
                        {imageUrl.split('/').pop()}
                    </option>
                ))}
            </select>
            <label className={styles.labelForm}>
                Enter name of the animal:
            </label>
            <input 
                type="text"
                value={animalNameForm}
                onChange={(e) => setAnimalNameForm(e.target.value)}
                className={styles.inputForm}
                placeholder='Add name of the animal...'
                required
            />
            <button type='submit' className={styles.addButtonForm}>
                Add animal
            </button>
        </form>
    )
}

export default Form