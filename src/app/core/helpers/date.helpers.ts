import { Timestamp } from 'firebase/firestore';

export const toDate = (value?: Timestamp | Date): Date | undefined => {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  return undefined;
};
