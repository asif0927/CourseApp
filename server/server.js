const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT=5454;
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const courseSchema=new mongoose.Schema({ 
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
}) 
const CourseModel=new mongoose.model("Course",courseSchema);

app.get("/api", (req, res) => {
    res.send("welcome to out API!");
});

//GET ALL Courses - MONGO DB
app.get("/api/courses", async (req, res) => {
    const { name } = req.query;
    const courses = await CourseModel.find();
    if (!name) {
      res.status(200).send(courses);
    } else {
      const searchedCourses = courses.filter((x) =>
        x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
      );
      res.status(200).send(searchedCourses);
    }
});
//GET Course BY ID - MONGO DB
app.get("/api/courses/:id", async(req, res) => {
    const { id } = req.params;
    const course = await CourseModel.findById(id)
    res.status(200).send(course);
});
//DELETE Course - MONGO DB
app.delete("/api/courses/:id",async(req, res) => {
    const id = req.params.id;
    //delete
    const deleteCourse = await CourseModel.findByIdAndDelete(id);
    res.status(203).send({
      message: `${deleteCourse.name} deleted successfully!`,
    });
});
//POST Course -Mongo DB
app.post("/api/courses", async (req, res) => {
    try {
        const newCourse = new CourseModel(req.body);
        const saveCourse = await newCourse.save();
        res.status(201).send(saveCourse);
    } catch (error) {
        console.log(error);
    }
});
//EDIT Course - MONGO DB
app.put("/api/courses/:id", async(req, res) => {
    const id = req.params.id;
    const { name,price,description} = req.body;
    const updatingCourse = {name:name,price:price,description:description};
    await CourseModel.findByIdAndUpdate(id,updatingCourse);
    res.status(200).send(`${updatingCourse.name} updated successfully!`);
});


app.listen(PORT,()=>{
    console.log(`App listening on PORT:${PORT}`);
})
mongoose.connect("mongodb+srv://asif_admin:Admin123@app.nxn9k4m.mongodb.net/?retryWrites=true&w=majority&appName=App").then(()=>{
    console.log('Mongo DB connected!');
}).catch((err)=>{
    console.log(err);
})