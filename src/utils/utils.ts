import { Dayjs } from "dayjs";

/** Type guard to determine if an entry is an `Attendance` entry or `HelpSession` */
export function isAttendance(entry: Attendance | HelpSession): entry is Attendance {
  return (
    'activeTimeMs' in entry &&
    'helpEndUnixMs' in entry &&
    'helpStartUnixMs' in entry &&
    'helpedMembers' in entry &&
    'helper' in entry &&
    typeof entry.activeTimeMs === 'number' &&
    typeof entry.helpEndUnixMs === 'number' &&
    typeof entry.helpStartUnixMs === 'number' &&
    Array.isArray(entry.helpedMembers) &&
    entry.helpedMembers.every(
      member => typeof member.id === 'string' && typeof member.displayName === 'string'
    ) &&
    typeof entry.helper === 'object' &&
    typeof entry.helper.id === 'string' &&
    typeof entry.helper.displayName === 'string'
  );
}

/** Returns an object containing the number of minutes and seconds from milliseconds */
export function millisecondsToMinutesSeconds(milliseconds: number): {
  minutes: number;
  seconds: number;
} {
  /* Convert milliseconds to seconds */
  const totalSeconds: number = milliseconds / 1000;

  /* Calculate minutes and remaining seconds */
  const minutes: number = Math.floor(totalSeconds / 60);
  const seconds: number = Math.floor(totalSeconds % 60);

  return { minutes, seconds };
}

export function millisecondsToHourMinutes(milliseconds: number): {
  hours: number;
  minutes: number;
} {
  const totalSeconds: number = milliseconds / 1000;
  const totalMinutes: number = Math.floor(totalSeconds / 60);
  const hours: number = Math.floor(totalMinutes / 60);
  const minutes: number = totalMinutes % 60;

  return { hours, minutes };
}


export function minutesSecondsToMilliseconds(minutes: number, seconds: number): number {
  return ((minutes * 60) + seconds) * 1000;
}

/** Function to get the most recent Sunday */
export function getLastSunday() {
  const date = new Date();
  const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const daysSinceLastSunday = dayOfWeek === 0 ? 0 : dayOfWeek; // Days since the last Sunday
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - daysSinceLastSunday
  );
}

export function getLastSundayMilliseconds(): number {
  const date = new Date();
  const dayOfWeek = date.getDay(); 
  const diffToLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek;
  date.setDate(date.getDate() - diffToLastSunday);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function getTodaysDateInMilliseconds() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  return today.getTime(); 
}


export function dayAndTimeToUnixMs(input: Dayjs | null | undefined): number {
  if (!input) {
    return 0;
  }
  return input.unix() * 1000;
}

export function getTodaysDayOfWeek(): number {
  const today = new Date();
  const dayIndex: number = today.getDay();
  return dayIndex;
}
