const FormatDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default FormatDate;
