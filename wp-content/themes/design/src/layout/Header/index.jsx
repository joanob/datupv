import React, {useState, useEffect, useRef} from 'react'
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai"

const NavLink = ({href, text}) => {
    return (
            <li className='nav-link'>
                <a href={href}>{text}</a>
            </li>
    )
}

const NavLinkWithSubmenu = ({text, items}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <ul className="nav-link-with-submenu">
            <p onClick={()=>{setIsOpen(!isOpen)}}>
                {text}
                <span>{isOpen ? <AiFillCaretUp width={15} /> : <AiFillCaretDown /> }</span>
            </p>
            {
                !isOpen ? null : 
                <ul className='nav-link-items'>
                {
                    items.map(item => 
                        <NavLink key={item.text} text={item.text} href={item.href} />
                    )
                }
            </ul>
            }
            
        </ul>
        
    )
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const nav = [
        {
            text: "La delegación",
            items: [
                {
                    text: "Qué es la delegación",
                    href: "#"
                },
                {
                    text: "Qué hacemos",
                    href: "#"
                },
                {
                    text: "El equipo",
                    href: "#"
                }
            ]
        },
        {
            text: "Asuntos Académicos",
            items: [
                {
                    text: "Normativa",
                    href: "#"
                },
                {
                    text: "Mistral",
                    href: "#"
                }
            ]
        },
        {
            text: "Actividades",
            href: ""
        },
        {
            text: "Guías",
            href: ""
        },
        {
            text: "Contacto",
            href: ""
        },
    ]
  return (
    <header className="header">
        <div className="logo">
            <a href="#">
                <img src="https://dat.webs.upv.es/wp-content/uploads/2018/03/Logo-Color-300.png" alt="Logo" />
            </a>
        </div>
        <ul className='nav nav-desktop'>
            {
            nav.map(item => 
                item.items ?
                <NavLinkWithSubmenu key={item.text} text={item.text} items={item.items} />
                :
                    <NavLink key={item.text} text={item.text} href={item.href} />
            )
            }
        </ul>
        <div className={isOpen ? "nav-toggle nav-toggle-open" : "nav-toggle"} onClick={()=>{setIsOpen(!isOpen)}}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        {
            !isOpen ?
            null :
            <ul className='nav'>
                {
                nav.map(item => 
                    item.items ?
                    <NavLinkWithSubmenu key={item.text} text={item.text} items={item.items} />
                    :
                     <NavLink key={item.text} text={item.text} href={item.href} />
                )
                }
            </ul>
        }
    </header>
  )
}

export default Header