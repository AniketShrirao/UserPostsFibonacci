/* Author: Aniket
2. a. Use the API https://jsonplaceholder.typicode.com/posts. This API gives posts of each user by the users Id.
b. The task is to make a webpage displaying the title and post of each post given by the API as blocks in a page.
c. Your url should take query parameters named pageNo, this param will decide the number of posts to be shown in your page.
d. Also note the following conditions: 
  - The no of posts in the page will be decided on the value of pageNo in param.
  -   For a pageNo value of n, number of posts will be nth term of fibonacci series 
d. The posts should be displayed on the page.

3.a. After the display of the post call the API https://jsonplaceholder.typicode.com/photos. This API gives you photos. 
b. You should display 3 photos next to even userIds and 2 photos next to odd userIds.
c. Also note the photos should be mapped in reverse order, for Eg, If the current page loads 10 user posts and the 1 post has userId 1 which is odd then it should consist of last 2 photos, the 2nd post should consist of the next 3 photos from bottom after the 2 photos which were used for 1 post and so on.
*/
let submitButton = document.querySelector('input[type="button"]');
submitButton.addEventListener('click', () => {
	let pageNo = document.querySelector('input[type="text"]').value;
	let urlForPosts = "https://jsonplaceholder.typicode.com/posts";
let urlForImages = "https://jsonplaceholder.typicode.com/photos";
let postsData;
//fetching 1st api post api
const posts = fetch(urlForPosts)
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			errors("Posts API isn't Responding!!");
		}
	})
	.then(data => {
		postsData = data;
	})
	.catch(error => { errors(error); });

//2nd api photo api
const photo = fetch(urlForImages)
	.then(response => {
		if (response.ok) {
			return response.json();
		} else {
			errors("Photo API isn't Responding!!");
		}
	})
	.then(data => {
		//function to display data
		displayUI(data,postsData);
	})
	.catch(error => { errors(error); });

const errors = (message) => { console.log(message); }


function displayUI(data) {
	let fibonacciArray = fibonacciSeries(pageNo);
	let fibonacciNthTerm = fibonacciArray.pop();
	let reverseData = [...data].reverse();
	console.log(reverseData);
	for (let i = 0; i < 10; i++) {
		let id = postsData[i].userId;
		console.log(id);
		for (let j = 0; j < fibonacciNthTerm; j++) {
			let posts = document.querySelector('.posts');
			let post = createElement('li','post',posts, '');
			let userDetails = createElement('div', 'user-details', post, '');
			let userPhotos = createElement('div', 'user-photos', post, ''); 
			createElement('span', 'userid', userDetails,"User Id: "+postsData[i].id);
			createElement('p', 'title', userDetails,"Title: "+ postsData[j].title);
			createElement('p', 'postBody', userDetails,"Body: "+postsData[j].body);
			//checking id is even or odd and adding images accrodingly
			if (id % 2 === 0) {
				for (let k = 0; k < 3; k++) {
					let figureElement = createElement('figure', '', userPhotos, '');
					let imgElement = createElement('img',reverseData[k].title,figureElement, reverseData[k].url);
				}
			} else {
				for (let k = 0; k < 2; k++) {
					let figureElement = createElement('figure', '', userPhotos, '');
					let imgElement = createElement('img',reverseData[k].title, figureElement, reverseData[k].url);
				}
			}
		}
	}
}

var fibonacciSeries = (pageNo) => {
	if (pageNo === 1) {
		return [0, 1];
	} else {
		var s = fibonacciSeries(pageNo - 1);
		s.push(s[s.length - 1] + s[s.length - 2]);
		return s;
	}
};

function createElement(elementName, className, parentName, value) {
	// Creating Element-Childs of .display class element
	var createdElement = document.createElement(elementName);
	// appending Element-Childs to its parent element
	parentName.appendChild(createdElement);
	if (createdElement.localName !== 'img') {
		// displaying retrieved data to innerText of elements 
		createdElement.innerHTML = value;
		// setting class to all created elements
		if (className !== '') {
			createdElement.setAttribute('class', className);
		}
	} else {
		// setting source to  image
		createdElement.setAttribute('title',className);
		createdElement.setAttribute('src', value);
	}
	return createdElement;
}
	//seeting url
	// window.location.assign("/index.html?pageNo=" + pageNo);
	// //getting exact no. from url. used split since there is only one parameter
	// let valueOfPageNo = location.search.split("=")[1];
});
