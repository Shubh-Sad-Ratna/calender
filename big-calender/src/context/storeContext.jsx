import React, { createContext, useReducer, useContext } from 'react';
import { DUMMY_DATA } from '../data/dummyData';

export const ACTIONS = {
  SET_VIEW_DATE: 'SET_VIEW_DATE',
  SELECT_DATE: 'SELECT_DATE',
  CLOSE_MODAL: 'CLOSE_MODAL',
  CHANGE_VIEW: 'CHANGE_VIEW'
};

const initialState = {
  viewDate: new Date(2025, 10, 1),
  selectedDate: null,
  isModalOpen: false,
  graphData: [],
  hasData: false,
  view: 'month',
};

const calendarReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_VIEW_DATE:
      return { ...state, viewDate: action.payload };
    case ACTIONS.SELECT_DATE: {
      const date = action.payload;
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const dateKey = `${day}-${month}-${year}`;
      
      const rawData = DUMMY_DATA[dateKey];
      
      return {
        ...state,
        selectedDate: date,
        isModalOpen: true,
        graphData: rawData || [],
        hasData: !!rawData,
      };
    }
    case ACTIONS.CLOSE_MODAL:
      return { ...state, isModalOpen: false, selectedDate: null };
    default:
      return state;
  }
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);