import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { HiArrowLongRight } from "react-icons/hi2";
import { GiBookmark } from "react-icons/gi";
import { FaRegCalendarTimes } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import CarouselComp from "./carouselComponent";
import NavBar from "./navBar";
import useNavMenu from "./customHook/useNavMenu";
import NavExpand from "./navBarExpandable";
import FooterPage from "./Footer";
import FlocklerExpand from "./flocklerExpand";
import FlocklerPage from "./flockerComp"


const LandingPage = () => {

    const [category, handleCategory, isMenu, handleMenu] = useNavMenu()

    const [li_Header, setLiHeader] = useState([
        'Study', 'Research', 'Services for Business', 'Alumni', 'Giving', 'About'])

    const [popularSearch, setPopularSearch] = useState([
        'Biological,', 'Sciences,', 'Midwifery,', 'Geology,', 'Criminology,', 'Sociology,', 'Business'
    ])

    const [pageLinks, setPageLinks] = useState([
        { icon: <GiBookmark />, name: 'Order a prospectus' },
        { icon: <FaRegCalendarTimes />, name: 'Open days' },
        { icon: <MdArrowForwardIos />, name: 'Life at Oluyole' },
        { icon: <IoChatbubblesOutline />, name: 'Chat to our students' },
    ])

    const [study, setStudy] = useState(
        {
            h3: 'Study',
            p: 'A tailored education for the creators, discoverers and leaders of tomorrow.',
            p1: 'Undergraduate',
            p2: 'Postgraduate',
            p3: 'International students',
            p4: 'Distance learning'
        }

    )

    const [research, setReSearch] = useState(
        {
            h3: 'Research',
            p: 'Every day, world-changing research happens right here.',
            p1: 'Research expertise',
            p2: 'Research stories',
            p3: 'Research degrees',
            p4: 'Research institutes'
        }
    )

    const [schoolInfo, setSchoolInfo] = useState([
        {
            h3: `It's not too late to apply `,
            p: `World-class teaching and research-inspired learning. Apply now for September 2024`,
            image: './assets/notlateBanner.jpg'
        },
        {
            h3: `Get ready, get excited`,
            p: `View events to get you settled into life at Oluyole.`,
            image: './assets/getexcited.jpg'

        },
        {
            h3: `Complete the National Student Survey`,
            p: `Finalists: give your feedback to help to make improvements and to help prospective students choose where to study.`,
            image: './assets/viewsBanner.jpg'
        }
    ])

    const [otherArticle, setOtherA] = useState([
        {
            image: './assets/bannerOne.jpg',
            date: '18 Jan 2024',
            h4: 'University of Oluyole graduate- turned - diplomat returns to receive honorary award',
            p: 'A diplomat who used her degree as a springboard to a successful career has returned to the University of Oluyole to receive an Honorary Doctorate.'
        },
        {
            image: './assets/bannerTwo.jpg',
            date: '16 Jan 2024',
            h4: 'Primary school pupils graduate before University of Oluyole students',
            p: 'Primary school children stole a march on University of Oluyole students after graduating from the institution at the age of just 10 and 11.'
        },
        {
            image: './assets/bannerThree.jpg',
            date: '16 Jan 2024',
            h4: 'University awarded £14 million to expand research into lifestyle changes',
            p: 'More than £14 million has been awarded to The University of Oluyole to expand its research into the prevention and management of chronic disease...'
        },
        {
            image: './assets/bannerFour.jpg',
            date: '16 Jan 2024',
            h4: 'Major research investment into national land use transformation',
            p: 'University of Oluyole and The James Hutton Institute are co- leading a transdisciplinary hub looking to bridge the gap between science and policy...'
        }
    ])

    const [flockler, setflockler] = useState([
        { svg: <RiTwitterXLine />, p: '@uniofoluyole', image: './assets/flocklerBanner1.jpg', date: '06 Jan 2024', translate: '0' },
        { svg: <RiTwitterXLine />, p: '@uniofoluyole', image: './assets/schoolCamp1.jpg', date: '08 Jan 2024', translate: '300' },
        { svg: <FaFacebook />, image: './assets/flocklerBanner3.jpg', date: '09 Jan 2024', translate: '600' },
        { svg: <FaInstagram />, p: '@uniofoluyole', image: './assets/flocklerBanner4.jpg', date: '11 Jan 2024', translate: '900' }
    ])

    let [clicked, handleClicked] = useState()

    const [carouselSlide, setSlide] = useState([{
        image: './assets/homepageBanner.jpg',
        h4: 'Apply Now',
        h5: 'Join us in september 2024',
        b1: 'Apply Now',
        b2: 'Book a campus tour'
    },
    {
        image: './assets/schoolCamp3.jpg',
        h4: 'We are Gold!',
        h5: 'Oluyole recieves an overall Gold in Teaching Excellence Framework (TEF)2023',
        b1: 'Find out about our ranking',
    }])

    const [footerList, setFooter] = useState({
        'Site visitors': [
            'A - Z',
            'Accessibility',
            'Departments',
            ' Contact us',
            'Facts and figures',
            'Jobs'
        ],
        'Staff and students': [
            'Blackboard',
            'Library',
            'Remote Access',
            'Staff',
            'Students'
        ],
        'Find us': [
            'The University of Oluyole',
            'University Road',
            'Oluyole',
            'Ibadan',
            'Nigeria',

            'Campus map'
        ]
    })

    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const isClicked = document.querySelector('.top_section')
        const schoolPage = document.querySelector('.schoolBody')
        const bodyHidden = document.querySelector('body')
        if (clicked === 0 || clicked) {
            isClicked.classList.add('filterBrightness')
            schoolPage.classList.add('newsClicked')
            bodyHidden.style.overflow = 'hidden'
        } else {
            isClicked.classList.remove('filterBrightness')
            schoolPage.classList.remove('newsClicked')
            bodyHidden.style.overflow = 'auto'

        }
    }, [clicked])

    useEffect(() => {
        const schoolBody = document.querySelector('.main-content')
        const navBar_Header = document.querySelector('.navBar_Header')
        const handleClickOutside = () => {
            handleMenu(false);
            handleCategory(category)
        };

        schoolBody.addEventListener('click', handleClickOutside);
        navBar_Header.addEventListener('click', handleClickOutside);
        return () => {
            navBar_Header.removeEventListener('click', handleClickOutside);
            schoolBody.removeEventListener('click', handleClickOutside);
        };
    }, [isMenu]);

    useEffect(() => {
        const bodyHidden = document.querySelector('body')

        if (isMenu) {
            bodyHidden.style.overflow = 'hidden'
            handleCategory(category)
        } else {
            bodyHidden.style.overflow = 'auto'
        }
    }, [isMenu])

    useEffect(() => {

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prevScrollPos, windowWidth])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleScroll = () => {
        let navHead = document.querySelector('.navBar_Header');
        let currentScrollPos = window.pageYOffset;
        let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (prevScrollPos < currentScrollPos) {
            handleCategory(category);
            navHead.style.top = '-5rem';
        } else if (isMobile || window.innerWidth < 760) {
            navHead.style.top = '0';
        } else {
            navHead.style.top = '2rem';
        }

        setPrevScrollPos(currentScrollPos);
    };


    const handleNext = () => {
        handleClicked((prev) => (prev + 1) % flockler.length)
    }

    const handlePrev = () => {
        handleClicked((prev) => (prev - 1 + flockler.length) % flockler.length)
    }

    return (<Container fluid className="school_page">
        <NavExpand li_Header={li_Header}
            isMenu={isMenu}
            handleMenu={handleMenu}
        />

        <FlocklerExpand
            handleNext={handleNext}
            handlePrev={handlePrev}
            clicked={clicked}
            flockler={flockler}
            handleClicked={handleClicked}
        />

        <div className="schoolBody">
            <NavBar li_Header={li_Header}
                category={category}
                handleCategory={handleCategory}
                isMenu={isMenu}
                handleMenu={handleMenu}
            />

            <main className="main-content">
                <section className="main-section">
                    <CarouselComp carouselSlide={carouselSlide} />

                    <section className="subcontent-container">
                        <section className="search_section">
                            <div className="search_container">
                                <div className="search_wrapper">
                                    <div>
                                        <span><input placeholder="Search for a course" /></span>
                                        <span>
                                            <select>
                                                <option>All Courses</option>
                                                <option>Undergraduate 2024</option>
                                                <option>Undergraduate 2023</option>
                                                <option>Postgraduate</option>
                                                <option>Distance learning</option>
                                                <option>Foundation</option>
                                                <option>CPD</option>
                                            </select>
                                        </span>
                                    </div>

                                    <div>
                                        <button><span>Search</span> <span><HiArrowLongRight /></span></button>
                                    </div>

                                </div>
                                <div className="popular_search_container">
                                    <div className="popular_search_div">
                                        <p>Popular searches:</p>
                                        {popularSearch.map((link, index) => (
                                            <Link key={index}>{link}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="link_section">
                            <div className="page_link">
                                <div className="inner_link">
                                    <ul>
                                        {pageLinks.map((link, index) => (
                                            <li key={index}>
                                                <span>{link.icon}</span>
                                                <span><Link>{link.name}</Link></span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>


                        <section className="study_research_section">
                            <div className="study-section">
                                <div className="study_container">
                                    <div className="study_detail">
                                        <div className="study_list" >
                                            <h3>{study.h3}</h3>
                                            <p>{study.p}</p>
                                            <p><span>{study.p1}</span> <span><HiArrowLongRight /></span></p>
                                            <p><span>{study.p2}</span> <span><HiArrowLongRight /></span></p>
                                            <p><span>{study.p3}</span> <span><HiArrowLongRight /></span></p>
                                            <p><span>{study.p4}</span> <span><HiArrowLongRight /></span></p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="research-section">
                                <div className="research_container">
                                    <div className="research_detail">
                                        <div className="research_list" >
                                            <h3>{research.h3}</h3>
                                            <p>{research.p}</p>
                                            <p><span>{research.p1}</span> <span><HiArrowLongRight /></span></p>
                                            <p><span>{research.p2}</span> <span><HiArrowLongRight /></span></p>
                                            <p><span>{research.p3}</span> <span><HiArrowLongRight /></span></p>
                                            <p><span>{research.p4}</span> <span><HiArrowLongRight /></span></p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

                        <section className="school_information">
                            <div className="information_container">
                                <div className="information_inner">
                                    <ul>
                                        {schoolInfo.map((info, index) => (
                                            <li key={index}>
                                                <div className="infomation_pod">
                                                    <div className="information_image">
                                                        <img src={require(`${info.image}`)} />
                                                    </div>
                                                    <div className="infomation_detail">
                                                        <h3>{info.h3}</h3>
                                                        <p>{info.p}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="news_section">
                            <div className="news_container">
                                <div className="news_into_more">
                                    <div><h3>News</h3></div>
                                    <div><button><span>More news</span><span><HiArrowLongRight /></span></button></div>
                                </div>
                            </div>
                            <div className="article_container">
                                <div className="featured_posts">
                                    <Link>
                                        <div className="featured_image">
                                            <img src={require('./assets/featuredPicture.jpg')} />
                                        </div>
                                        <div className="featured_detail">
                                            <p> <time>18 Jan 2024</time></p>
                                            <h4>Naija's first space explorer is honoured by University of Oluyole</h4>
                                            <p>Naija's first astronaut has paid tribute to the University of Oluyole’s world class space research.
                                                <br></br><span><HiArrowLongRight /></span>
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="other_featured_posts">
                                    {otherArticle.map((other, index) => (
                                        <Link key={index}>
                                            <div className="article_image">
                                                <img src={require(`${other.image}`)} />
                                            </div>
                                            <div className="article_detail">
                                                <p><time>{other.date}</time></p>
                                                <h4>{other.h4}</h4>
                                                <p>{other.p}</p>
                                            </div>
                                        </Link>))}
                                </div>
                            </div>
                        </section>

                        <section className="flockler_media_news">
                            <div className="flockler_container">
                                <div>
                                    <h3>Our work in the news</h3>
                                </div>

                                <FlocklerPage
                                    handleClicked={handleClicked}
                                    flockler={flockler}
                                    handleNext={handleNext}
                                    handlePrev={handlePrev} />
                            </div>

                        </section>
                    </section>
                </section>

                <FooterPage footerList={footerList} />
            </main>
        </div>
    </Container >)
}
export default LandingPage