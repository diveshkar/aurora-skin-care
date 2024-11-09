import React, { useState } from 'react';
import { getAppointmentsByDate, searchAppointments } from '../services/api';
import { Appointment } from '../types';
import AppointmentList from '../components/AppointmentList';

const SearchAppointmentsPage: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if(term === ""){
      alert("Please enter a search term");
      setAppointments([]);
      return; 
    }
    setLoading(true);
    const results = await searchAppointments(term);
    setAppointments(results);
    setLoading(false);
  };
  const handleSearchByDate = async () => {
    if(date === ""){
      alert("Please enter a search date");
      setAppointmentsByDate([]);
      return; 
    }
    setLoading(true);
    const results = await getAppointmentsByDate(date);
    setAppointmentsByDate(results);
    setLoading(false);
  };

  return (
    <div>
      <div>
      <h1>Search Appointments</h1>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Enter patient name or ID"
        className="input-field"
      />
      <button onClick={handleSearch} className="btn-primary">Search</button>
      {loading && <p>Searching...</p>}
      <AppointmentList appointments={appointments} />
    </div>
    <div>
      <h1>Search Appointments By date</h1>
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Enter patient name or ID"
        className="input-field"
      />
      <button onClick={handleSearchByDate} className="btn-primary">Search BY Date</button>
      {loading && <p>Searching...</p>}
      <AppointmentList appointments={appointmentsByDate} />
    </div>
    </div>
  );
};

export default SearchAppointmentsPage;
