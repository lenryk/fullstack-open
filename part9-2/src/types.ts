export interface DiagEntry {
  code: string;
  name: string;
  latin: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  NonBinary = "non-binary",
}

export type NewPatientsEntry = Omit<PatientsEntry, "id">;
export type PublicPatient = Omit<PatientsEntry, "ssn" | "entries">;
