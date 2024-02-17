import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'
import { addBook, fetchBook, selectIsLoadingViaAPI } from '../../redux/slices/booksSlice'
import booksData from '../../data/books.json'
import createBookWithID from '../../utils/createBookWithID'
import { setError } from '../../redux/slices/errorSlice'
import s from './BookForm.module.css'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)
  const dispatch = useDispatch()

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]
    dispatch(addBook(createBookWithID(randomBook, 'random')))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, 'manual')))
      setTitle('')
      setAuthor('')
    } else {
      dispatch(setError('You mast fill tittle and author!'))
    }
  }

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook('http://localhost:4000/random-book'))
  }

  return (
    <div className={s.block}>
      <h2>Add a New Book</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <div>
          <label className={s.label} htmlFor="title">Title: </label>
          <input className={s.input} type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <label className={s.label} htmlFor="author">Author: </label>
          <input className={s.input} type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <button className={s.button} type="submit">Add Book</button>
        <button className={s.button} type="button" onClick={handleAddRandomBook}>Add Random</button>
        <button className={s.button} type="button" onClick={handleAddRandomBookViaAPI} disabled={isLoadingViaAPI}>
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className={s.spinner}/>
            </>
          ) : 'Add random via API'}
        </button>
      </form>
    </div>
  )
}

export default BookForm

// for big form:
// const [formData, setFormData] = useState({})
