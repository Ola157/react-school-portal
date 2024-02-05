import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUniversity } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";

const NavBar = ({ li_Header, category, handleCategory, isMenu, handleMenu }) => {

    const [navList, setNavList] = useState({
        'Study': {
            'Undergraduates': [
                'Find a course',
                'Accommodation',
                'Fees and funding',
                'Open Days',
                'Careers',
                'Scholarships',
                'Study abroad'
            ],

            'Postgraduates': [
                'Find a course',
                'Postgraduate events',
                'Funding your studies',
                'How to apply',
                'Accommodation',
                'Online learning',
                'Submit a postgraduate study enquiry'
            ],
            'Research degrees': [
                'Funded opportunities',
                'Applying',
                'Support and guidance'
            ],
            'International students': [
                'Your country',
                'Scholarships',
                'Applying for a visa',
                'Travelling to Leicester',
                'Global Study Centre',
                'Centre for International Training and Education'
            ],
            'City and Campus': [
                'Local area',
                'Get together',
                'Shopping',
                'Sport and health',
                'Free things to do',
                'Think',
                'Best kept secrets'
            ],
            'Information for...': [
                'Distance learners',
                'Professional learners',
                'Mature students',
                'Parents',
                'Teachers',
                'Study abroad and Erasmus students',
                'Student Support Services',
                'Local and commuting students'
            ]
        },
        'Research': {
            'Study with us': [
                'Doctoral College'
            ],
            'Research themes': [
                'Institutes',
                'Centres',
                'Experts',
                'Research culture'
            ],
            ' Explore our research': [
                'Blogs',
                'Podcasts',
                'Films',
            ],
            'REF2021 results': [],
            'Media enquiries': []
        },
        'Services for Business': {
            'Our expertise': [
                'Medicine, science and technology',
                'Business and law',
                'Culture, heritages and languages',
                'Social science',
                'Spin out companies'
            ],
            'Business development': ['Technology transfer',
                'Recruit our students',
                'Knowledge Transfer Partnerships'
            ],
            'Services for business': [
                'Consultancy',
                'Equipment and facilities',
                'Conferences and events',
                'Continuing Professional Development'],
            'Our vision': [],
            ' People and contacts': [],

        },
        'Alumni': {
            'Stay connected': [
                'Update your details',
                'Join an alumni chapter',
                'Arrange a reunion',
                'Class notes'
            ],
            'Get involved': [
                'Join the Alumni Association Committee',
                'Make a gift'
            ],
            'Benefits and services': [
                'Careers advice',
                'Library card',
                'Access to sports facilities',
                'Contact service',
                'Merchandise'
            ],
            ' Latest news': [
                'Gryphon magazine'
            ],
            'Upcoming events': [],
            'Transcripts and certificates': []
        },
        'Giving': {
            'Causes you can support': [
                'Greatest Need',
                'Student Support',
                'Research Excellence',
                'Ibadan Arts Centre'],
            'Legacy gifts': [],
            'Ways to give': [
                'Tax-efficient giving'
            ],
            'Your Impact': [],
            'Contact us': []
        },
        'About': {
            "About the University": [
                'History and campus',
                'Centenary: Our beginning',
                'Facts and figures',
                'Publications',
                'Term and semester dates',
                'Academic departments A - Z',
                'The Attenborough family',
                'Contact us'
            ],
            "Our governance": [
                'Executive Board',
                'Senior Leadership Team',
                'Council',
                'Senate',
                'Court'
            ],
            'Equity, diversity and inclusion': [
                'Support for staff and students',
                'Equality data',
                'Standing Together',
                'Access and Participation'
            ], 'Strategy and development': [],
            'Sustainable Development Goals': [],
            'Professional Services': [],
            'Community engagement': [],
        }
    })

    return (<nav className="nav_section">
        <header className="navBar_Header">
            <div className="navBar">
                <div className="navBar_Logo">
                    <Link >
                        <span> <FaUniversity /></span>
                        <span>
                            <h3>UNIVERSITY OF</h3>
                            <h3>OLUYOLE</h3>
                        </span>
                    </Link>
                </div>

                <div className="navLink">
                    <ul>
                        {li_Header.map((li, index) => (
                            <li onClick={() => handleCategory(li)} key={index} className={li === category ? 'active' : ''}>
                                {li}</li>
                        ))}
                        <li onClick={() => handleCategory('search')}>{category !== 'search' ? <IoSearch size={35} /> : <IoMdClose size={35} />}</li>
                    </ul>
                </div>

                <div className="burger-div" onClick={() => handleMenu(!isMenu)}>
                    <span>MENU</span>
                    <span><GiHamburgerMenu /></span>
                </div>
            </div>

            <div className={`navSearch ${category === 'search' ? 'active' : ''}`}>
                <div className="search_form">
                    <div>
                        <input />
                        <select>
                            <option>All</option>
                            <option>Courses</option>
                            <option>News</option>
                        </select>
                    </div>
                    <div>
                        <button>
                            <span>Search</span>
                            <span><HiArrowLongRight /></span>
                        </button>
                    </div>
                </div>
            </div>


            <div className="navmenu">
                {Object.entries(navList).map(([categ, menus]) => (
                    <div key={categ} className={`navCategory ${categ === category ? 'active' : ''}`}>
                        {/* <h3>{category}</h3> */}
                        {Object.entries(menus).map(([subCategory, items]) => (
                            <div key={subCategory}>
                                <h4><span>{subCategory}</span> <span><HiArrowLongRight /></span></h4>
                                <ul>
                                    {items.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>


        </header >
    </nav>)
}

export default NavBar