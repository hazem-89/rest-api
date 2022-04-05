const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const courses = [
  {id:1, name: 'course 1'},
  {id:2, name: 'course 2'},
  {id:3, name: 'course 3'},
]

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/api/courses', (req, res) => {
  res.json(courses)
})

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  
  courses.push(course);
  res.send(course);
  res.status(201).send("course created successfully.")
});

app.get('/api/courses/:id', (req, res) =>{
  const course =  courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('Course not found')
  res.json(course)
})
app.listen(port, () => {console.log('app is running on port:' + port)}); 

