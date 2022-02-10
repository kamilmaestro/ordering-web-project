export const getDateTime = (toFormat) => {
  if (toFormat) {
    let date = new Date(toFormat);
    date.setSeconds(0, 0);

    return date.toISOString().replace(/T/, " ").replace(/:00.000Z/, "");
  } else {
    return '';
  }
};

export const getDate = (toFormat) => {
  const date = new Date(toFormat).toISOString();
  return date.substring(0, date.indexOf('T'));
};
