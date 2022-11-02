import express from "express";

const router = express.Router();

import { getEntries } from "../services/patientsServices";

router.get("/", (_req, res) => {
  res.json(getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
