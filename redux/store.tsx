// store.ts
import { createStore, combineReducers } from 'redux';
import userReducer from './reducer';

export interface RootState {
  user: {
    userId: string | null;
    name: string;
    username: string;
    email: string;
    password: string;
    // Add other user-related properties if needed
  };
}

const rootReducer = combineReducers({
  user: userReducer,
  // Add reducers as needed
});

const store = createStore(rootReducer);

export default store;
