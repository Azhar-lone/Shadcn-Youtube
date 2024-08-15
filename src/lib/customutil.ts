export const useRoundNum = (numCount: string) => {
  const count = Number(numCount);
  if (count < 1000) {
    return `${count}`;
  } else if (count < 1000000) {
    return `${Math.floor(count / 1000)}K`;
  } else if (count < 1000000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else {
    return `${(count / 1000000000).toFixed(1)}B`;
  }
};

export const useDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) {
    return "---";
  }

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;

  const formattedHours = hours > 0 ? `${hours}:` : "";
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${formattedHours}${minutes}:${formattedSeconds}`;
};

export const useTextDecode = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

export const useUploadDate = (publishedAt: string) => {
  const currentDate = new Date();
  const publishedDate = new Date(publishedAt);

  const timeDifference = currentDate.getTime() - publishedDate.getTime();
  const secondsDifference = timeDifference / 1000;
  const minutesDifference = secondsDifference / 60;
  const hoursDifference = minutesDifference / 60;
  const daysDifference = hoursDifference / 24;
  const monthsDifference = daysDifference / 30;
  const yearsDifference = monthsDifference / 12;

  if (yearsDifference >= 1) {
    return `${Math.floor(yearsDifference)} year${
      Math.floor(yearsDifference) > 1 ? "s" : ""
    } ago`;
  } else if (monthsDifference >= 1) {
    return `${Math.floor(monthsDifference)} month${
      Math.floor(monthsDifference) > 1 ? "s" : ""
    } ago`;
  } else if (daysDifference >= 1) {
    return `${Math.floor(daysDifference)} day${
      Math.floor(daysDifference) > 1 ? "s" : ""
    } ago`;
  } else if (hoursDifference >= 1) {
    return `${Math.floor(hoursDifference)} hour${
      Math.floor(hoursDifference) > 1 ? "s" : ""
    } ago`;
  } else if (minutesDifference >= 1) {
    return `${Math.floor(minutesDifference)} minute${
      Math.floor(minutesDifference) > 1 ? "s" : ""
    } ago`;
  } else {
    return `${Math.floor(secondsDifference)} second${
      Math.floor(secondsDifference) > 1 ? "s" : ""
    } ago`;
  }
};
