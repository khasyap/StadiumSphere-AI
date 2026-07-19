export interface ApiSuccess<T> {
  data: T;
  message: string;
  success: true;
}

export interface OrganizationRecord {
  id: string;
  name: string;
}

export interface StadiumRecord {
  capacity: number | { value: number };
  id: string;
  name: string;
  status: 'AVAILABLE' | 'CLOSED' | 'MAINTENANCE';
}

export interface VenueRecord {
  id: string;
  location: {
    address?: {
      addressLine1?: string;
      city?: string;
      country?: string;
      postalCode?: string;
    };
    coordinates?: { latitude: number; longitude: number };
    latitude?: number;
    longitude?: number;
  };
  name: string;
  reservationTimeSlot?: { endsAt: string; startsAt: string };
  status: 'AVAILABLE' | 'CLOSED' | 'MAINTENANCE' | 'RESERVED';
}

export interface SportRecord {
  id: string;
  name: string;
}

export interface TeamRecord {
  id: string;
  name: string;
  sport: SportRecord;
}

export interface EventRecord {
  id: string;
  name: string;
  status: 'CANCELLED' | 'FINISHED' | 'LIVE' | 'SCHEDULED';
  timeSlot: { endsAt: string; startsAt: string };
}

export interface BookingRecord {
  eventId: string;
  id: string;
  reference: string;
  status: 'CANCELLED' | 'CHECKED_IN' | 'COMPLETED' | 'CONFIRMED' | 'PENDING';
}

export type OperationsRecord = BookingRecord | EventRecord | OrganizationRecord | SportRecord | StadiumRecord | TeamRecord | VenueRecord;
