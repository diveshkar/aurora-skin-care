package com.au.auroraskincare.model;

import java.util.List;

public class Doctor {
    private String doctorId;
    private String doctorName;
    private List<String> availableDays; // Days doctor is available, e.g., "Monday"
    private List<String> availableTimeSlots; // List of time ranges, e.g., ["10:00-13:00", "14:00-17:00"]

    public Doctor(String doctorId, String doctorName, List<String> availableDays, List<String> availableTimeSlots) {
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.availableDays = availableDays;
        this.availableTimeSlots = availableTimeSlots;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public List<String> getAvailableDays() {
        return availableDays;
    }

    public List<String> getAvailableTimeSlots() {
        return availableTimeSlots;
    }
}
