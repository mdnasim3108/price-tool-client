

const date = new Date();

function getTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes; 
    return `${hours}:${minutes}:${date.getSeconds()} ${ampm}`;
  }


const formattedDate = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()} ${getTime(date)}`;




export default formattedDate;