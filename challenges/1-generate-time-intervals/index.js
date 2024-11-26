const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const validateInput = (input) => {
  const regex = new RegExp(
    `^(${weekdays.join('|')}) (\\d{1,2}):(\\d{2}) (am|pm)$`,
    'i'
  );
  const match = input.match(regex);

  if (!match) {
    throw new Error(`Invalid time format: "${input}". Expected format: 'day hh:mm am/pm'`);
  }

  const [, , hours, minutes] = match;

  if (parseInt(hours, 10) < 1 || parseInt(hours, 10) > 12) {
    throw new Error(`Invalid hour: "${hours}". Hours must be between 1 and 12.`);
  }

  if (parseInt(minutes, 10) < 0 || parseInt(minutes, 10) > 59) {
    throw new Error(`Invalid minute: "${minutes}". Minutes must be between 00 and 59.`);
  }
};

const convertTo24HourFormat = (hour, ampm) => {
  hour = parseInt(hour, 10);
  if (ampm.toLowerCase() === 'pm' && hour !== 12) {
    return hour + 12;
  }
  if (ampm.toLowerCase() === 'am' && hour === 12) {
    return 0;
  }
  return hour;
};

const alignToNext5Minutes = (tokenStart) => {
  const minutes = parseInt(tokenStart.slice(-2), 10);
  const remainder = minutes % 5;

  if (remainder !== 0) {
    const adjustment = 5 - remainder;
    return parseInt(tokenStart, 10) + adjustment;
  }

  return parseInt(tokenStart, 10);
};

const validateAndParseInput = (input) => {
  validateInput(input);

  const [weekdayString, timePart, ampm] = input.split(' ');
  const [hour, minute] = timePart.split(':');
  const weekdayNum = weekdays.findIndex((weekday) => weekday === weekdayString.toLowerCase());
  const hour24 = convertTo24HourFormat(hour, ampm);
  return {
    weekdayNum,
    time: `${String(hour24).padStart(2, '0')}${minute}`,
  };
};

export const generateIntervals = (start, end) => {
  const startParsed = validateAndParseInput(start);
  const endParsed = validateAndParseInput(end);

  const tokenStart = `${startParsed.weekdayNum}${startParsed.time}`;
  const tokenEnd = `${endParsed.weekdayNum}${endParsed.time}`;

  const result = [];
  let alignedStart = alignToNext5Minutes(tokenStart);
  for (let i = alignedStart; i <= parseInt(tokenEnd, 10); i += 5) {
    const last2Digits = parseInt(String(i).slice(-2));

    let between = parseInt(String(i).substring(1, 3));
    if (String(i).length === 4) between = parseInt(String(i).substring(0, 2));
    if (between < 24 && last2Digits < 60) {
      let stringedI = i.toString();
      const finalResult = stringedI.length === 4 ? `0${i}` : `${i}`
      result.push(finalResult);
    }
  }

  return result;
}
