import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoMdPause } from "react-icons/io";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { HiArrowLongRight } from "react-icons/hi2";

const CarouselComp = ({ carouselSlide }) => {


    let [currentSlide, setCurrSlide] = useState(0)
    let [isPause, handlePause] = useState(false)

    useEffect(() => {
        if (!isPause) return
        const intervalTime = setInterval(handleNextSlide, 10000)
        return () => { clearInterval(intervalTime) }
    }, [isPause])

    const handlePrevSlide = () => {
        setCurrSlide((prev) => (prev - 1 + carouselSlide.length) % carouselSlide.length)
    }

    const handleNextSlide = () => {
        setCurrSlide((prev) => (prev + 1) % carouselSlide.length)
    }

    return (
        <section className="carosel-section bg-white">
            <div className="carousel-container">
                <div className="inner-carousel">
                    {carouselSlide.map((carousel, index) => (
                        <div className={`carousel-item ${index === currentSlide ? 'active' : ''}`} key={index}>
                            <div className="carousel_image">
                                <img src={require(`${carousel.image}`)} />
                            </div>
                            <div className="carousel_information">
                                <div className="carousel_detail">
                                    <div>
                                        <h4>{carousel.h4}</h4>
                                        <p>{carousel.h5}</p>
                                        <div className="carousel_btn_div">
                                            <button><span>{carousel.b1}</span><span><HiArrowLongRight /></span></button>
                                            {carousel.b2 && <button><span>{carousel.b2}</span><span><HiArrowLongRight /></span></button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="carousel_control">
                    <div className="button_div">
                        <button onClick={() => handlePrevSlide()}><MdOutlineArrowBackIos /></button>
                        <button onClick={() => handlePause(!isPause)}>{!isPause ? <FaPlay /> : <IoMdPause />}</button>
                        <button onClick={() => handleNextSlide()}><MdOutlineArrowBackIos /></button>
                    </div>
                    <div className="pagination">
                        {carouselSlide.map((carousel, index) => (
                            <span onClick={() => setCurrSlide(index)} key={index} className={index === currentSlide ? 'active' : ''}>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}
export default CarouselComp