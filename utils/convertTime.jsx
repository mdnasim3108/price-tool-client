function convertTime(originalTime) {
    const dateTime = new Date(originalTime);

    const year = dateTime.getUTCFullYear();
    const month = dateTime.getUTCMonth() + 1;
    const day = dateTime.getUTCDate();

    const hours = dateTime.getUTCHours();
    const minutes = dateTime.getUTCMinutes();
    const seconds = dateTime.getUTCSeconds();

    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${hours >= 12 ? 'PM' : 'AM'}`;

    return formattedDateTime;
}
export default convertTime


