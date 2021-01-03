showPage(data, 1);
addPagination(data);
// this html provides the search component and functionality
const label = document.createElement('label');
label.htmlFor = 'search';
label.className = 'student-search';

const input = document.createElement('input');
input.id = 'search';
input.placeholder = 'Search by name...';
input.addEventListener('keyup', displaySearchResult);

const button = document.createElement('button');
button.type = 'button';
button.addEventListener('click', event => {
   if (event.target.tagName === 'BUTTON' || event.target.tagName === 'IMG') {
      displaySearchResult();
   }
});

const img = document.createElement('img');
img.src='img/icn-search.svg';
img.alt = 'Search icon';
label.appendChild(input);
button.appendChild(img);
label.appendChild(button);
document.querySelector('.header').appendChild(label);

function showPage(list, page) {
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';

   for (let i = startIndex; i < endIndex; i++) {
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

function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = '';

   for (let pageNum = 1; pageNum <= numOfPages; pageNum++){
      linkList.insertAdjacentHTML('beforeend',`<li><button type="button">${pageNum}</button></li>`);
   }

   linkList.firstElementChild.firstElementChild.className = 'active';
   linkList.addEventListener('click', event => {
      if (event.target.tagName === 'BUTTON') {
         const prevButton = document.querySelector('.active');
         prevButton.className = '';
         const button = event.target;
         button.className = 'active';
         showPage(list, parseInt(button.textContent));
      }
   });
}

function displaySearchResult() {
   const searchArr = [];
   const searchVal = input.value.toLowerCase();
   // checks if input value exists in the data array
   for(let i = 0; i < data.length; i++) {
      const title = data[i].name.title.toLowerCase();
      const first = data[i].name.first.toLowerCase();
      const last = data[i].name.last.toLowerCase();
      // check for every acceptable search combination and add data object to new array
      const titleFirst = title.concat(' ', first);
      const titleFirstLast = titleFirst.concat(' ', last);
      const firstLast = first.concat(' ', last);
      const titleLast = title.concat(' ', last);
      // if search term does exist add to new array
      if (title.includes(searchVal) || first.includes(searchVal) || last.includes(searchVal)) {
         searchArr.push(data[i]);
      } else if (titleFirst.includes(searchVal)) {
         searchArr.push(data[i]);
      } else if (titleFirstLast.includes(searchVal)) {
         searchArr.push(data[i]);
      } else if (firstLast.includes(searchVal)) {
         searchArr.push(data[i]);
      } else if (titleLast.includes(searchVal)) {
         searchArr.push(data[i]);
      }
   }
   // a list length of zero is a 'falsey' value 
   if (searchArr.length) {
      showPage(searchArr, 1);
      addPagination(searchArr);
   } else {
      // empty out the lists for students and pages
      document.querySelector('ul.student-list').innerHTML = '';
      document.querySelector('ul.link-list').innerHTML = '';

      const studentList = document.querySelector('.student-list');
      const message = document.createElement('h3');
      message.textContent = 'No results found';
      studentList.appendChild(message);
   }
}

