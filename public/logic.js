

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
const result = document.querySelector('#result')
const displayListOfCourses =  (listOfCourses) => {

  document.getElementById("allData").addEventListener("click", async (event) => {
    if (listOfCourses.length === 0) {
      result.innerText = 'there is no data to display'
    } else {
    for (let i = 0; i < listOfCourses.length; i++) {
      const course = listOfCourses[i];
      const container = document.createElement("div");
      container.className = "container"
      const courseTitle = document.createElement("h3");
      courseTitle.innerText = `course name :${course.name}`;
      const courseDescription = document.createElement("h3");
      courseDescription.innerText = `description: ${course.description}`;
      const coursePrice = document.createElement("h3");
      coursePrice.innerText = course.price;
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
      const editContainer = document.createElement("div");
      editContainer.className = 'edit-container'
      const openEditContainerBtn = document.createElement("button")
      openEditContainerBtn.innerText ='Edit'
      openEditContainerBtn.addEventListener("click",() =>{
        editContainer.classList.add('active')
      })
      
      const nameInput = document.createElement("input")
      nameInput.placeholder = 'Course Name'
      nameInput.value = course.name;
      const descriptionInput = document.createElement("input")
      descriptionInput.placeholder = 'Course description'
      descriptionInput.value = course.description;
      const priceInput = document.createElement("input")
      priceInput.placeholder = 'Course price'
      priceInput.value = course.price;
      
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
        })
        editContainer.classList.remove('active')
      })
      main.appendChild(container);
      container.appendChild(editContainer);
      container.appendChild(courseTitle);
      container.appendChild(courseDescription);
      container.appendChild(coursePrice);
      container.appendChild(openEditContainerBtn);
      editContainer.appendChild(nameInput);
      editContainer.appendChild(descriptionInput);
      editContainer.appendChild(priceInput);
      editContainer.appendChild(EditCourseBtn);
      container.appendChild(deleteBtn);
      console.log(listOfCourses.length);
      }
      }
    })
  }
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
      const container = document.createElement("div");
      container.className = "container"
      const courseTitle = document.createElement("h3");
      courseTitle.innerText = `course name :${res.name}`;
      const courseDescription = document.createElement("h3");
      courseDescription.innerText = `description: ${res.description}`;
      const coursePrice = document.createElement("h3");
      coursePrice.innerText = res.price;
      main.appendChild(container);
      container.appendChild(courseTitle);
      container.appendChild(courseDescription);
      container.appendChild(coursePrice);

    });
  })

  }

  const findCourse = (listOfCourses) => {
    const findContainer = document.createElement("div");
    const searchInput = document.createElement("input");
    searchInput.placeholder = "Search by name or description"
    const searchBtn = document.createElement("button")
    searchBtn.innerText = 'Find'
    searchBtn.addEventListener("click", () => {
      console.log('searchBtn');
      for (let i = 0; i < listOfCourses.length; i++) {
        const course = listOfCourses[i];
        if (searchInput.value === course.name || searchInput.value === course.description ) {
          const container = document.createElement("div");
          container.className = "container"
          const courseTitle = document.createElement("h3");
          courseTitle.innerText = `course name :${course.name}`;
          const courseDescription = document.createElement("h3");
          courseDescription.innerText = `description: ${course.description}`;
          const coursePrice = document.createElement("h3");
          coursePrice.innerText = course.price;
          main.appendChild(container);
          container.appendChild(courseTitle);
          container.appendChild(courseDescription);
          container.appendChild(coursePrice);
        }
      }
    })
    main.appendChild(findContainer)
    findContainer.appendChild(searchInput);
    findContainer.appendChild(searchBtn);
  }