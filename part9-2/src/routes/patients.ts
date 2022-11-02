import express from "express";

const router = express.Router();

import { getEntries, newPatient } from "../services/patientsServices";

router.get("/", (_req, res) => {
  res.json(getEntries());
});

router.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = newPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(newPatientEntry);
});

export default router;
