const form = document.querySelector(".form--container");
const errorMessage = document.querySelector(".errorMessage");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const priority = document.querySelector("#priority");
const category = document.querySelector("#category");
const tbody = document.querySelector(".tbody");
const emptyMessage = document.querySelector(".emptyMessage");
const btn = document.querySelector(".btn");
const table = document.querySelector("table");
const bgc = document.querySelector(".background");

const validateForm = () => {
  let message = [];
  let valid;

  if (title.value === "") {
    message.push("Title is required");
  }
  if (author.value === "") {
    message.push("Author is required");
  }
  if (message.length > 0) {
    errorMessage.innerText = message.join(", ");
    valid = false;
  } else {
    errorMessage.innerText = "";
    valid = true;
  }
  if (valid) {
    tbody.innerHTML = "";
    addBook();
    resetForm();
    isEmpty();
    bgc.style.height = `${
      document.documentElement.clientHeight + table.clientHeight
    }px`;
  } else return;
};
const addBook = () => {
  let books = JSON.parse(window.localStorage.getItem("books"));
  if (!books) {
    books = [];
  }
  const book = {
    title: title.value,
    author: author.value,
    priority: priority.value,
    category: category.value,
  };
  books.push(book);
  books.map((book) => {
    if (book.title.length > 0 && book.author.length > 0) {
      const tr = document.createElement("tr");
      tbody.appendChild(tr);
      tr.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.priority}</td><td>${book.category}</td>`;
    }
  });
  localStorage.setItem("books", JSON.stringify(books));
};
const resetForm = () => {
  title.value = "";
  author.value = "";
  priority.value = "1";
  category.value = "Fiction";
};
isEmpty = () => {
  const books = JSON.parse(window.localStorage.getItem("books"));
  if (!books) {
    emptyMessage.textContent = `You don't have any book in your libary. Plese add some using form from above`;
  } else {
    emptyMessage.textContent = "";
    table.style.display = "table";
  }
};

const IsbooksStored = () => {
  const books = JSON.parse(window.localStorage.getItem("books"));
  if (books === null || !books) {
    return;
  } else addBook();
};

isEmpty();
IsbooksStored();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});
btn.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

window.onload = bgc.style.height = `${
  document.documentElement.clientHeight + table.clientHeight
}px`;
