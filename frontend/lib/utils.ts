import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeSince = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}
export function extractErrorValues(response: any) {
  const values = [];
  for (const key in response) {
    if (Array.isArray(response[key])) {
      values.push(response[key][0].replace("This field", `The ${key} field`));
    }
  }
  if (values.length == 0) {
    return null
  }
  return values;
}