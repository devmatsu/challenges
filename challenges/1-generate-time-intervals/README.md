# Generate Time Intervals (From techinical interview)
<!-- Note: D***D*** | 20241112 -->

### Description
Given two strings representing times in the format `'day hh:mm am/pm'`, write a function that generates a list of time tokens at intervals of 5 minutes between the given start time and end time (inclusive). The output should be a list of strings representing the time in `'dddHHmm'` format, where 'ddd' is the day of the week as a number (mon = 1, tue = 2, etc.), and 'HHmm' is the time in 24-hour format.

### Function Signature
```
function generateIntervals(start, end)
```

### Input
- `start`: A string in the format `'day hh:mm am/pm'` representing the start time.
- `end`: A string in the format `'day hh:mm am/pm'` representing the end time.

### Output
- A list of strings representing time intervals of 5 minutes each in `'dddHHmm'` format (where 'ddd' is the day of the week as a number and 'HHmm' is the time in 24-hour format).

### Constraints
- The day of the week will always be valid (e.g., `'mon'`, `'tue'`, etc.).
- The input times will always be valid and properly formatted.
- The end time will always be later than or equal to the start time on the same day.
- The time interval between `start` and `end` will not exceed 24 hours.

### Days Mapping
| Day        | Value |
|------------|-------|
| Monday     | 1     |
| Tuesday    | 2     |
| Wednesday  | 3     |
| Thursday   | 4     |
| Friday     | 5     |
| Saturday   | 6     |
| Sunday     | 7     |


### Example
```
Input:
start = 'mon 10:00 am'
end = 'mon 11:00 am'

Output:
['11000', '11005', '11010', '11015', '11020', '11025', '11030', '11035', '11040', '11045', '11050', '11055', '11100']
```

### Explanation
The output list contains all the time tokens from 10:00 AM to 11:00 AM on Monday in intervals of 5 minutes.
'1' represents Monday.
'1000' is 10:00 AM in 24-hour format.
Each interval increases by 5 minutes, up to '11100' which represents 11:00 AM.
