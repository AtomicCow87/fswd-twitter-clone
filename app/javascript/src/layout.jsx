import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Twitter</a>
        </div>
      </nav>
      <div className="container py-3">
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Layout;