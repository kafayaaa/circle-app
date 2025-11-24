export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${time}`;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US");

  return `${formattedDate}`;
};
