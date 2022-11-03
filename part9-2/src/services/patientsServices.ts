import patientsData from "../../data/patients.json";
import { PatientsEntry, NewPatientsEntry } from "../types";
import { v1 as uuid } from "uuid";

const patients: Array<PatientsEntry> = patientsData as Array<PatientsEntry>;

const getEntries = (): Array<PatientsEntry> => {
  return patients;
};

const getFilteredEntries = (id: string) => {
  return patients.filter((patient) => patient.id === id);
};

const newPatient = (entry: NewPatientsEntry): PatientsEntry => {
  const id = uuid();
  const newPatientEntry = { id, ...entry };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export { getEntries, newPatient, getFilteredEntries };
