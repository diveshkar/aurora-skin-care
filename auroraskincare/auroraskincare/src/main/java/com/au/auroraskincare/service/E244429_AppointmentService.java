package com.au.auroraskincare.service;

import com.au.auroraskincare.model.Doctor;
import com.au.auroraskincare.model.E244429_Appointment;
import com.au.auroraskincare.model.E244429_Invoice;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class E244429_AppointmentService {

    private Map<String, E244429_Appointment> appointments = new HashMap<>();
    private List<Doctor> doctors = Arrays.asList(
            new Doctor("D1", "Dr. Samantha Perera",
                    Arrays.asList("MONDAY", "WEDNESDAY", "FRIDAY", "SATURDAY"),
                    Arrays.asList("10:00-13:00", "14:00-17:00", "16:00-20:00", "09:00-13:00")), // Specific time slots
            new Doctor("D2", "Dr. Amal Silva",
                    Arrays.asList("MONDAY", "WEDNESDAY", "FRIDAY", "SATURDAY"),
                    Arrays.asList("10:00-13:00", "14:00-17:00", "16:00-20:00", "09:00-13:00")) // Specific time slots
    );

    // Add a new appointment and ensure the doctor is available
    public String addAppointment(E244429_Appointment appointment) {
        Doctor selectedDoctor = findDoctorById(appointment.getDoctorId());

        if (selectedDoctor == null) {
            throw new IllegalArgumentException("Doctor not found.");
        }

        if (!isDoctorAvailable(selectedDoctor, appointment.getAppointmentDate())) {
            throw new IllegalArgumentException("Selected doctor is not available at the requested time.");
        }

        if (!isSlotAvailable(selectedDoctor, appointment.getAppointmentDate())) {
            throw new IllegalArgumentException("No available slots at the requested time.");
        }

        String appointmentId = generateAppointmentId();
        appointment.setAppointmentId(appointmentId);
        appointment.setRegistrationFee(500);
        appointment.setTotalFee(calculateTotalFee(appointment)); // Calculate fee
        appointments.put(appointmentId, appointment);
        return appointmentId;
    }

    // Doctor availability method modified to check time slots
    private boolean isDoctorAvailable(Doctor doctor, LocalDateTime appointmentDate) {
        String dayOfWeek = appointmentDate.getDayOfWeek().toString();
        LocalTime time = appointmentDate.toLocalTime();
        if (!doctor.getAvailableDays().contains(dayOfWeek)) {
            return false;
        }
        List<String> timeSlots = doctor.getAvailableTimeSlots();
        for (String slot : timeSlots) {
            String[] timeRange = slot.split("-");
            LocalTime startTime = LocalTime.parse(timeRange[0]);
            LocalTime endTime = LocalTime.parse(timeRange[1]);
            if (!time.isBefore(startTime) && !time.isAfter(endTime)) {
                return true;
            }
        }
        return false;
    }

    // Calculate total fee (treatments + registration + tax)
    private double calculateTotalFee(E244429_Appointment appointment) {
        double totalFee = appointment.getRegistrationFee();
        double treatmentTotal = 0;

        // Treatment fees
        Map<String, Double> treatmentPrices = new HashMap<>();
        treatmentPrices.put("Acne Treatment", 2750.0);
        treatmentPrices.put("Skin Whitening", 7650.0);
        treatmentPrices.put("Mole Removal", 3850.0);
        treatmentPrices.put("Laser Treatment", 12500.0);

        for (String treatment : appointment.getTreatmentTypes()) {
            treatmentTotal += treatmentPrices.getOrDefault(treatment, 0.0);
        }

        totalFee += treatmentTotal;
        totalFee += totalFee * 0.025; // Add 2.5% tax
        return Math.round(totalFee * 100.0) / 100.0; // Round to two decimal places
    }

    public List<E244429_Appointment> getAllAppointments() {
        return new ArrayList<>(appointments.values());
    }

    // Generate invoice
    public E244429_Invoice generateInvoice(String appointmentId) {
        E244429_Appointment appointment = appointments.get(appointmentId);
        if (appointment == null) {
            throw new IllegalArgumentException("Appointment not found.");
        }

        return new E244429_Invoice(
                appointment.getAppointmentId(),
                appointment.getPatientName(),
                appointment.getTreatmentTypes(),
                appointment.getRegistrationFee(),
                appointment.getTotalFee()
        );
    }

    // Slot availability (15-minute sessions)
    private boolean isSlotAvailable(Doctor doctor, LocalDateTime appointmentDate) {
        LocalTime time = appointmentDate.toLocalTime();
        for (E244429_Appointment existingAppointment : appointments.values()) {
            if (existingAppointment.getDoctorId().equals(doctor.getDoctorId()) &&
                    existingAppointment.getAppointmentDate().toLocalTime().equals(time)) {
                return false; // Slot taken
            }
        }
        return true;
    }

    // Find doctor by ID
    private Doctor findDoctorById(String doctorId) {
        return doctors.stream()
                .filter(doctor -> doctor.getDoctorId().equals(doctorId))
                .findFirst()
                .orElse(null);
    }

    // Generate appointment ID
    private String generateAppointmentId() {
        return "APT-" + System.currentTimeMillis();
    }

    // Other services like updating, searching, filtering, etc., go here
    public List<E244429_Appointment> getAppointmentsByDate(String date) {
        List<E244429_Appointment> result = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate searchDate = LocalDate.parse(date, formatter);

        for (E244429_Appointment appointment : appointments.values()) {
            if (appointment.getAppointmentDate().toLocalDate().equals(searchDate)) {
                result.add(appointment);
            }
        }
        return result;
    }

    public double updateAppointment(String id, E244429_Appointment updatedAppointment) {
        if (!isDoctorAvailable(findDoctorById(updatedAppointment.getDoctorId()), updatedAppointment.getAppointmentDate())) {
            throw new IllegalArgumentException("Selected doctor is not available at the requested time.");
        }

        if (!isSlotAvailable(findDoctorById(updatedAppointment.getDoctorId()), updatedAppointment.getAppointmentDate())) {
            throw new IllegalArgumentException("No available slots at the requested time.");
        }

        if (appointments.containsKey(id)) {
            E244429_Appointment existingAppointment = appointments.get(id);
            existingAppointment.setPatientNIC(updatedAppointment.getPatientNIC());
            existingAppointment.setPatientName(updatedAppointment.getPatientName());
            existingAppointment.setPatientEmail(updatedAppointment.getPatientEmail());
            existingAppointment.setPatientPhone(updatedAppointment.getPatientPhone());
            existingAppointment.setTreatmentTypes(updatedAppointment.getTreatmentTypes());
            existingAppointment.setAppointmentDate(updatedAppointment.getAppointmentDate());

            double updatedTotalFee = calculateTotalFee(existingAppointment);
            existingAppointment.setTotalFee(updatedTotalFee);

            appointments.put(id, existingAppointment);
            return updatedTotalFee;
        } else {
            throw new IllegalArgumentException("Appointment with ID " + id + " not found.");
        }
    }

    public List<E244429_Appointment> searchAppointments(String term) {
        List<E244429_Appointment> result = new ArrayList<>();
        for (E244429_Appointment appointment : appointments.values()) {
            if (appointment.getPatientName().toLowerCase().contains(term.toLowerCase()) ||
                    appointment.getAppointmentId().toLowerCase().contains(term.toLowerCase())) {
                result.add(appointment);
            }
        }
        return result;
    }

    public E244429_Appointment getAppointmentById(String id) {
        if (appointments.containsKey(id)) {
            return appointments.get(id); // Return the appointment if found
        } else {
            throw new IllegalArgumentException("Appointment with ID " + id + " not found."); // Handle not found
        }
    }
}
