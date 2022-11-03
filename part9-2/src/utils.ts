import { Gender, NewPatientsEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name) || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseDob = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isString(dob)) {
    throw new Error("Incorrect or missing DOB: " + dob);
  }
  return dob;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN: " + ssn);
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation) || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

type Fields = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};
const toNewPatientsEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatientsEntry => {
  const newEntry: NewPatientsEntry = {
    name: parseName(name),
    dateOfBirth: parseDob(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newEntry;
};

export default toNewPatientsEntry;
