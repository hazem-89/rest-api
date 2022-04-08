
const Joi = require('joi');
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());

const data = fs.readFileSync('data.json');
const courses = JSON.parse(data)
console.log(courses);

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/api/courses', (req, res) => {
  res.json(courses)
})

app.post('/api/courses', (req, res) => {
  const  { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  
  courses.push(course);
  res.send(course);

  const data = JSON.stringify(courses);
  fs.writeFile('data.json', data, 'utf8');
  res.status(201).send("course created successfully.")
});
app.put('/api/courses/:id',(req, res) => {
  const course =  courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Course not found')
  const  { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  
  //update courses
  course.name = req.body.name;
  res.send(course )

})

app.get('/api/courses/:id', (req, res) =>{
  const course =  courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Course not found')
  res.json(course)
})
app.listen(port, () => {console.log('app is running on port:' + port)}); 

const  validateCourse = (course) => {
  const schema = Joi.object ({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  })
 return Joi.validate(course, schema);
}

app.delete('/api/courses/:id',  (req, res) => {
  const course =  courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('Course not found');

 const index =  courses.indexOf(course);
 courses.splice(index, 1);

 res.send(course);

});