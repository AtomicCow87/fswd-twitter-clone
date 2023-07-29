// layout.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faSquareTwitter } from '@fortawesome/free-brands-svg-icons';


const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-info" href="/">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="me-3 mb-0 text-secondary">
            <a href="https://fontawesome.com/license/free" target="_blank" rel="noopener noreferrer" className="ml-2">
              <FontAwesomeIcon icon={faSquareTwitter} className="mx-2" />
            </a>
            Twitter Clone
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;