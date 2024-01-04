import { generateMarkup } from "./renderUser.js";

const form = document.querySelector('.js-form');
const search = document.querySelector('.js-search-bar');
const githubCard = document.querySelector('.github-profile-card');

form.addEventListener('submit', async e => {
	e.preventDefault();
	
	const validUser = await checkInputs();
	search.value = "";

	const markup = generateMarkup(validUser);
	console.log(markup);
	githubCard.innerHTML = '';
	githubCard.insertAdjacentHTML('afterbegin', markup);
});

async function checkInputs() {
	const searchValue = search.value.trim();
	const user = await getJSON(`https://api.github.com/users/${searchValue}`);
	
	if(searchValue === '') {
		setErrorFor(search, 'Insert a username');
	} else if (!user) {
		setErrorFor(search, 'No results');
	} else {
		setSuccessFor(search, '')
		return user;
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'github-search-bar form-control js-form error';
	small.innerText = message;
}

function setSuccessFor(input, message) {
    const formControl = input.parentElement;
	formControl.classList.remove('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};

const getJSON = async function (url) {
		const fetchAdv = await fetch(url);
		
		const res = await Promise.race([fetchAdv, timeout(10)]);
		
		const data = await res.json();
	
		console.log(res.ok);
		
		if (!res.ok) return res.ok;
		return data;
};