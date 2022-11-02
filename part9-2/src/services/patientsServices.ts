import patiendsData from "../../data/patients.json";
import { PatientsEntry } from "../types";

const patients: Array<PatientsEntry> = patiendsData as Array<PatientsEntry>;

const getEntries = (): Array<PatientsEntry> => {
  return patients;
};

export { getEntries };
