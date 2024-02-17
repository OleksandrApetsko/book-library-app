import { useDispatch, useSelector } from 'react-redux'
import {
  resetFilters,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
  selectTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  setTitleFilter
} from '../../redux/slices/filterSlice'
import s from './Filter.module.css'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleOnlyFavoriteFilterChange = () => {
    dispatch(setOnlyFavoriteFilter())
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  return (
    <div className={s.block}>
      <div className={s.row}>
        <div className={s.group}>
          <input className={s.input}
            type="text"
            value={titleFilter}
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className={s.group}>
          <input className={s.input}
            type="text"
            value={authorFilter}
            placeholder="Filter by author..."
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className={s.group}>
          <label>
            <input className={s.input} type="checkbox" checked={onlyFavoriteFilter} onChange={handleOnlyFavoriteFilterChange}/>
            Only Favorite
          </label>
        </div>
        <button className={s.button} type="button" onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  )
}

export default Filter

// e  -  event (подія)