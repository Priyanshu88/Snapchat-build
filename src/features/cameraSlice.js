import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        cameraImage:null, 
    }

    const cameraSlice = createSlice({
    name: 'camera',
    initialState,
    reducers: {

        setCameraImage: (state, action) => {
            state.cameraImage = action.payload;
        },

        resetCameraImage: (state,action) => {
            state.cameraImage = null; // resets it back to null
        },
    },
    });

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;


export default cameraSlice.reducer;
