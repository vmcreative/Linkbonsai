const initialState = {
  // Define your initial user state here
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Define your user-related actions and reducers here
    default:
      return state;
  }
};

export default userReducer;
