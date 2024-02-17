import { useDispatch, useSelector } from 'react-redux'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'
import { deleteBook, toggleFavorite, selectBooks, } from '../../redux/slices/booksSlice'
import { selectAuthorFilter, selectOnlyFavoriteFilter, selectTitleFilter } from '../../redux/slices/filterSlice'
import s from './BookList.module.css'

const BookList = () => {
  const books = useSelector(selectBooks)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id))
  }

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
    return matchesTitle && matchesAuthor && matchesFavorite
  })

  const highlightMatch = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, 'gi')
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className={s.highlight}>
            {substring}
          </span>
        )
      }
      return substring
    })

  }

  return (
    <div className={s.block}>
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul className={s.listUl}>
          {filteredBooks.map((book, i) => (
            <li className={s.listLi} key={book.id}>
              <div className={s.bookInfo}>
                {++i}. {highlightMatch(book.title, titleFilter)} by
                <strong>{highlightMatch(book.author, authorFilter)}</strong> ({book.source})
              </div>
              <div className={s.bookActions}>
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className={s.starIcon}/>
                  ) : (
                    <BsBookmarkStar className={s.starIcon}/>
                  )}
                </span>
                <button className={s.button} onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList

