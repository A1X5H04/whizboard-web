export function formatTimestamp(timestamp: number) {
  const now = Date.now();
  const diff = now - timestamp; // difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes === 1) {
    return "A minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours === 1) {
    return "An hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks === 1) {
    return "A week ago";
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months === 1) {
    return "A month ago";
  } else if (months < 12) {
    return `${months} months ago`;
  } else if (years === 1) {
    return "A year ago";
  } else {
    return `${years} years ago`;
  }
}
