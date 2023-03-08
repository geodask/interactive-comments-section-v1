import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatToRelativeTime = (isoDate: string) => {
  const now = dayjs();

  if (now.diff(isoDate, 'week') > 4) {
    return dayjs(isoDate).format('D MMM YYYY - HH:mm');
  } else {
    return dayjs(isoDate).fromNow();
  }
};
