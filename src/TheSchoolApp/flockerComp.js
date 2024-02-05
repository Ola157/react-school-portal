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
    let [inner_Width, setWidth] = useState(0)
    let [prevWidth, setPrevWidth] = useState()
    const flocklerActive = document.querySelector('.flockler_detail_list.active')

    useEffect(() => {
        const handleFlocklerBtn = () => {
            const containerWidth = flockerRef.current.offsetWidth;

            const totalItemsWidth = flockerRef.current.scrollWidth;

            // if (inner_Width < 388) {
            //     const translateXValue = (containerWidth - 300) - 32;
            //     flocklerActive.style.transform = `translateX(${translateXValue}px)`;
            // } else {
            //     flocklerActive.style.transform = `translateX(${0}px)`;
            // }
            console.log(totalItemsWidth, containerWidth)
            if (inner_Width < 709) {
                // const translateXValue = (containerWidth - 600) - 32
                // flockerRef.current.style.transform = `translateX(${35}px)`;

            } else if (inner_Width < 768) {
                const translateXValue = (containerWidth - 600) - 32
                flockerRef.current.style.transform = `translateX(${translateXValue}px)`;

            } else if (inner_Width < 1020) {
                const translateXValue = Math.max(totalItemsWidth - containerWidth, 0);
                flockerRef.current.style.transform = `translateX(${translateXValue}px)`;
            } else {
                flockerRef.current.style.transform = `translateX(0px)`;
            }

            setPrevWidth(inner_Width);
        };

        handleFlocklerBtn();
    }, [inner_Width]);

    useEffect(() => {
        const handleScreenWidth = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleScreenWidth)

        return () => {
            window.removeEventListener('resize', handleScreenWidth)
        }
    }, [])


    const handlePrevSlide = () => {
        setCurrSlide((prev) => (prev - 1 + flockler.length) % flockler.length)

        let flocklerList = document.querySelectorAll('.flockler_detail .flockler_detail_list')
        flocklerList.forEach((soc, index) => {
            if (index == currSlide) {
                soc.style.animation = 'translateRev 2500ms forwards '
            } else if (index == (currSlide - 1 + flockler.length) % flockler.length) {
                soc.style.animation = 'translateOneRev 2500ms forwards '
            } else if (index == (currSlide - 2 + flockler.length) % flockler.length) {
                soc.style.animation = 'translateTwoRev 2500ms forwards '
            } else if (index == (currSlide - 3 + flockler.length) % flockler.length) {
                soc.style.animation = 'translateThreeRev 2500ms forwards '
            }
        })
    }

    const handleNextSlide = () => {
        setCurrSlide((prev) => (prev + 1) % flockler.length)
        let flocklerList = document.querySelectorAll('.flockler_detail .flockler_detail_list')
        flocklerList.forEach((soc, index) => {
            if (index == currSlide) {
                soc.style.animation = 'translate 2500ms forwards '
            } else if (index == (currSlide + 1) % flockler.length) {
                soc.style.animation = 'translateOne 2500ms forwards '
            } else if (index == (currSlide + 2) % flockler.length) {
                soc.style.animation = 'translateTwo 2500ms forwards '
            } else if (index == (currSlide + 3) % flockler.length) {
                soc.style.animation = 'translateThree 2500ms forwards '
            }
        })
    }

    return (
        <div className="flockler_detail">
            <div className="smallscreencontrol">
                <button ref={prevBtn} onClick={() => handlePrevSlide()}><MdOutlineArrowBackIos /></button>
                <button ref={nextBtn} onClick={() => handleNextSlide()}><MdOutlineArrowForwardIos /></button>
            </div>
            <div className="flocker_section" >
                <div className="inner-flocker" ref={flockerRef}>
                    <ul>
                        {flockler.map((soc, index) => (
                            <li key={index} className={`flockler_detail_list ${currSlide === index ? 'active' : ''}`}>
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