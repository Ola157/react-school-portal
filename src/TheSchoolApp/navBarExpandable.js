import React, { useState } from "react";
import useNavMenu from "./customHook/useNavMenu";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const NavExpand = ({ li_Header, isMenu, handleMenu }) => {
    // const [category, handleCategory, isMenu, handleMenu] = useNavMenu()
    // const [li_Header, setLiHeader] = useState([
    //     'Study', 'Research', 'Services for Business', 'Alumni', 'Giving', 'About'])

    return (<div className={`nav_link_smallscreen ${isMenu ? 'active' : ''}`}>
        <div className="navLink">
            <ul>
                <li><button onClick={() => handleMenu(!isMenu)}><span><RxCross1 /></span><span>Close menu</span></button></li>
                <li><span><IoIosArrowDown /></span><span>Home</span></li>
                {li_Header.map((li, index) => (
                    <li key={index}>
                        <span><IoIosArrowDown className="rotateSvg" /></span><span>{li}</span></li>
                ))}
            </ul>
        </div>
    </div>)
}
export default NavExpand