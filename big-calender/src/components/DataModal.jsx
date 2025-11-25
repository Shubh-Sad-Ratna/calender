import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { useStore, ACTIONS } from '../context/StoreContext';
import { formatDateDisplay } from '../utils/dateHelpers';

const DataModal = () => {
  const { state, dispatch } = useStore();
  const { isModalOpen, selectedDate, graphData, hasData } = state;

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className={`p-5 flex justify-between items-center ${hasData ? 'bg-indigo-600' : 'bg-red-500'}`}>
          <div className="flex items-center space-x-2 text-white">
            <CalendarIcon size={20} className="opacity-80" />
            <h2 className="text-lg font-bold">{formatDateDisplay(selectedDate)}</h2>
          </div>
          <button onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })} className="text-white/80 hover:text-white rounded-full p-1.5">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {hasData ? (
            <div className="h-64 w-full bg-gray-50 rounded-lg p-4 border border-gray-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-red-50 p-4 rounded-full mb-4 ring-4 ring-red-50">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">No Data Available</h3>
              <p className="text-gray-500">No records found for this date.</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
          <button onClick={() => dispatch({ type: ACTIONS.CLOSE_MODAL })} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataModal;
