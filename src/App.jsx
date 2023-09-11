import { Routes, Route, NavLink } from 'react-router-dom'
import Week1 from './Week1'
import Week2 from './Week2'
import Week3 from './Week3'
function App () {
  const style = ({ isActive }) => {
    return {
      color: isActive ? 'active' : ''
    }
  }

  return (
    <>
      <header>
        <h1>Bonnie Wang - React practice</h1>
        <nav>
          <ul>
            <li>
              <NavLink to={`/`} style={style}>
                Week1
              </NavLink>
            </li>
            <li>
              <NavLink to={`/week2`} style={style}>
                Week2
              </NavLink>
            </li>
            <li>
              <NavLink to={`/week3`} style={style}>
                Week3
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Week1 />}></Route>
        <Route path='/week2' element={<Week2 />}></Route>
        <Route path='/week3' element={<Week3 />}></Route>
      </Routes>
    </>
  )
}

export default App
