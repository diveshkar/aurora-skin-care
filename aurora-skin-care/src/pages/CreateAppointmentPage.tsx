import React, { useEffect, useState } from 'react';
import { createAppointment } from '../services/api';
import { Appointment, ApiResponse, Doctor } from '../types';
import AppointmentForm from '../components/AppointmentForm';
import { useNavigate } from 'react-router-dom';

const CreateAppointmentPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    // Fetch doctors here (mocked for simplicity)
    setDoctors([
      { doctorId: 'D1', doctorName: 'Dr. Samantha Perera', availableDays: [], availableTimeRange: '' },
      { doctorId: 'D2', doctorName: 'Dr. Amal Silva', availableDays: [], availableTimeRange: '' },
    ]);
  }, []);

  const handleSubmit = async (data: Appointment) => {
    try {
      const response: ApiResponse = await createAppointment(data);
      alert(response.message);
      nav(`/invoice/${response.appointmentId}`)
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className='mt-[50px]'>
      {error && <p className="text-red-500">{error}</p>}
      <AppointmentForm  onSubmit={handleSubmit} doctors={doctors} />
    </div>
  );
};

export default CreateAppointmentPage;
