import express from "express";
import toNewPatientsEntry from "../utils";
import { getEntries, newPatient } from "../services/patientsServices";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(getEntries());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientsEntry(req.body);
    const addedPatient = newPatient(newPatientEntry);

    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
