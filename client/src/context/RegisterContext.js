import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const RegisterContext = createContext(INITIAL_STATE);

const RegisterReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const RegisterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RegisterReducer, INITIAL_STATE);

  return (
    <RegisterContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
