const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3003;

//middleware
app.use(express.json());

//home page
app.get("/", (req, res) => {
  res.send("Welcome to express");
});

mongoose.connect("mongodb://localhost:27017/student_info");
const xyz = mongoose.model("student", {
  name: String,
  age: { type: Number, required: true },
});
// const hello = new xyz({name: 'Mahesh', age: 34});
//     hello.save()
//     .then(()=> console.log("Student added"))          // Promise based syntax

//about us page
app.get("/about", (req, res) => {
  res.send("About us page is automatic");
});

//get students
app.get("/students", (req, res) => {
  xyz
    .find()
    .then((data) => res.send(data))
    .catch((err) => console.error(err));
});

//fin one student
app.get("/students/:id", (req, res) => {
  console.log("The id is: ", req.params.id);
  xyz.findById(req.params.id).then((data) => res.send(data));
});

//dynamic routing
app.get("/hello/:id", (req, res) => {
  res.send(`The user id is: ${req.params.id}`);
});

//create student
app.post("/students", async (req, res) => {
  try {
    console.log("The data is: ", req.body);
    const ss = new xyz(req.body);
    const data = await ss.save();
    res.send(data);
  } catch (err) {
    res.send("Error ", err.message);
  }
});

//contact us page
app.get("/contact", (req, res) => {
  res.send("Contact us here");
});

// app.listen(3003, function(){
//     console.log("Learning express")
// })

//update
app.put("/students/:id", (req, res) => {
  xyz
    .findByIdAndUpdate(req.params.id, req.body, { new: true }) //this return the new data when data is send as respons
    .then((data) => res.send(data));
});

//delete
app.delete("/students/:id", (req, res) => {
  //using dynamic routing to delete
  xyz
    .findByIdAndDelete(req.params.id)
    .then(() => res.send("Deleted successfully"));
});

app.listen(PORT, () => {
  console.log("Listening on port 3003");
});
