export interface DiagEntry {
  code: string;
  name: string;
  latin: string;
}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  NonBinary = "non-binary",
}

export type NewPatientsEntry = Omit<PatientsEntry, "id">;
