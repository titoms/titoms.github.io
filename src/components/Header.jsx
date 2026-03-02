import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { styles } from '../styles'
import { logo, menu, close } from '../assets'
import { navLinks, CALENDLY_URL } from '../config/constants'

const Header = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-50 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Christophe &nbsp;
            <span className="sm:block hidden">| &nbsp;</span> Crognier
          </p>
        </Link>

        {/* Desktop nav — now only shows above 1000px */}
        <ul className="list-none hidden min-[1000px]:flex flex-row gap-8 items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <li>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#915eff] text-white font-semibold px-5 py-2 rounded-xl hover:bg-[#804dee] transition-all text-[15px] whitespace-nowrap shadow-lg shadow-[#915eff]/20"
            >
              Book a Call
            </a>
          </li>
        </ul>

        {/* Mobile nav — shows below 1000px */}
        <div className="min-[1000px]:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer z-[60] transition-all"
            onClick={() => setToggle(!toggle)}
          />
          
          <div
            className={`${!toggle ? "translate-x-full" : "translate-x-0"}
              fixed inset-0 w-full h-screen bg-primary/95 backdrop-blur-xl z-50 transition-transform duration-500 ease-in-out flex items-center justify-center`}
          >
            <ul className="list-none flex flex-col gap-10 items-center">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white font-bold" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[28px] hover:text-white transition-all`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#915eff] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#804dee] transition-all text-[22px] shadow-lg shadow-[#915eff]/20"
                  onClick={() => setToggle(false)}
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
