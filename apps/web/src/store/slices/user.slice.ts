import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  id: string | null;
  name: string | null;
  email: string | null;
};

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
};

function setUserReducer(state: UserState, action: PayloadAction<UserState>) {
  state.id = action.payload.id;
  state.name = action.payload.name;
  state.email = action.payload.email;
}

const UserStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserReducer: setUserReducer,
  },
});
export const { setUserReducer: setUserAction } = UserStore.actions;

export default UserStore;
