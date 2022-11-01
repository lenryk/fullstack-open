import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (Number.isNaN(Number(weight)) || Number.isNaN(Number(height)))
    return res.status(400).json({ error: "Malformatted parameters" });

  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ height: Number(height), weight: Number(weight), bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
