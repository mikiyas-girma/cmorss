import { formatDistanceToNow, parseISO } from 'date-fns';

const formatDate = (date: string) => {
  const parsedDate = parseISO(date);
  const formatted = formatDistanceToNow(parsedDate, { addSuffix: true });

  return formatted;
};

export default formatDate;
