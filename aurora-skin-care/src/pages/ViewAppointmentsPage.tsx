import React, { useEffect, useState } from 'react';
import { fetchAppointments } from '../services/api';
import { Appointment } from '../types';
import AppointmentList from '../components/AppointmentList';
import SearchAppointmentsPage from './SearchAppointmentsPage';

const ViewAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAppointments = async () => {
      const data = await fetchAppointments();
      setAppointments(data);
      setLoading(false);
    };

    getAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  return (
    <div>
      <h1>All Appointments</h1>
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default ViewAppointmentsPage;
