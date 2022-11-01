interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
