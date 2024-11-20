import { generateIntervals } from './index.js';

describe('generateIntervals', () => {
  test('should throw error if time format is missing AM/PM', () => {
    const start = 'tue 2:55';
    const end = 'tue 3:00';
    expect(() => generateIntervals(start, end)).toThrowError(
      'Invalid time format: "tue 2:55". Expected format: \'day hh:mm am/pm\''
    );
  });

  test('should throw error if time is missing weekday', () => {
    const start = '2:55 pm';
    const end = '3:00 pm';
    expect(() => generateIntervals(start, end)).toThrowError(
      'Invalid time format: "2:55 pm". Expected format: \'day hh:mm am/pm\''
    );
  });

  test('should throw error if time format is missing minutes', () => {
    const start = 'mon 10 am';
    const end = 'mon 11 am';
    expect(() => generateIntervals(start, end)).toThrowError(
      'Invalid time format: "mon 10 am". Expected format: \'day hh:mm am/pm\''
    );
  });

  test('should throw error if input has extra spaces', () => {
    const start = 'mon  10:00 am';
    const end = 'mon 11:00 am';
    expect(() => generateIntervals(start, end)).toThrowError(
      'Invalid time format: "mon  10:00 am". Expected format: \'day hh:mm am/pm\''
    );
  });

  test('should throw error if hour exceeds 12', () => {
    const start = 'sun 13:00 pm';
    const end = 'sun 2:00 pm';
    expect(() => generateIntervals(start, end)).toThrowError(
      'Invalid time format: "sun 13:00 pm". Expected format: \'day hh:mm am/pm\''
    );
  });

  test('should throw error if minutes exceed 59', () => {
    const start = 'mon 10:65 am';
    const end = 'mon 11:00 am';
    expect(() => generateIntervals(start, end)).toThrowError(
      'Invalid time format: "mon 10:65 am". Expected format: \'day hh:mm am/pm\''
    );
  });  

  test('should generate intervals for the same hour within AM', () => {
    const start = 'mon 10:00 am';
    const end = 'mon 10:30 am';
    const expectedOutput = [
      '11000', '11005', '11010', '11015', '11020', '11025', '11030'
    ];

    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should generate intervals for the same hour within AM in wed', () => {
    const start = 'wed 10:00 am';
    const end = 'wed 10:30 am';
    const expectedOutput = [
      '31000', '31005', '31010', '31015', '31020', '31025', '31030'
    ];

    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should generate intervals spanning different hours in AM', () => {
    const start = 'mon 10:00 am';
    const end = 'mon 11:00 am';
    const expectedOutput = [
      '11000', '11005', '11010', '11015', '11020', '11025', '11030', 
      '11035', '11040', '11045', '11050', '11055', '11100'
    ];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should generate intervals correctly for PM times', () => {
    const start = 'mon 10:00 pm';
    const end = 'mon 11:00 pm';
    const expectedOutput = [
      '12200', '12205', '12210', '12215', '12220', '12225', '12230',
      '12235', '12240', '12245', '12250', '12255', '12300'
    ];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should handle intervals that end exactly at the end time', () => {
    const start = 'tue 02:55 pm';
    const end = 'tue 03:00 pm';
    const expectedOutput = ['21455', '21500'];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should handle time without leading zero', () => {
    const start = 'tue 2:55 pm';
    const end = 'tue 3:00 pm';
    const expectedOutput = ['21455', '21500'];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });
  
  test('should handle intervals across different AM and PM times', () => {
    const start = 'wed 11:55 am';
    const end = 'wed 12:15 pm';
    const expectedOutput = ['31155', '31200', '31205', '31210', '31215'];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should handle intervals crossing over midnight', () => {
    const start = 'fri 11:55 pm';
    const end = 'sat 12:10 am';
    const expectedOutput = ['52355', '60000', '60005', '60010'];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should handle single minute interval', () => {
    const start = 'thu 1:59 pm';
    const end = 'thu 2:00 pm';
    const expectedOutput = ['13200'];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should handle noon and midnight correctly', () => {
    const start = 'thu 12:00 pm';
    const end = 'thu 12:05 pm';
    const expectedOutput = ['41200', '41205'];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  
    const start2 = 'thu 12:00 am';
    const end2 = 'thu 12:05 am';
    const expectedOutput2 = ['40000', '40005'];
    expect(generateIntervals(start2, end2)).toEqual(expectedOutput2);
  });

  test('should generate intervals for Sunday (0 as the weekday number)', () => {
    const start = 'sun 10:00 am';
    const end = 'sun 10:30 am';
    const expectedOutput = [
      '01000', '01005', '01010', '01015', '01020', '01025', '01030'
    ];
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });

  test('should handle intervals crossing from Sunday to Monday', () => {
    const start = 'sun 11:55 pm';
    const end = 'mon 12:15 am';
    const expectedOutput = ['02355', '02400', '02405', '02410', '02415']; // '02' is for Monday
    expect(generateIntervals(start, end)).toEqual(expectedOutput);
  });
});
