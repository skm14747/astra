export interface BirthProfile {
  id: string;
  name: string;
  dateOfBirth: string;   // "YYYY-MM-DD"
  timeOfBirth: string;   // "HH:MM"
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  createdAt: number;
}
