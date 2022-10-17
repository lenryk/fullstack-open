import { connect} from 'react-redux'
import {setFilter} from '../reducers/filterReducer';

function Filter({setFilter}) {

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
     <span>Filter:</span><input onChange={(newFilter) => setFilter(newFilter.target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter
