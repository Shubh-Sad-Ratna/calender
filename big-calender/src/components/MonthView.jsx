import React from 'react';
import { BarChart2 } from 'lucide-react';
import { useStore, ACTIONS } from '../context/StoreContext';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateHelpers';
import { DUMMY_DATA } from '../data/dummyData';

const MonthView = () => {
  const { state, dispatch } = useStore();
  const { viewDate } = state;
  
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days = [];
  // Empty slots for previous month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50/50 border-b border-r border-gray-100"></div>);
  }
  
  // Real days
  for (let d = 1; d <= daysInMonth; d++) {
    const currentDate = new Date(year, month, d);
    const dateKey = `${String(d).padStart(2,'0')}-${String(month+1).padStart(2,'0')}-${year}`;
    const hasData = DUMMY_DATA.hasOwnProperty(dateKey);

    days.push(
      <div 
        key={d}
        onClick={() => dispatch({ type: ACTIONS.SELECT_DATE, payload: currentDate })}
        className={`h-24 md:h-32 border-b border-r border-gray-100 p-2 cursor-pointer hover:bg-gray-50 group ${hasData ? 'bg-indigo-50/30' : 'bg-white'}`}
      >
        <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${hasData ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}>
          {d}
        </span>
        {hasData && (
          <div className="mt-2 hidden md:block">
            <div className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded border border-indigo-200 flex items-center gap-1">
              <BarChart2 size={12} />
              <span>Data</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {weekDays.map(day => <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase">{day}</div>)}
      </div>
      <div className="grid grid-cols-7">{days}</div>
    </div>
  );
};

export default MonthView;