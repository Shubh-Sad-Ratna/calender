import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore, ACTIONS } from '../context/StoreContext';

const CalendarHeader = () => {
  const { state, dispatch } = useStore();
  const { viewDate } = state;

  const changeMonth = (offset) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    dispatch({ type: ACTIONS.SET_VIEW_DATE, payload: newDate });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800 w-48 text-center">
          {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
          <ChevronRight size={20} />
        </button>
      </div>
      <button 
        onClick={() => dispatch({ type: ACTIONS.SET_VIEW_DATE, payload: new Date(2025, 10, 1) })}
        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg"
      >
        Reset to Demo
      </button>
    </div>
  );
};

export default CalendarHeader;