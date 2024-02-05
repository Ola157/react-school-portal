import React from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";

const FlocklerExpand = ({
    handleClicked,
    handlePrev,
    handleNext,
    flockler,
    clicked }) => {

    return (
        <section className="top_section">
            <div className="flockler_fullscreen">

                <div className="smallscreencontrol">
                    <button onClick={() => handlePrev()}><span><MdOutlineArrowBackIos /></span><span>PREVIOUS</span></button>
                    <button onClick={() => handleNext()}><span>NEXT</span><span><MdOutlineArrowForwardIos /></span></button>
                </div>

                <div className="flockler-control">
                    <button onClick={() => handlePrev()}><MdOutlineArrowBackIos /></button>
                    <button onClick={() => handleNext()}><MdOutlineArrowForwardIos /></button>
                </div>

                <ul>
                    {flockler.map((soc, index) => (
                        <li key={index} className={`flockler_detail_list ${index === clicked ? 'active' : ''}`}>
                            <div>
                                <div className="image_container" onClick={() => handleClicked(index)}>
                                    <img src={require(`${soc.image}`)} />
                                </div>

                                <div className="flockler_pod_date_container">
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

                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut libero urna. I
                                        nteger mauris diam, fermentum et massa vel, suscipit suscipit libero.
                                        Phasellus quis arcu vel felis imperdiet facilisis. Cras sollicitudin arcu
                                        in efficitur semper. Sed aliquam dolor vel ornare mollis. Donec vitae gravida justo.
                                        Integer massa dolor, consequat laoreet leo vitae, ultricies consectetur nisl.
                                        Aliquam sit amet augue non augue pharetra auctor vel at magna.
                                    </p>

                                    <div>
                                        <span><MdOutlineAccessTime /></span><span>{soc.date}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* <div className="slideClickTwo"></div> */}
            </div>
            <div><button onClick={() => handleClicked(false)}><RxCross2 /></button></div>
        </section>
    )
}

export default FlocklerExpand