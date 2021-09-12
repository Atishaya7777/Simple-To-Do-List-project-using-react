const obj = [
  {
    id: 1,
    text: "Doctor's Appointment",
    date: "Feb 5th at 2:30pm",
    reminder: true,
  },
  {
    id: 2,
    text: "Meeting at School",
    date: "Feb 6th at 1:30pm",
    reminder: true,
  },
  {
    id: 3,
    text: "Food Shopping",
    date: "Feb 5th at 2:30pm",
    reminder: false,
  },
];

const myJSON = JSON.stringify(obj);

console.log(myJSON);
