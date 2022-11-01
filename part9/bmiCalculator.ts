const calculateBmi = (height: number, weight: number): string => {
  const result = weight / ((height / 100) ^ 2);
  if (result <= 18.5) return "Underweight";
  if (result > 18.5 && result <= 24.9) return "Normal weight";
  if (result >= 25 && result <= 29.9) return "Overweight";
  else return "Obese";
};

// console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

export { calculateBmi };
