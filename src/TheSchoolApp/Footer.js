import React, { useState } from "react";
import { FaGlobeAfrica } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaWeibo } from "react-icons/fa";


const FooterPage = ({ footerList }) => {

    let [category, setCategory] = useState([])
    let [footerBottom, setFooter] = useState([
        'Legal',
        'Freedom of Information',
        'Data Protection',
        'Privacy Notices',
        'Ts and Cs of your offer',
        'Modern Slavery Act Transparency Statement',
        'Student Protection Plan',
        'Manage Cookies'
    ])

    const handleToggle = (toggleType) => {
        if (category.includes(toggleType)) {
            setCategory(category.filter((cat) => cat !== toggleType));
        } else {
            setCategory([...category, toggleType]);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-flex">
                    {Object.entries(footerList).map(([footerH4, listItem]) => {

                        let activeCategory = category && category.find((cat) => cat === footerH4)

                        return (
                            <div key={footerH4}>
                                <h4 onClick={() => handleToggle(footerH4)}><span>{footerH4}</span>
                                    <span className={`${footerH4 === activeCategory ? 'rotate' : ''}`}><IoIosArrowDown /></span></h4>
                                <ul className={`expand ${footerH4 === activeCategory ? 'out' : ''}`}>
                                    {listItem.map((list, index) => (
                                        < li key={index} > {list}</li>
                                    ))}
                                </ul>
                            </div>)
                    })}

                    <ul>
                        <li><FaGlobeAfrica size={200} /></li>
                    </ul>
                </div>

                <div className="bottom-footer-flex">
                    <div>
                        <img src={require(`${'./assets/rating.png'}`)} />
                    </div>
                    <div className="footer-link">
                        <span><FaFacebook /></span>
                        <span><FaSnapchatGhost /></span>
                        <span><FaInstagram /></span>
                        <span><FaLinkedinIn /></span>
                        <span><FaXTwitter /></span>
                        <span><FaYoutube /></span>
                        <span><FaWeibo /></span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-inner">
                    <ul>
                        {footerBottom.map((footer, index) => (
                            <li key={index}>
                                <span>{footer}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer >
    )
}
export default FooterPage