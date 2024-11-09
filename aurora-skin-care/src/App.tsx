import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateAppointmentPage from './pages/CreateAppointmentPage';
import UpdateAppointmentPage from './pages/UpdateAppointmentPage';
import ViewAppointmentsPage from './pages/ViewAppointmentsPage';
import HomePage from './pages/Home';
import SearchAppointmentsPage from './pages/SearchAppointmentsPage';
import GenerateInvoicePage from './pages/GenerateInvoicePage';

const App: React.FC = () => (
  <Router>
    <div>
    <nav className="bg-blue-600 w-full">
        <div className=" px-4 py-4 flex justify-end">
          <Link to="/create-appointment" className="text-white hover:text-gray-300 transition duration-300 ml-4">Create Appointment</Link>
          <Link to="/view-appointments" className="text-white hover:text-gray-300 transition duration-300 ml-4">View Appointments</Link>
          <Link to="/search-appointments" className="text-white hover:text-gray-300 transition duration-300 ml-4">Search Appointments</Link>
        </div>
      </nav>
    </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-appointment" element={<CreateAppointmentPage />} />
      <Route path="/update-appointment/:id" element={<UpdateAppointmentPage />} />
      <Route path="/invoice/:id" element={<GenerateInvoicePage />} />
      <Route path="/view-appointments" element={<ViewAppointmentsPage />} />
      <Route path="/search-appointments" element={<SearchAppointmentsPage />} />
    </Routes>
  </Router>
);

export default App;
