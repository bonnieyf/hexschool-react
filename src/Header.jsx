import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>My App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/week1">Week 1</Link>
          </li>
          <li>
            <Link to="/week2">Week 2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;