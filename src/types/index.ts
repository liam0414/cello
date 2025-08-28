// Availability Slot (created by admin)
export interface AvailabilitySlot {
  id: number;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format  
  duration: number; // minutes per lesson
  breakBetween: number; // minutes between lessons
  lessonTypes: LessonType[];
  status: 'active' | 'inactive' | 'full';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

// Student Booking
export interface Booking {
  id: number;
  availabilitySlotId: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  studentName: string;
  studentEmail: string;
  phone?: string;
  lessonType: LessonType;
  message?: string;
  status: BookingStatus;
  bookedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

// Generated Time Slots (from availability)
export interface TimeSlot {
  time: string; // HH:MM
  available: boolean;
  booked?: boolean;
  bookingId?: number;
  studentName?: string;
}

// Lesson Types
export type LessonType = 
  | 'trial'
  | 'private' 
  | 'private-extended'
  | 'group-beginner'
  | 'group-intermediate' 
  | 'adult-beginner'
  | 'assessment'
  | 'masterclass';

// Booking Status
export type BookingStatus = 
  | 'pending'
  | 'confirmed' 
  | 'completed'
  | 'cancelled'
  | 'no-show';

// Admin Session
export interface AdminSession {
  isAuthenticated: boolean;
  loginTime?: string;
  expiresAt?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Data Types
export interface CreateAvailabilityForm {
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  breakBetween: number;
  lessonTypes: LessonType[];
  notes?: string;
}

export interface BookingForm {
  studentName: string;
  studentEmail: string;
  phone?: string;
  lessonType: LessonType;
  message?: string;
}

// Calendar Display Types
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasAvailability: boolean;
  hasBookings: boolean;
  availableSlots: number;
  bookedSlots: number;
}

// Email Templates
export interface BookingEmailData {
  booking: Booking;
  availabilitySlot: AvailabilitySlot;
  isStudentEmail: boolean; // true for student, false for admin
}