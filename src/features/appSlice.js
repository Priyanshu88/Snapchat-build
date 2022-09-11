import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  selectedImage: null,
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    login: (state, action) => { //taps into the user and logs it in
      state.user = action.payload;
    },
    logout: (state) => { //taps into user and sets it to null
      state.user = null;
    },
    selectImage: (state, action) => { //pushes the image into the state(selectedImage )
      state.selectedImage = action.payload;

    },
    resetImage: (state) => { //sets the selected image to null
      state.selectedImage = null;
    }
  },
});

export const { login, logout, selectImage, resetImage } = appSlice.actions;

export const selectUser = (state) => state.app.user;

export const selectSelectedImage = (state) => state.app.selectedImage;

export default appSlice.reducer;
