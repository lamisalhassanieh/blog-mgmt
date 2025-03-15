
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../../public/dummy-logo.svg";
import closeIcon from "../../../../public/icons/close-menu-icon.svg";
import loginIcon from "../../../../public/icons/login-icon.svg";

import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const [mobileOverlayActive, setMobileOverlayActive] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleHamburgerMenuClick = () => {
    setMobileOverlayActive(!mobileOverlayActive);
  };

  return (
    <React.Fragment>
      <div className={`${classes["header-container"]}`}>
        <header>
          <div className={`container py-3`}>

            <div className="d-flex align-items-center justify-content-between">
              <div>
                <Link href="/" className="text-decoration-none">
                  {logo && (
                    <Image
                      src={logo}
                      alt="Blog Website Logo"
                      width="226"
                      height="43"
                      loading="lazy"
                    />
                  )}
                </Link>
              </div>
              <nav className="d-none d-lg-block">
                <ul className="list-unstyled d-flex gap-4 mb-0 align-items-center ">
                  <li><Link href="/homepage" className="text-light text-decoration-none">Home</Link></li>
                  <li><Link href="#about-us" className="text-light text-decoration-none">About Us</Link></li>
                  <li><Link href="#our-blog" className="text-light text-decoration-none">Blog</Link></li>
                  <li>
                    <Link
                      href="/login"
                      className="btn btn-light d-flex align-items-center gap-2"
                    >
                      <Image
                        src={loginIcon}
                        alt="Login"
                        width={20}
                        height={20}
                        className="text-light"
                      />
                      <span>Login</span>
                    </Link>
                  </li>
                </ul>
              </nav>

              <button
                className={`btn d-lg-none border-0 p-0 ${classes["hamburger-menu"]}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleHamburgerMenuClick();
                }}
                type="button"
                aria-label="Toggle navigation"
              >
                <div className="d-flex flex-column gap-1">
                  <span className="bg-light d-block" style={{ width: '24px', height: '2px' }}></span>
                  <span className="bg-light d-block" style={{ width: '24px', height: '2px' }}></span>
                  <span className="bg-light d-block" style={{ width: '24px', height: '2px' }}></span>
                </div>
              </button>
            </div>
          </div>

        </header>
      </div>
      {/* Mobile Overlay */}
      <div className={`position-fixed top-0 start-0 w-100 h-100 bg-white ${mobileOverlayActive ?
        'd-block' : 'd-none'}`} style={{ zIndex: 1001 }}>
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link href="/">
              {logo && (
                <Image
                  src={logo}
                  alt="Logo"
                  width="226"
                  height="43"
                  loading="lazy"
                />
              )}
            </Link>
            <button
              className={`btn border-0 p-0 ${classes["hamburger-menu"]}`}
              onClick={handleHamburgerMenuClick}
            >
              {closeIcon && (
                <Image
                  src={closeIcon}
                  alt="Close Menu"
                  width={22}
                  height={22}
                  loading="lazy"
                />
              )}
            </button>
          </div>

          <nav className="mb-5 ps-3">
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link href="/" className="text-dark text-decoration-none fs-5">Home</Link>
              </li>
              <li className="mb-3">
                <Link href="#about-us" className="text-dark text-decoration-none fs-5">About Us</Link>
              </li>
              <li className="mb-3">
                <Link href="#our-blog" className="text-dark text-decoration-none fs-5">Our Blog</Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="btn btn-light d-flex align-items-center gap-2"
                >
                  <Image
                    src={loginIcon}
                    alt="Login"
                    width={20}
                    height={20}
                    className="text-light"
                  />
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="position-absolute bottom-0 start-0 w-100 bg-light py-4">
            <div className="container d-flex justify-content-between align-items-center">
              <div className="text-muted">
                Copyright © {currentYear} Blog Website . All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
