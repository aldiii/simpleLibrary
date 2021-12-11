const addBookForm = document.getElementById("add-book-form");

const addBook = (event) => {
  event.preventDefault();
  const bookFormData = new FormData(event.target);
  const bookDataObject = Object.fromEntries(bookFormData.entries());
  event.target.reset();
};

addBookForm.addEventListener("submit", addBook);
