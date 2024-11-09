package com.au.auroraskincare.model;

import java.util.List;

public class E244429_Invoice {
    private String invoiceId;
    private String appointmentId;
    private String patientName;
    private List<String> treatmentTypes;
    private double registrationFee;
    private double totalFee;

    // Constructor
    public E244429_Invoice(String appointmentId, String patientName, List<String> treatmentTypes, double registrationFee, double totalFee) {
        this.appointmentId = appointmentId;
        this.patientName = patientName;
        this.treatmentTypes = treatmentTypes;
        this.registrationFee = registrationFee;
        this.totalFee = totalFee;
        this.invoiceId = generateInvoiceId(); // Auto-generate Invoice ID
    }

    // Auto-generate invoice ID
    private String generateInvoiceId() {
        return "INV-" + System.currentTimeMillis();
    }

    // Getters
    public String getInvoiceId() { return invoiceId; }
    public String getAppointmentId() { return appointmentId; }
    public String getPatientName() { return patientName; }
    public List<String> getTreatmentTypes() { return treatmentTypes; }
    public double getRegistrationFee() { return registrationFee; }
    public double getTotalFee() { return totalFee; }
}
