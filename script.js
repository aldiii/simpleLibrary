const addBookForm = document.getElementById("add-book-form");
const resultDiv = document.getElementById("result");

const bookCategories = {
  fiction: "Beletrystyka",
  nonFiction: "Literatura faktu",
  science: "Literatura popularnonaukowa",
};

const saveToLocalStorage = (key, data) => {
  const dataArray = getDataFromLocalStrage(key);
  dataArray.push(data);
  localStorage.setItem(key, JSON.stringify(dataArray));
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
  saveToLocalStorage("MyBooks", bookDataObject);
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

const showBooksData = (books) => {
  if (books.length > 0) {
    const table = document.createElement("table");
    table.appendChild(generateTableHeader());
    resultDiv.appendChild(table);
  }
};

const books = getDataFromLocalStrage("MyBooks");
showBooksData(books);

addBookForm.addEventListener("submit", addBook);
