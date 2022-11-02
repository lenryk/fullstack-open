import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!Array.isArray(daily_exercises) || !target)
    return res.status(400).json({ error: "Parameters missing" });
  if (
    daily_exercises.some((day) => Number.isNaN(Number(day))) ||
    !Number.isInteger(target)
  )
    return res.status(400).json({ error: "Malformatted parameters" });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
