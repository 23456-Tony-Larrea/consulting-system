import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import s from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`container page-footer ${s.containerFooter}`}>
      <div className=" footer-content">
        <div className="container-fluid">
          {/* <Row> */}
            {/* <Colxx xxs="12" sm="2"> */}
              <p className="mb-0 text-muted">MirandaSoft 2023</p>
            {/* </Colxx> */}
          {/* </Row> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
