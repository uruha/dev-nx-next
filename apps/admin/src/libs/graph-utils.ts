/** sample util */
export const createRandomValues = (max: number, length: number) => {
  const values: number[] = [];

  for(let i = 0; i < length; i++) {
    values.push(
      Math.floor(Math.random() * Math.floor(max))
    );
  }
  return values;
}