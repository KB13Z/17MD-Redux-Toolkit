import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteFormData, editFormData } from '../../app/formSlice'
import { predefinedImages } from '../../app/constants'
import styles from './AnimalCard.module.css'

interface AnimalCardProps {
    uniqueId: string,
    imageUrl: string,
    animalName: string
    predefinedImages: string[];
}

const AnimalCard: React.FC<AnimalCardProps> = ({ uniqueId, imageUrl, animalName }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(animalName);
    const [editedImage, setEditedImage] = useState(imageUrl);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };
    
    const handleSave = () => {
        setIsEditing(false);
        dispatch(editFormData({ uniqueId, imageUrl: editedImage, animalName: editedName }));
    };
    
    const handleCancel = () => {
        setIsEditing(false);
        setEditedImage(imageUrl);
        setEditedName(animalName);
    };

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDeletion = () => {
        dispatch(deleteFormData(uniqueId));
        setShowConfirmation(false);
    }


    return (
        <div className={styles.animalCard}>
            <img src={isEditing ? editedImage : imageUrl} alt="Animal" className={styles.imageCard} />
            {isEditing ? (
                <div className={styles.editForm}>
                    <label className={styles.cardLabel}>Change the image:</label>
                    <select
                        className={styles.animalSelection}
                        value={editedImage}
                        onChange={(e) => setEditedImage(e.target.value)}
                    >
                        {predefinedImages.map((imageUrl, index) => (
                            <option value={imageUrl} key={index}>
                                {imageUrl.split('/').pop()}
                            </option>
                        ))}
                    </select>
                    <label className={styles.cardLabel}>Change the name:</label>
                    <input
                        className={styles.animalNameChanging}
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <div className={styles.buttonsWrapper}>
                        <button className={styles.cardButton} onClick={handleSave}>Save</button>
                        <button className={styles.cardButton} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className={styles.cardBottomPart}>
                    <p className={styles.animalName}>{animalName}</p>
                    {!showConfirmation && (
                        <div className={styles.buttonsWrapper}>
                            <button className={styles.cardButton} onClick={handleEdit}>Edit</button>
                            <button className={styles.cardButton} onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                    {showConfirmation && (
                        <div>
                            <p className={styles.confirmationQuestion}>Are you sure you want to delete {animalName}?</p>
                            <div className={styles.buttonsWrapper}>
                                <button 
                                    className={styles.cardButton} 
                                    onClick={confirmDeletion} 
                                    type="button"
                                >
                                    Confirm
                                </button>
                                <button 
                                    className={styles.cardButton} 
                                    onClick={() => setShowConfirmation(false)} 
                                    type="button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AnimalCard;