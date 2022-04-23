// https://openlibrary.org/search.json?q=javascript
// https://covers.openlibrary.org/b/id/{cover_i}-M.jpg

const searchBook = () => {
  const inputField = document.getElementById("search-book");
  const searchItems = inputField.value;

  if (searchItems === "") {
    alert("Search something");
    return;
  }
  const section = document.getElementById("books-container");
  section.textContent = "";
  toggleSpinner("block", "none");
  loadData(searchItems);
  inputField.value = "";
};

const loadData = (book) => {
  const url = `https://openlibrary.org/search.json?q=${book}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.docs));
};

const displayData = (bookList) => {
  const section = document.getElementById("books-container");
  bookList?.forEach((element) => {
    const coverImage = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
    const div = document.createElement("div");
    div.className = "shadow-md rounded-md bg-white m-3 overflow-hidden";
    div.innerHTML = `
   <div class="flex">
        <div class="w-3/12">
            <img class="w-full" src="${coverImage}" />
        </div>
        <div class="p-5 w-full text-slate-800">
            <h1 class="text-3xl"> <span class="font-bold"></span> ${
              element.title
            }</h1>
            <p class="text-base"> <span class="font-bold">Author:</span> ${
              element.author_name
                ? element.author_name
                : "Author name not found"
            }</p>
            <p class="text-base"> <span class="font-bold">Publisher:</span> ${
              element.publisher ? element.publisher : "Publisher not found"
            }</p>
            <p class="text-base"> <span class="font-bold">First publish:</span> ${
              element.first_publish_year
                ? element.first_publish_year
                : "Not found"
            }</p>
            <p class="text-base"> <span class="font-bold">Publisher date:</span> ${
              element.publish_date ? element.publish_date : "Not found"
            }</p>
            <p class="text-base"> <span class="font-bold">Publish place:</span> ${
              element.publish_place ? element.publish_place : "Not found"
            }</p>
            <p class="text-base"> <span class="font-bold">Subject:</span> ${
              element.subject ? element.subject : "Not found"
            }</p>
            <p class="text-base"> <span class="font-bold">Language:</span> ${
              element.language ? element.language : "Language not found"
            }</p>
        </div>  
   </div>
    `;
    section.appendChild(div);
    toggleSpinner("none", "block");
  });
};

// spinner
const toggleSpinner = (toggle1, toggle2) => {
  document.getElementById("spinner").style.display = toggle1;
  document.getElementById("main-container").style.display = toggle2;
};
