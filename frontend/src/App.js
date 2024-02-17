import BookForm from './components/BookForm/BookForm'
import Filter from './components/Filter/Filter'
import BookList from './components/BookList/BookList'
import Error from './components/Error/Error'
import s from './App.module.css'

function App () {
  return (
    <div className={s.app}>
      <header className={s.header}>
        <h1>Book Library</h1>
      </header>
      <main className={s.main}>
        <div className={s.leftColumn}>
          <BookForm/>
        </div>
        <div className={s.rightColumn}>
          <Filter/>
          <BookList/>
        </div>
      </main>
      <Error/>
    </div>
  )
}

export default App
