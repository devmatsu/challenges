const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const generateIntervals = (start, end) => {
  const startSplit = start.split(' ');
  const [weekdayString, ...fulltime] = startSplit;
  let [ time, ampm ] = fulltime;
  const weekdayNum = weekdays.findIndex(weekday => weekday === weekdayString) + 1;
  time = time.replace(':', '');

  const endSplit = end.split(' ');
  const [weekdayString2, ...fulltime2] = endSplit;
  let [ time2, ampm2 ] = fulltime2;
  const weekdayNum2 = weekdays.findIndex(weekday => weekday === weekdayString2) + 1;
  time2 = time2.replace(':', '');

  let tokenStart = `${weekdayNum}${time}`;
  let tokenEnd = `${weekdayNum2}${time2}`;

  if (ampm === 'pm') {
    const solveAmPm = parseInt(tokenStart.substring(0, 3)) + 12;
    const restAmPm = tokenStart.substring(3);

    tokenStart = `${solveAmPm}${restAmPm}`;
  }

  if (ampm2 === 'pm') {
    const solveAmPm2 = parseInt(tokenEnd.substring(0, 3)) + 12;
    const restAmPm2 = tokenEnd.substring(3);

    tokenEnd = `${solveAmPm2}${restAmPm2}`;
  }

  const result = [];
  for (let i = parseInt(tokenStart); i < parseInt(tokenEnd); i += 5) {
    const last2Digits = String(i).substring(3);
    if (last2Digits <= 60) result.push(i);
  }

  return result;
}

const input1 = 'mon 10:00 pm';
const input2 = 'mon 11:00 pm';
const result = generateIntervals(input1, input2);
console.log(result);