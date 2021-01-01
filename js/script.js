/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const itemsPerPage = 9;
   // if (page === 5) {
   //    itemsPerPage = list.length - (Math.floor(list.length / 9) * 9);
   // }
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   let studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';

   for (let i = startIndex; i < endIndex; i++) {
      // console.log(i);
      if (list[i]){
         studentList.insertAdjacentHTML('beforeend', `<li class="student-item cf">
                                                        <div class="student-details">
                                                          <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                                                          <h3>${list[i].name.first} ${list[i].name.last}</h3>
                                                          <span class="email">${list[i].email}</span>
                                                        </div>
                                                        <div class="joined-details">
                                                          <span class="date">Joined ${list[i].registered.date}</span>
                                                        </div>
                                                      </li>`);
      }
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // create a variable to calculate the number of pages needed
   const numOfPages = Math.ceil(list.length / 9);
   // select the element with a class of `link-list` and assign it to a variable
   let linkList = document.querySelector('ul.link-list');
   // set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = '';
   // loop over the number of pages needed
   // create the elements needed to display the pagination button
   // insert the above elements
   for (let pageNum = 1; pageNum <= numOfPages; pageNum++){
   linkList.insertAdjacentHTML('beforeend',`<li><button type="button">${pageNum}</button></li>`);
   }
   // give the first pagination button a class of "active"
   linkList.firstElementChild.firstElementChild.className = 'active';
   // create an event listener on the `link-list` element
   linkList.addEventListener('click', (event) => {
      // if the click target is a button:
      if (event.target.tagName === 'BUTTON') {
         // remove the "active" class from the previous button
         let prevButton = document.querySelector('.active');
         prevButton.className = '';
         // add the active class to the clicked button
         let button = event.target;
         button.className = 'active';
         // call the showPage function passing the `list` parameter and page to display as arguments
         showPage(list, parseInt(button.textContent));
      }
   });
}
// Call functions
showPage(data, 1);
addPagination(data);