import { useDispatch} from 'react-redux'
import {setFilter} from '../reducers/filterReducer';

export default function Filter() {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
     <span>Filter:</span><input onChange={(newFilter) => dispatch(setFilter(newFilter.target.value))} />
    </div>
  )
}
