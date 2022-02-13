const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

let room = [
  {
    room_id: 1,
    number_of_seat: 20,
    aminities: ["fan", "tv", "single bed"],
    price_for_hour: "30",
    booked_status: "not booked",
    customer_name: "ajay",
    date: "2022-01-02",
    Start_time: "12am",
    End_time: "4pm",
  },
];

app.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    data: room,
  });
});

app.get("/room", (req, res) => {
  let rooms_arr = room.map((i) => {
    return {
      room_id: i.room_id,
      booked_status: i.booked_status,
      customer_name: i.customer_name,
      date: i.date,
      Start_time: i.Start_time,
      End_time: i.End_time,
    };
  });

  res.json({
    statusCode: 200,
    data: rooms_arr,
  });
});

app.get("/customer", (req, res) => {
  let customer_arr = room.map((i) => {
    return {
      customer_name: i.customer_name,
      room_id: i.room_id,
      date: i.date,
      Start_time: i.Start_time,
      End_time: i.End_time,
    };
  });

  res.json({
    statusCode: 200,
    data: customer_arr,
  });
});

app.post("/room", (req, res) => {
  room.push(req.body);
  res.send({
    statusCode: 200,
    message: "Data saved succesfully",
  });
});

app.post("/customer", (req, res) => {
  let i = req.body;
  console.log(room);
  room.forEach((item) => {
    if (item.room_id == i.room_id) {
      item.booked_status = "Booked";
      item.customer_name = i.customer_name;
      item.date = i.date;
      item.Start_time = i.Start_time;
      item.End_time = i.End_time;
    }
  });

  console.log(room);
  res.send({
    statusCode: 200,
    message: "Data saved succesfully",
  });
});

app.listen(PORT, () => console.log("server up on" + PORT));
