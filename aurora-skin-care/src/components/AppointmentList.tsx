import React from 'react';
import { Appointment } from '../types';
import AppointmentDetails from './AppointmentDetails';
import { useNavigate } from 'react-router-dom';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  const nav = useNavigate();
  function handleUpdateAppointment(appointmentId: string): void {
    nav(`/update-appointment/${appointmentId}`)
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.appointmentId} className="p-4 border rounded-lg">
          <AppointmentDetails appointment={appointment} />
          <button onClick={() => handleUpdateAppointment(appointment.appointmentId ? appointment.appointmentId: "")}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
