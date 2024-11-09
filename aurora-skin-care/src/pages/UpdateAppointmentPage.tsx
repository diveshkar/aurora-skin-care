import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentById, updateAppointment } from '../services/api';
import { Appointment, ApiResponse, Doctor } from '../types';
import AppointmentForm from '../components/AppointmentForm';

const UpdateAppointmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      const data = await getAppointmentById(id!);
      setAppointment(data);
    };

    fetchAppointment();

    // Fetch doctors here (mocked for simplicity)
    setDoctors([
      { doctorId: 'D1', doctorName: 'Dr. Samantha Perera', availableDays: [], availableTimeRange: '' },
      { doctorId: 'D2', doctorName: 'Dr. Amal Silva', availableDays: [], availableTimeRange: '' },
    ]);
  }, [id]);

  const handleSubmit = async (data: Appointment) => {
    try {
      const response: ApiResponse = await updateAppointment(id!, data);
      alert(response.message);
      navigate('/view-appointments');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <h1>Update Appointment</h1>
      {error && <p className="text-red-500">{error}</p>}
      {appointment && (
        <AppointmentForm  onSubmit={handleSubmit} doctors={doctors} />
      )}
    </div>
  );
};

export default UpdateAppointmentPage;
