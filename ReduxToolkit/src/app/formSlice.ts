import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface FormData {
    uniqueId: string;
    imageUrl: string | null,
    animalName: string | null
}

export interface FormState {
    imageUrl: string | null,
    animalName: string | null,
    formData: FormData[]
}

const initialState: FormState = {
    imageUrl: '',
    animalName: '',
    formData: [],
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setImageUrl: (state, action: PayloadAction<string>) => {
            state.imageUrl = action.payload;
        },
        setAnimalName: (state, action: PayloadAction<string>) => {
            state.animalName = action.payload;
        },
        addFormData: (state, action: PayloadAction<FormData>) => {
            state.formData.push(action.payload);
        },
        editFormData: (state, action: PayloadAction<FormData>) => {
            const index = state.formData.findIndex((data) => data.uniqueId === action.payload.uniqueId);
            if (index !== -1) {
                state.formData[index] = action.payload;
            }
        },
        deleteFormData: (state, action: PayloadAction<string>) => {
            state.formData = state.formData.filter((data) => data.uniqueId !== action.payload);
        },
        REPLACE_STATE: (_state, action: PayloadAction<FormState>) => {
            return action.payload;
        },
    },
})

export const { setImageUrl, setAnimalName, addFormData, editFormData, deleteFormData } = formSlice.actions;

export const selectImageUrl = (state: RootState) => state.form.imageUrl;

export const selectAnimalName = (state: RootState) => state.form.animalName;

export const selectFormData = (state: RootState) => state.form.formData;

export default formSlice.reducer;

