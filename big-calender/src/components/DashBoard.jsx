import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import CalenderHeader from './CalenderHeader';
import MonthView from './MonthView';
import DataModal from './DataModal';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
               <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Calendar</h1>
          </div>
          <p className="text-gray-500 text-sm ml-1">Select highlighted dates to view detailed performance reports.</p>
        </header>

        <CalenderHeader />
        <MonthView />
      </div>
      <DataModal />
    </div>
  );
};

export default Dashboard;
