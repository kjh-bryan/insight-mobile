const initialState = {
  userId: null,
  username: '',
  email: '',
  password: '',
  access_token: '',
};

const userReducer = (
  state = initialState,
  action: {
    type: any;
    payload: {
      userId: any;
      name: any;
      username: any;
      email: any;
      password: any;
      access_token: any;
    };
  }
) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userId: action.payload.userId,
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        access_token: action.payload.access_token,
      };
    case 'LOGOUT':
      return initialState;
    // Add other cases as needed

    default:
      return state;
  }
};

export default userReducer;
