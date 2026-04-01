function compareDateTimeWithNow(dateTimeString) {
  // console.log(dateTimeString);
  const [targetDate, targetTime] = dateTimeString.split("T");
  console.log(targetDate);

  // Get the current date and time in IST (UTC+5:30)
  const now = new Date();
  const offsetIST = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const nowIST = new Date(now.getTime() + offsetIST).getTime();

  const dateTime = new Date(dateTimeString).getTime();
  return nowIST <= dateTime;
}
export { compareDateTimeWithNow };
