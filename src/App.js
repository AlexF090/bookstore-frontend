import { useEffect, useState } from "react";
import cors from "cors";
import "./App.css";
import styled from 'styled-components';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [published_date, setPublished_date] = useState("");
  const [number_of_pages, setNumber_of_pages] = useState(0);
  const [publisher, setPublisher] = useState("");

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
    <main className="App">
      <FormWrapper onSubmit={saveStudentToDatabase}>
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
            setIsbn(event.target.value);
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
            setAuthor(event.target.value);
          }}
        ></input>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
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
            setPublished_date(event.target.value);
          }}
        ></input>
        <label htmlFor="number_of_pages">Number of pages:</label>
        <input
          type="number"
          id="number_of_pages"
          name="number_of_pages"
          placeholder="Number of pages"
          value={number_of_pages}
          onChange={(event) => {
            setNumber_of_pages(Number(event.target.value));
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
            setPublisher(event.target.value);
          }}
        ></input>
        <button>Save</button>
      </FormWrapper>
      <ListWrapper>
        {books.map((book) => (
          <ListItems key={book._id}>
            <h2>Title: {book.title}</h2>
            <p>ISBN: {book.isbn}</p>
            <p>Author: {book.author}</p>
            <p>Description: {book.description}</p>
            <p>Published Date: {book.published_date}</p>
            <p>Number of pages: {book.number_of_pages}</p>
            <p>Publisher: {book.publisher}</p>
          </ListItems>
        ))}
      </ListWrapper>
    </main>
  );
}



const FormWrapper = styled.form `
display: flex;
flex-direction: column;
align-items: center;
flex-wrap: wrap;
gap: 0.5rem;
`
const ListWrapper = styled.ul`
display: flex;
flex-direction: column;
`

const ListItems = styled.li `
margin: 2rem 0;
list-style: none;
`

export default App;
