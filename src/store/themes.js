import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'themes',
  initialState: {
    activeTheme: '',
    error: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    themeChange: (themes, action) => {
      themes.activeTheme = action.payload;
    },
  },
});

export default slice.reducer;


// Action Creators

const { themeChange } = slice.actions;

export const changeActiveTheme = theme => {
  return themeChange(theme)
}
