const addBookForm = document.getElementById("add-book-form");
const resultDiv = document.getElementById("result");
let books = [];

const bookCategories = {
  fiction: "Beletrystyka",
  nonFiction: "Literatura faktu",
  science: "Literatura popularnonaukowa",
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getDataFromLocalStrage = (key) => {
  return localStorage.getItem(key) !== null
    ? JSON.parse(localStorage.getItem(key))
    : [];
};

const addBook = (event) => {
  event.preventDefault();
  const bookFormData = new FormData(event.target);
  const bookDataObject = Object.fromEntries(bookFormData.entries());
  books.push(bookDataObject);
  saveToLocalStorage("MyBooks", books);
  const table = document.getElementById("book-table");
  if (table) {
    table.appendChild(generateTableRow(bookDataObject));
  } else {
    resultDiv.innerHTML = "";
    showBooksData(books);
  }
  event.target.reset();
};

const generateTableHeader = () => {
  const tHeader = document.createElement("tr");
  const tableHeaders = [
    "Tytuł książki",
    "Autor Książki",
    "Priorytet przeczytania",
    "Kategoria",
  ];
  tableHeaders.forEach((heading) => {
    const th = document.createElement("th");
    th.innerText = heading;
    tHeader.appendChild(th);
  });
  return tHeader;
};

const generateTableRow = (book) => {
  const tr = document.createElement("tr");
  const bookKeys = ["title", "author", "priority", "category"];
  bookKeys.forEach((key) => {
    const cell = tr.insertCell();
    const text = key === "category" ? bookCategories[book[key]] : book[key];
    cell.innerText = text;
  });
  return tr;
};

const showBooksData = (books) => {
  if (books.length > 0) {
    const table = document.createElement("table");
    table.classList.add("book-table");
    table.appendChild(generateTableHeader());
    books.forEach((book) => table.appendChild(generateTableRow(book)));
    resultDiv.appendChild(table);
  } else {
    const message = document.createElement("p");
    message.innerText = "Nie dodałeś jeszcze żadnych książek!";
    resultDiv.appendChild(message);
  }
};

books = getDataFromLocalStrage("MyBooks");
showBooksData(books);

addBookForm.addEventListener("submit", addBook);
