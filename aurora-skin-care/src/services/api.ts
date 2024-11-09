import axios from 'axios';
import { Appointment, ApiResponse, InvoiceModel } from '../types';

const API_BASE = 'http://localhost:8080/appointments'; // Adjust if different

export const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await axios.get<Appointment[]>(`${API_BASE}`);
  return response.data;
};

export const createAppointment = async (data: Appointment): Promise<ApiResponse> => {
    console.log(data.appointmentDate);
  const response = await axios.post<ApiResponse>(`${API_BASE}`, data);
  return response.data;
};

export const updateAppointment = async (id: string, data: Appointment): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(`${API_BASE}/update/${id}`, data);
  return response.data;
};

export const getAppointmentById = async (id: string): Promise<Appointment> => {
  const response = await axios.get<Appointment>(`${API_BASE}/${id}`);
  return response.data;
};

export const searchAppointments = async (term: string): Promise<Appointment[]> => {
  const response = await axios.get<Appointment[]>(`${API_BASE}/search`, { params: { term } });
  return response.data;
};

export const getAppointmentsByDate = async (date: string): Promise<Appointment[]> => {
  const response = await axios.get<Appointment[]>(`${API_BASE}/date/${date}`);
  return response.data;
};

export const generateInvoice = async (id: string): Promise<InvoiceModel> => {
  const response = await axios.get<InvoiceModel>(`${API_BASE}/${id}/invoice`);
  return response.data;
};

export const getInvoiceByAppointmentId = async (appointmentId: string): Promise<InvoiceModel> => {
    console.log(appointmentId);
    const response = await axios.get<InvoiceModel>(`${API_BASE}/${appointmentId}/invoice`);
    console.log(response);
    return response.data;
  };
