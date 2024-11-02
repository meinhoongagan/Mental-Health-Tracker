import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
}

export const loginSlice = createSlice({
  name: 'UserId',
  initialState,
  reducers: {
    changeId: (state,action) => {
      state.userId = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeId } = loginSlice.actions

export default loginSlice.reducer