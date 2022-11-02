import diagData from "../../data/diagnoses.json";
import { DiagEntry } from "../types";

const diag: Array<DiagEntry> = diagData as Array<DiagEntry>;

const getEntries = (): Array<DiagEntry> => {
  return diag;
};

export { getEntries };
