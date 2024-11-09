export interface ApiResponse {
    status: string;
    message: string;
    appointmentId?: string;
    totalFee?: number;
  }
  
  export interface Appointment {
    appointmentId?: string;
    patientName: string;
    patientNIC: string;
    patientEmail: string;
    patientPhone: string;
    treatmentTypes: string[];
    appointmentDate: Date;
    doctorId: string;
    registrationFee: number;
    totalFee?: number;
  }
  
  export interface Doctor {
    doctorId: string;
    doctorName: string;
    availableDays: string[];
    availableTimeRange: string;
  }
  
  export interface InvoiceModel {
    appointmentId: string;
    patientName: string;
    treatmentTypes: string[];
    registrationFee: number;
    totalFee: number;
  }
  
  // Other type definitions...
  
  