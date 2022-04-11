
const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));


const data = fs.readFileSync('data.json');
const courses = JSON.parse(data);
console.log(courses);

const  validateCourse = (course) => {
  const schema = Joi.object ({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
        
        description: Joi.string()
        .min(10)
        .max(250)
        .required(),
        
        price: Joi.number()
        .required(),
      })
      return Joi.validate(course, schema);
    }

app.get('/api/courses', (req, res) => {
  res.json(courses)
});
app.get('/api/courses/:id', (req, res) =>{
  const course =  courses.find(c => c.id === parseInt(req.params.id));
  if (!course){ 
    res.status(404).send('Course not found')
  }
  res.json(course)
});

app.post('/api/courses', (req, res) => {
  const  { error } = validateCourse(req.body);
  if (error)  {
    res.status(400).send(error.details[0].message)
  }
   else { 
    const course = {
    id: courses.length + 1,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  }
  courses.push(course);
  const data = JSON.stringify(courses);
  fs.writeFile('data.json', data, err => {
    if (err) {
      console.log('error', err);
      res.status(400).send(err)
    } else {
      console.log('success');
      res.status(201).send(course);
    }
  })
};
});



app.put('/api/courses/:id',(req, res) => {
  const  { error } = validateCourse(req.body);
  if (error)  {
    res.status(400).send(error.details[0].message);
  } else {
  const course =  courses.find(c => c.id === parseInt(req.params.id));
  if (!course) { 
    res.status(404).send('Course not found')
  } else {
  //update courses
  course.name = req.body.name;
  course.description = req.body.description;
  course.price = req.body.price;
  const data = JSON.stringify(courses);
  fs.writeFile('data.json', data, err => {
    if (err) {
      console.log('error', err);
      res.send(err)
    } else {
      console.log('success');
      res.status(201).send(course)
    }
  })
}
};
})



    
app.delete('/api/courses/:id',  (req, res) => {
  const course =  courses.find(c => c.id === parseInt(req.params.id));
  if (!course)  {
    res.status(404).send('Course not found')
  } else {
  
  const index =  courses.indexOf(course);
  courses.splice(index, 1);
  
  const data = JSON.stringify(courses);
 fs.writeFile('data.json', data, err => {
   if (err) {
    console.log('error', err);
    res.status(400).send(err)
   } else {
     console.log('success');
     res.status(201).send(course)
   }
 });
 };
}
);

app.listen(port, () => {console.log('app is running on port:' + port)}); 


// module.exports = app;
