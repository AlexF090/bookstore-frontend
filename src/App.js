import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [published_date, setPublished_date] = useState("");
  const [number_of_pages, setNumber_of_pages] = useState(0);
  const [publisher, setpublisher] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  function saveStudentToDatabase(event) {
    event.preventDefault();

    const body = {
      title: title,
      isbn: isbn,
      author: author,
      description: description,
      published_date: published_date,
      number_of_pages: number_of_pages,
      publisher: publisher,
    };

    fetch("http://localhost:3000/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }

  return (
    <div className="App">
      <form onSubmit={saveStudentToDatabase}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          required
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          placeholder="ISBN"
          required
          value={isbn}
          onChange={(event) => {
            setIsbn(Number(event.target.value));
          }}
        ></input>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Author"
          value={author}
          onChange={(event) => {
            setAuthor(Number(event.target.value));
          }}
        ></input>
        <label htmlFor="description">description:</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(event) => {
            description(Number(event.target.value));
          }}
        ></input>
        <label htmlFor="published_date">Published Date:</label>
        <input
          type="text"
          id="published_date"
          name="published_date"
          placeholder="Published Date"
          value={published_date}
          onChange={(event) => {
            published_date(Number(event.target.value));
          }}
        ></input>
        <label htmlFor="number_of_pages">number_of_pages:</label>
        <input
          type="number"
          id="number_of_pages"
          name="number_of_pages"
          placeholder="Number of pages"
          value={number_of_pages}
          onChange={(event) => {
            number_of_pages(Number(event.target.value));
          }}
        ></input>
        <label htmlFor="publisher">Publisher:</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          placeholder="Publisher"
          value={publisher}
          onChange={(event) => {
            publisher(Number(event.target.value));
          }}
        ></input>
        <button>Save</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h2>Title: {book.title}</h2>
            <p>ISBN: {book.isbn}</p>
            <p>Author: {book.author}</p>
            <p>Description: {book.description}</p>
            <p>Published Date: {book.published_date}</p>
            <p>Number of pages: {book.number_of_pages}</p>
            <p>Publisher: {book.publisher}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
