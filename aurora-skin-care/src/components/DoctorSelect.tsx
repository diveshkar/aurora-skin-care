import React from 'react';
import { Doctor } from '../types';

interface DoctorSelectProps {
  doctors: Doctor[];
  onSelect: (doctorId: string) => void;
}

const DoctorSelect: React.FC<DoctorSelectProps> = ({ doctors, onSelect }) => (
  <select onChange={(e) => onSelect(e.target.value)} className="input-field" required>
    <option value="">Select Doctor</option>
    {doctors.map((doctor) => (
      <option key={doctor.doctorId} value={doctor.doctorId}>
        {doctor.doctorName}
      </option>
    ))}
  </select>
);

export default DoctorSelect;
