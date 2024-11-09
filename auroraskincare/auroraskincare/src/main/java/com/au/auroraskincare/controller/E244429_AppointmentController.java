package com.au.auroraskincare.controller;

import com.au.auroraskincare.model.E244429_Appointment;
import com.au.auroraskincare.model.E244429_Invoice;
import com.au.auroraskincare.service.E244429_AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/appointments")
public class E244429_AppointmentController {

    @Autowired
    private E244429_AppointmentService appointmentService;

    // 1. Make an appointment
    @PostMapping
    public ResponseEntity<ApiResponse> createAppointment(@RequestBody E244429_Appointment appointment) {
        try {
            String appointmentId = appointmentService.addAppointment(appointment);
            return ResponseEntity.ok(new ApiResponse("success", "Appointment created successfully!", appointmentId, appointment.getTotalFee()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse("error", e.getMessage(), null, 0));
        }
    }

    // 2. Update appointment details
    @PostMapping("/update/{id}")
    public ResponseEntity<ApiResponse> updateAppointment(@PathVariable String id, @RequestBody E244429_Appointment updatedAppointment) {
        try {
            double updatedTotalFee = appointmentService.updateAppointment(id, updatedAppointment);
            return ResponseEntity.ok(new ApiResponse("success", "Appointment updated successfully!", id, updatedTotalFee));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse("error", e.getMessage(), null, 0));
        }
    }

    // 3. View appointment details filtered by date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<E244429_Appointment>> getAppointmentsByDate(@PathVariable String date) {
        List<E244429_Appointment> appointments = appointmentService.getAppointmentsByDate(date);
        return ResponseEntity.ok(appointments);
    }

    // 4. Search for an appointment using patient name or appointment ID
    @GetMapping("/search")
    public ResponseEntity<List<E244429_Appointment>> searchAppointments(@RequestParam String term) {
        List<E244429_Appointment> appointments = appointmentService.searchAppointments(term);
        return ResponseEntity.ok(appointments);
    }

    // 5. View all appointments
    @GetMapping
    public ResponseEntity<List<E244429_Appointment>> getAllAppointments() {
        List<E244429_Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    // 6. Generate an invoice for an appointment
    @GetMapping("/{id}/invoice")
    public ResponseEntity<E244429_Invoice> generateInvoice(@PathVariable String id) {
        try {
            E244429_Invoice invoice = appointmentService.generateInvoice(id);
            return ResponseEntity.ok(invoice);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<E244429_Appointment> getAppointmentById(@PathVariable String id) {
        E244429_Appointment appointment = appointmentService.getAppointmentById(id);
        return appointment != null ? ResponseEntity.ok(appointment) : ResponseEntity.notFound().build();
    }

    // Custom response class for API responses
    public static class ApiResponse {
        private String status;
        private String message;
        private String appointmentId;
        private double totalFee;

        public ApiResponse(String status, String message, String appointmentId, double totalFee) {
            this.status = status;
            this.message = message;
            this.appointmentId = appointmentId;
            this.totalFee = totalFee;
        }

        // Getters and setters
        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getAppointmentId() {
            return appointmentId;
        }

        public void setAppointmentId(String appointmentId) {
            this.appointmentId = appointmentId;
        }

        public double getTotalFee() {
            return totalFee;
        }

        public void setTotalFee(double totalFee) {
            this.totalFee = totalFee;
        }
    }
}
