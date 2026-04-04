export const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  return (hours * 60) + minutes;
}

export const convertWIBtoUTC = (time) => {
  let [hours, minutes] = time.split(':').map(Number)

  hours = hours - 7;

  if (hours < 0) {
    hours = 24 + hours;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};