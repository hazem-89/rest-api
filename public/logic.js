
// fetching the data from the API 
async function getData() {
  try {
      let response = await fetch("http://localhost:3000/api/courses/")
      return await response.json().then( (listOfCourses) => {
        displayListOfCourses(listOfCourses)
        addCourse(listOfCourses)
        findCourse(listOfCourses)
      })
  } catch (err) {
      console.log(err)
  }
}
const initSite = () => {
  getData();
  // This would also be a good place to initialize other parts of the UI
}
const main = document.querySelector('main');
const result = document.querySelector('.result')
const displayListOfCourses =  (listOfCourses) => {

  document.getElementById("allData").addEventListener("click", async (event) => {
    if (listOfCourses.length === 0) {
      result.innerText = 'there is no data to display'
      result.classList.add('error')
    } else {
      main.innerHTML = '';
      result.innerText = `All Courses: ${listOfCourses.length} Course/s`

      // looping through all data 
    for (let i = 0; i < listOfCourses.length; i++) {
      const course = listOfCourses[i];
      const container = document.createElement("div");
      container.className = "container"
      const courseTitle = document.createElement("h4");
      courseTitle.innerText = ` course name:  ${course.name}`;
      const courseDescription = document.createElement("p");
      courseDescription.innerText = `description: ${course.description}`;
      const coursePrice = document.createElement("p");
      coursePrice.innerText = `Price: ${course.price}`;

      const btnContainer = document.createElement("div");
      btnContainer.className = "btn-container"
      // delete course button
      const deleteBtn = document.createElement("button")
      deleteBtn.innerText ='Delete'
      deleteBtn.addEventListener("click", () => {
        fetch('http://localhost:3000/api/courses/' + course.id, {
            method: 'DELETE',
        }).then(res => res.json()).then((res) =>{
          console.log(res);
          main.removeChild(container);
        })
      })

      // edit course container
      const editContainer = document.createElement("div");
      editContainer.className = 'edit-container'
      const openEditContainerBtn = document.createElement("button")
      openEditContainerBtn.innerText ='Edit'
      openEditContainerBtn.addEventListener("click",() =>{
        editContainer.classList.add('active')
      })
      
      // edit course inputs
      const nameInput = document.createElement("input")
      nameInput.placeholder = 'Course Name'
      nameInput.value = course.name;
      const descriptionInput = document.createElement("input")
      descriptionInput.placeholder = 'Course description'
      descriptionInput.value = course.description;
      const priceInput = document.createElement("input")
      priceInput.placeholder = 'Course price'
      priceInput.value = course.price;
      
      // edit course button
      const EditCourseBtn = document.createElement("button")
      EditCourseBtn.innerText ='Done'
      EditCourseBtn.addEventListener("click", () => {
        fetch('http://localhost:3000/api/courses/' + course.id, {
          method: 'PUT',
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           },
            body: JSON.stringify({
              name: nameInput.value,
              description: descriptionInput.value,
              price:  priceInput.value,
            })
        }).then(res => res.json()).then((res) =>{
          console.log(res);
          courseTitle.innerText = nameInput.value;
          courseDescription.innerText = descriptionInput.value;
          coursePrice.innerText = priceInput.value;
          result.innerText = "Course has been successfully edited"
        })
        editContainer.classList.remove('active')
      })
      main.appendChild(container);
      container.appendChild(editContainer);
      container.appendChild(courseTitle);
      container.appendChild(courseDescription);
      container.appendChild(coursePrice);
      container.appendChild(btnContainer);
      btnContainer.appendChild(openEditContainerBtn);
      editContainer.appendChild(nameInput);
      editContainer.appendChild(descriptionInput);
      editContainer.appendChild(priceInput);
      editContainer.appendChild(priceInput);
      editContainer.appendChild(EditCourseBtn);
      btnContainer.appendChild(deleteBtn);
      console.log(listOfCourses.length);
      }
      }
    })
  }


  // add course function
  const addCourse = () => {
    const addContainer = document.getElementById('add-container');
    document.getElementById("Add-New").addEventListener("click",  () => {
    addContainer.classList.add('active')
    console.log('add-C');
  })
  const addNameInput = document.getElementById("name")
  const addDescriptionInput = document.getElementById("description")
  const addPriceInput = document.getElementById("price")
  document.getElementById("add").addEventListener("click",  () => {
    console.log("nameInp");
    fetch('http://localhost:3000/api/courses/', {
      method: 'POST',
      headers : { 
        'Content-type': 'application/json',
        'Accept': 'application/json'
       },
        body: JSON.stringify({
          name: addNameInput.value,
          description: addDescriptionInput.value,
          price:  addPriceInput.value,
        })
    }).then(res => res.json())
    .then((res) => {
      console.log(res)
      result.innerText ="success"
      main.innerHTML = '';
      const container = document.createElement("div");
      container.className = "container"
      const courseTitle = document.createElement("h4");
      courseTitle.innerText = `course name: ${res.name}`;
      const courseDescription = document.createElement("p");
      courseDescription.innerText = `description: ${res.description}`;
      const coursePrice = document.createElement("p");
      coursePrice.innerText = res.price;
      main.appendChild(container);
      container.appendChild(courseTitle);
      container.appendChild(courseDescription);
      container.appendChild(coursePrice);
      addContainer.classList.remove('active')
    });
  })

  }
  //  find specific course
  const findCourse = (listOfCourses) => {
    const findContainer = document.querySelector(".find-course-container");
    const searchInput = document.createElement("input");
    searchInput.placeholder = "find courses by name, description, or price"
    const searchBtn = document.createElement("button")
    searchBtn.innerText = 'Find'
    searchBtn.addEventListener("click", () => {
      main.innerHTML = '';
      listOfCourses.find((course, index) => {
        if (!searchInput.value) {
          result.innerText = 'error: pleas inter Search key word'
          result.classList.add('error')
        } else {
        if (searchInput.value === course.name || searchInput.value === course.description || searchInput.value === course.price) {
        console.log(course.name);
          const container = document.createElement("div");
          container.className = "container"
          const courseTitle = document.createElement("h4");
          courseTitle.innerText = `course name: ${course.name}`;
          const courseDescription = document.createElement("p");
          courseDescription.innerText = `description: ${course.description}`;
          const coursePrice = document.createElement("p");
          coursePrice.innerText = course.price;
          main.appendChild(container);
          container.appendChild(courseTitle);
          container.appendChild(courseDescription);
          container.appendChild(coursePrice);
          result.innerText = 'found'
          result.classList.remove('error')
          } 
        }
  });
})
    findContainer.appendChild(searchInput);
    findContainer.appendChild(searchBtn);
  }