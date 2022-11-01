interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const target = Number(process.argv[2]);
const input: Array<number> = [];
process.argv.forEach((arg, index) => {
  index > 2 ? input.push(Number(arg)) : null;
});

const calculateExercises = (days: Array<number>, target: number): Result => {
  return {
    periodLength: days.length,
    trainingDays: days.filter((day) => day > 0).length,
    success:
      days.filter((day) => day >= target).length >=
      days.filter((day) => day > 0).length,
    rating: days.filter((day) => day >= target).length,
    ratingDescription:
      days.filter((day) => day > 0).length >= 4
        ? "Good stuff my guy"
        : "Cmon bro try harder!",
    target: target,
    average:
      days.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      ) / days.length,
  };
};

console.log(calculateExercises(input, target));
