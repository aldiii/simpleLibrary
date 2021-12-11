const addBookForm = document.getElementById("add-book-form");

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

addBookForm.addEventListener("submit", addBook);
