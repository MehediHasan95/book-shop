// https://openlibrary.org/search.json?q=javascript
// https://covers.openlibrary.org/b/id/{cover_i}-M.jpg

const loadData = () => {
  fetch("https://openlibrary.org/search.json?q=javascript")
    .then((res) => res.json())
    .then((data) => displayData(data.docs));
};

loadData();
const displayData = (items) => {
  const bookContainer = document.getElementById("book-container");
  bookContainer.textContent = "";

  items?.forEach((elements) => {
    // console.log(elements);
    const bookCover = `https://covers.openlibrary.org/b/id/${elements.cover_i}-M.jpg`;
    const div = document.createElement("div");
    div.classList.add(
      "shadow-md",
      "rounded-lg",
      "bg-yellow-200",
      "w-full",
      "p-3"
    );
    div.innerHTML = `
    <img src="${bookCover}" />
    <p><span class='font-bold'>Name:</span> ${elements.title}</p>
    <p><span class='font-bold'>Author:</span> ${elements.author_name}</p>
    <p><span class='font-bold'>Publisher:</span> ${elements.publisher}</p>
    <p><span class='font-bold'>First publish:</span> ${
      elements.first_publish_year ? elements.first_publish_year : "not avaiable"
    }</p>
    `;
    bookContainer.appendChild(div);
  });
  toggleSpinner("none", "block");
};

const searchBooks = () => {
  const searchField = document.getElementById("search-book").value;

  if (searchField == "") {
    alert("Please search something");
  } else {
    toggleSpinner("block", "none");
    const url = `https://openlibrary.org/search.json?q=${searchField}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displayData(data.docs);
      });
  }
};

// spinner function
const toggleSpinner = (spin, SearchResult) => {
  document.getElementById("spinner").style.display = spin;
  document.getElementById("main-container").style.display = SearchResult;
};
