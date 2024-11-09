// import React, { useState } from 'react';
// import { Appointment, Doctor } from '../types';

// // Define available time slots for each day
// const schedule = {
//   Monday: ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30"],
//   Wednesday: ["14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15"],
//   Friday: ["16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15"],
//   Saturday: ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00"]
// };

// type ScheduleDay = 'Monday' | 'Wednesday' | 'Friday' | 'Saturday';

// interface AppointmentFormProps {
//   onSubmit: (data: Appointment) => void;
//   doctors: Doctor[]; // Accept doctors as a prop
// }

// const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, doctors }) => {
//   // State variables for form inputs
//   const [patientName, setPatientName] = useState('');
//   const [nic, setNic] = useState('');
//   const [email, setEmail] = useState('');
//   const [telephone, setTelephone] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [availableTimes, setAvailableTimes] = useState<string[]>([]);
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedDoctorId, setSelectedDoctorId] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [registrationFee] = useState(500); // Fixed registration fee

//   // Handle date change and set available times
//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const date = e.target.value;
//     setSelectedDate(date);

//     const day = new Date(date).toLocaleString('en-US', { weekday: 'long' }) as ScheduleDay;
//     const times = schedule[day] || [];
    
//     setAvailableTimes(times);
//     setSelectedTime(''); // Reset the selected time
//   };

//   // Handle time change
//   const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedTime(e.target.value);
//   };

//   // Handle doctor change
//   const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDoctorId(e.target.value);
//     setAvailableTimes([]); // Clear available times on doctor change
//     setSelectedTime(''); // Reset selected time
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
    
//     if (!selectedTime || !selectedDoctorId) {
//       setErrorMessage('Please select a valid time and doctor.');
//     } else {
//       // Reset error message and proceed with the booking logic
//       setErrorMessage('');
//       alert(`Appointment booked for ${patientName} with ${doctors.find(doc => doc.doctorId === selectedDoctorId)?.doctorName} on ${selectedDate} at ${selectedTime}. Registration Fee: LKR ${registrationFee}`);
      
//       // Add booking logic here...
      
//       // Clear form after submission
//       setPatientName('');
//       setNic('');
//       setEmail('');
//       setTelephone('');
//       setSelectedDate('');
//       setAvailableTimes([]);
//       setSelectedTime('');
//       setSelectedDoctorId('');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
//       <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Doctor Selection */}
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="doctor">Select Doctor:</label>
//           <select
//             id="doctor"
//             value={selectedDoctorId}
//             onChange={handleDoctorChange}
//             required
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           >
//             <option value="">Select a doctor</option>
//             {doctors.map((doctor) => (
//               <option key={doctor.doctorId} value={doctor.doctorId}>
//                 {doctor.doctorName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Patient Information */}
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="patientName">Patient Name:</label>
//           <input
//             type="text"
//             id="patientName"
//             value={patientName}
//             onChange={(e) => setPatientName(e.target.value)}
//             required
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="nic">NIC:</label>
//           <input
//             type="text"
//             id="nic"
//             value={nic}
//             onChange={(e) => setNic(e.target.value)}
//             required
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="telephone">Telephone:</label>
//           <input
//             type="tel"
//             id="telephone"
//             value={telephone}
//             onChange={(e) => setTelephone(e.target.value)}
//             required
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>

//         {/* Appointment Date */}
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="date">Date:</label>
//           <input
//             type="date"
//             id="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             required
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>

//         {/* Appointment Time */}
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="time">Time:</label>
//           <select
//             id="time"
//             value={selectedTime}
//             onChange={handleTimeChange}
//             required
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//             disabled={availableTimes.length === 0}
//           >
//             <option value="">Select a time</option>
//             {availableTimes.map((time) => (
//               <option key={time} value={time}>
//                 {time}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {/* Registration Fee */}
//         <div className="mb-4">
//           <label className="block mb-1">Registration Fee:</label>
//           <input
//             type="text"
//             value={`LKR ${registrationFee}`}
//             readOnly
//             className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-200"
//           />
//         </div>

//         {/* Error Message */}
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}

