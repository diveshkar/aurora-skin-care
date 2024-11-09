import React from 'react';
import { Appointment } from '../types';

interface AppointmentDetailsProps {
  appointment: Appointment;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ appointment }) => {
    const formattedAppointmentDate = 
    typeof appointment.appointmentDate === 'string' 
      ? appointment.appointmentDate 
      : appointment.appointmentDate.toLocaleString();
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Appointment Details</h2>
      <p><strong>Patient Name:</strong> {appointment.patientName}</p>
      <p><strong>NIC:</strong> {appointment.patientNIC}</p>
      <p><strong>Email:</strong> {appointment.patientEmail}</p>
      <p><strong>Phone:</strong> {appointment.patientPhone}</p>
      <p><strong>Treatments:</strong> {appointment.treatmentTypes.join(', ')}</p>
      <p><strong>Appointment Date:</strong> {formattedAppointmentDate}</p>
      <p><strong>Doctor ID:</strong> {appointment.doctorId}</p>
      <p><strong>Registration Fee:</strong> ${appointment.registrationFee}</p>
      <p><strong>Total Fee:</strong> ${appointment.totalFee}</p>
    </div>
  );
};

export default AppointmentDetails;
