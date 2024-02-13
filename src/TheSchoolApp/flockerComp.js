import React, { useEffect, useRef, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";

const FlocklerPage = ({
    flockler,
    handleClicked,
}) => {

    const flockerRef = useRef(null)
    const prevBtn = useRef(null)
    const nextBtn = useRef(null)
    let [currSlide, setCurrSlide] = useState(0)
    let [inner_Width, setWidth] = useState(window.innerWidth)
    let [translated, setTranslated] = useState(false)

    useEffect(() => {

        handleFlockler();
    }, [inner_Width]);

    useEffect(() => {

        if (inner_Width < 1300) {
            nextBtn.current.style.display = 'block'
        }

    }, [inner_Width])

    useEffect(() => {
        const handleScreenWidth = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleScreenWidth)

        return () => {
            window.removeEventListener('resize', handleScreenWidth)
        }
    }, [])

    const handleFlockler = () => {
        const flocklerRectWidth = flockerRef.current.getBoundingClientRect().width
        let translateX;

        if (inner_Width < 655) {
            prevBtn.current.style.display = 'block'
            translateX = flocklerRectWidth - 300
            translateX = translateX / 2
            flockerRef.current.style.transform = `translateX(${translateX}px)`;

        } else if (inner_Width < 1020 && inner_Width > 655) {

            prevBtn.current.style.display = 'block'
            translateX = flocklerRectWidth - 600
            translateX = translateX / 2
            flockerRef.current.style.transform = `translateX(${translateX}px)`;

        } else {
            prevBtn.current.style.display = 'none'
            nextBtn.current.style.display = 'none'
            flockerRef.current.style.transform = `translateX(0px)`;

        }

    };

    const handlePrevSlide = () => {
        let flockList = document.querySelectorAll('.flockler__list')
        const flocklerRectWidth = flockerRef.current.getBoundingClientRect().width
        let translateX

        if (inner_Width < 1300 && inner_Width > 1020) {

            flockerRef.current.style.transform = `translateX(${0}px)`;
            nextBtn.current.style.display = 'block'
            prevBtn.current.style.display = 'none'

        } else if (inner_Width < 1020 && inner_Width > 655) {
            translateX = 900 - flocklerRectWidth
            flockerRef.current.style.transform = `translateX(-${translateX}px)`;
            nextBtn.current.style.display = 'block'
            prevBtn.current.style.display = 'none'
        }
        else if (inner_Width < 655) {

            setCurrSlide((prev) => (prev - 1 + flockler.length) % flockler.length)
            flockList.forEach((soc, index) => {
                if (index == currSlide) {
                    soc.style.animation = 'translate0Rev 500ms forwards '
                } else if (index == (currSlide - 1 + flockler.length) % flockler.length) {
                    soc.style.animation = 'translate1Rev 500ms forwards '
                } else if (index == (currSlide - 2 + flockler.length) % flockler.length) {
                    soc.style.animation = 'translate2Rev 500ms forwards '
                } else if (index == (currSlide - 3 + flockler.length) % flockler.length) {
                    soc.style.animation = 'translate3Rev 500ms forwards '
                }
            })
        }
    }

    const handleNextSlide = () => {

        const flocklerRectWidth = flockerRef.current.getBoundingClientRect().width
        let flockList = document.querySelectorAll('.flockler__list')

        let translateX

        if (inner_Width < 1300) {
            translateX = 1200 - flocklerRectWidth

            if (inner_Width < 1300 && inner_Width > 1020) {

                flockerRef.current.style.transform = `translateX(-${translateX}px)`;
                nextBtn.current.style.display = 'none'
                prevBtn.current.style.display = 'block'
            }

            else if (inner_Width < 1020 && inner_Width > 655) {
                translateX = flocklerRectWidth - 600
                flockerRef.current.style.transform = `translateX(${translateX + 300 - translateX}px)`;
                nextBtn.current.style.display = 'none'
                prevBtn.current.style.display = 'block'
            }
            else if (inner_Width < 655) {
                setCurrSlide((prev) => (prev + 1) % flockler.length)

                flockList.forEach((soc, index) => {
                    if (index == currSlide) {
                        soc.style.animation = 'translate0 500ms forwards'
                    } else if (index == (currSlide + 1) % flockler.length) {
                        soc.style.animation = 'translate1 500ms forwards'
                    } else if (index == (currSlide + 2) % flockler.length) {
                        soc.style.animation = 'translate2 500ms forwards'
                    } else if (index == (currSlide + 3) % flockler.length) {
                        soc.style.animation = 'translate3 500ms forwards'
                    }
                })

            }

        }

    }

    const doubleTranslate = (getValueFn, interval = 100) => {
        return new Promise((resolve) => {
            // let currentValue = getValueFn();
            const checkDecrease = () => {
                const newValue = getValueFn();
                // console.log(newValue)

                if (newValue < -252) {
                    console.log(newValue)
                    resolve();
                } else {
                    // currentValue = newValue;
                    setTimeout(checkDecrease, interval);
                }
            };
            checkDecrease();
        });
    }

    const checkWidth = (getValueFn, translateX, interval = 100) => {
        return new Promise((resolve) => {
            // let currentValue = getValueFn();
            const checkDecrease = () => {
                const newValue = getValueFn().left;
                console.log(newValue)

                if (newValue < -970) {
                    console.log(newValue)
                    resolve();
                } else {
                    // currentValue = newValue;
                    setTimeout(checkDecrease, interval);
                }
            };
            checkDecrease();
        });
    }

    return (
        <div className="flockler_detail">
            <div className="flockler_control">
                <button ref={prevBtn} onClick={() => handlePrevSlide()}><MdOutlineArrowBackIos /></button>
                <button ref={nextBtn} onClick={() => handleNextSlide()}><MdOutlineArrowForwardIos /></button>
            </div>
            <div className="flocker_section" >
                <div className="inner-flocker" ref={flockerRef}>
                    <ul>
                        {flockler.map((soc, index) => (
                            <li
                                key={index} className={`flockler__list ${currSlide === index ? 'active' : ''} `}>
                                <div>
                                    <div className="flockler_pod">
                                        <div className="flockler_log_id">
                                            <div>
                                                <span className="uni_logo"> <FaUniversity /></span>
                                                <span>
                                                    <h5>University of Oluyole</h5>
                                                    {soc.p && <p>{soc.p}</p>}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            {soc.svg}
                                        </div>
                                    </div>

                                    <div className="image_container" onClick={() => handleClicked(index)}>
                                        <img src={require(`${soc.image}`)} />
                                        <span><FaExpandArrowsAlt /></span>
                                    </div>

                                    <div className="date_container">
                                        <span><MdOutlineAccessTime /></span><span>{soc.date}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FlocklerPage