//         {/* Submit Button */}
//         <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500">
//           Book Appointment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AppointmentForm;

import React, { useState } from 'react';
import { Appointment, Doctor } from '../types'; // Ensure your Appointment type is imported
import Modal from './Model';

// Define available time slots for each day
const schedule = {
  Monday: ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30"],
  Wednesday: ["14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15"],
  Friday: ["16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", "18:00", "18:15", "18:30", "18:45", "19:00", "19:15"],
  Saturday: ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00"]
};

type ScheduleDay = 'Monday' | 'Wednesday' | 'Friday' | 'Saturday';

interface AppointmentFormProps {
  onSubmit: (data: Appointment) => void;
  doctors: Doctor[]; // Accept doctors as a prop
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, doctors }) => {
  // State variables for form inputs
  const [patientName, setPatientName] = useState('');
  const [nic, setNic] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [treatmentTypes, setTreatmentTypes] = useState<string[]>([]); // For treatment types
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [registrationFee] = useState(500); // Fixed registration fee

  // Handle date change and set available times
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);

    const day = new Date(date).toLocaleString('en-US', { weekday: 'long' }) as ScheduleDay;
    const times = schedule[day] || [];
    
    setAvailableTimes(times);
    setSelectedTime(''); // Reset the selected time
  };

  // Handle time change
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedTime(e.target.value);
  };

  // Handle doctor change
  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctorId(e.target.value);
    setAvailableTimes([]); // Clear available times on doctor change
    setSelectedTime(''); // Reset selected time
  };

  // Handle treatment types change (assuming you have a checkbox or select for this)
  const handleTreatmentChange = (type: string) => {
    setTreatmentTypes((prev) =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };
  

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedTime || !selectedDoctorId) {
      setErrorMessage('Please select a valid time and doctor.');
    } else {
      // Reset error message and open modal to confirm booking
      setErrorMessage('');
      setModalOpen(true); // Open modal for confirmation
    }
  };

  // Confirm appointment
  const confirmAppointment = () => {
    // Close the modal
    setModalOpen(false);

    // Prepare appointment data
    const appointmentData: Appointment = {
      patientName,
      patientNIC: nic, // Match to interface
      patientEmail: email, // Match to interface
      patientPhone: telephone, // Match to interface
      treatmentTypes,
      appointmentDate: new Date(`${selectedDate}T${selectedTime}`),
      doctorId: selectedDoctorId,
      registrationFee,
    };

    // Call the onSubmit prop to send data to backend
    console.log(appointmentData.appointmentDate);
    onSubmit(appointmentData);

    // Clear form after submission
    setPatientName('');
    setNic('');
    setEmail('');
    setTelephone('');
    setTreatmentTypes([]);
    setSelectedDate('');
    setAvailableTimes([]);
    setSelectedTime('');
    setSelectedDoctorId('');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Doctor Selection */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="doctor">Select Doctor:</label>
          <select
            id="doctor"
            value={selectedDoctorId}
            onChange={handleDoctorChange}
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.doctorName}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Information */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1" htmlFor="nic">NIC:</label>
          <input
            type="text"
            id="nic"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1" htmlFor="telephone">Telephone:</label>
          <input
            type="tel"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>

        {/* Treatment Types - Example as checkboxes */}
          <div className="mb-4">
            <label className="block mb-1">Treatment Types:</label>
            {["Acne Treatment", "Skin Whitening", "Mole Removal", "Laser Treatment"].map((type) => (
              <label key={type} className="block">
                <input
                  type="checkbox"
                  value={type}
                  onChange={() => handleTreatmentChange(type)} // Correctly call the handler
                  checked={treatmentTypes.includes(type)}
                />
                {type}
              </label>
            ))}
          </div>


        {/* Appointment Date */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>

        {/* Appointment Time */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="time">Time:</label>
          <select
            id="time"
            value={selectedTime}
            onChange={handleTimeChange}
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
            disabled={availableTimes.length === 0}
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        
        {/* Error Message */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500">
          Book Appointment
        </button>
      </form>

      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        fee={registrationFee}
        onConfirm={confirmAppointment}
      />
    </div>
  );
};

export default AppointmentForm;
