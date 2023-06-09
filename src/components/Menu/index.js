import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import ice from '../../img/ice1.png';
import ice2 from '../../img/ice2.png';
import ice3 from '../../img/ice3.png';
import ice4 from '../../img/ice4.png';
import ice5 from '../../img/ice5.png';
import ice6 from '../../img/ice6.png';
import line from "../../img/lineabout.svg"
import {MdSearch} from "react-icons/md";
import {AiOutlineCloseCircle} from "react-icons/ai";

const Menu = () => {
    const [activeMenu, setActiveMenu] = useState(0);
    const [desert, setDesert] = useState(0);
    const [tabs, setTabs] = useState([
        {
            title: 'Desserts',
            image: ice,
            name: "Ice Cream",
            description: "soda, cream, milk, sugar",
            price: "$9.11",
            h1: "Extras",
            h2: "Drinks",
            cherry: "Cherry",
            cola: "Cola Cola",
            coin: "$0.90"
        },
        {
            title: 'Hot Drinks',
            image: ice2,
        },
        {
            title: 'Cold Drinks',
            image: ice3,
        },
        {
            title: 'National Foods',
            image: ice4,
        },
        {
            title: 'Eastern cuisine',
            image: ice5,
        },
        {
            title: 'Fast foods',
            image: ice6,
        },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [removedCard, setRemovedCard] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const getDesert = (index) => {
        setDesert(index);
    };
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleTabClick = (index) => {
        setActiveMenu(index);
    };

    const handleCardClick = (index) => {
        if (windowWidth <= 320) {
            window.location.href = '/description';
        } else {
            setSelectedCardIndex(index);
            setRemovedCard(tabs[index]);
            setShowModal(true);
            setSelectedImage(tabs[index].image);
        }
    }

    const handleCancel = () => {
        setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs];
            updatedTabs[selectedCardIndex] = removedCard;
            return updatedTabs;
        });
        setShowModal(false);
        setSelectedCardIndex(null);
    };

    return (
        <div id="menu">
            <div className="menu">
                <div className="search">
                    <div className="search--full">
                        <div className="search--full__title">
                            <img src={line} alt="img"/>
                            <h1>Menu</h1>
                        </div>
                        <button><MdSearch/></button>
                    </div>
                </div>
                <ul className="menu--list">
                    {tabs.map((tab, index) => (
                        <li key={index}>
                            <NavLink to="/menu">
                                <center>
                                    <button
                                        className={`menu--list__link ${activeMenu === index ? 'active' : ''}`}
                                        onClick={() => handleTabClick(index)}
                                    >
                                        {tab.title}
                                        <div className={`line ${activeMenu === index ? 'activate' : ''}`}/>
                                    </button>
                                </center>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="menu--content">
                    {showModal && (
                        <div className="modal">
                            <div className="modal--button cancel-button" onClick={handleCancel}>
                               <AiOutlineCloseCircle/>
                            </div>
                            <div className="modal__content">
                                <div className="modal__content__column">
                                    {selectedImage && <img src={selectedImage} alt="Selected Image"/>}
                                    {
                                        tabs.map((tab) => (
                                            <div className="modal__content__column__open">
                                                <div className="modal__content__column__open__name">
                                                    <h1>{tab.name}</h1>
                                                    <h4>{tab.description}</h4>
                                                </div>
                                                <p>{tab.price}</p>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="modal__content__actions">
                                    {
                                        tabs.map((tab) => (
                                            <div>

                                                <div className="modal__content__actions__price">
                                                    <div className="modal__content__actions__price__cafe">
                                                        <h1>{tab.h1}</h1>
                                                        <div className="modal__content__actions__price__cafe__cherry">
                                                            <p>{tab.cherry}</p>
                                                            <p>{tab.coin}</p>
                                                        </div>
                                                        <div className="modal__content__actions__price__cafe__cherry">
                                                            <p>{tab.cherry}</p>
                                                            <p>{tab.coin}</p>
                                                        </div>

                                                    </div>
                                                    <div className="modal__content__actions__price__cafe">
                                                        <h1>{tab.h2}</h1>
                                                        <div className="modal__content__actions__price__cafe__cola">
                                                            <p>{tab.cola}</p>
                                                            <p>{tab.coin}</p>
                                                        </div>
                                                        <div className="modal__content__actions__price__cafe__cola">
                                                            <p>{tab.cola}</p>
                                                            <p>{tab.coin}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    <div style={{
                        display: showModal === true ? "block" : "none"
                    }} className={showModal === true ? "ground" : ''}></div>
                    <h1 className="similar" style={{
                        display: showModal === true ? "block" : "none"
                    }}>Similar gueries</h1>
                    {tabs.map((tab, index) => (
                        <div key={index}>

                            {selectedCardIndex === index && showModal ? null : (
                                <div className="card">
                                    <div
                                        className={`some-div ${windowWidth <= 320 ? 'block' : ''}`}
                                    >
                                        {/* content */}
                                    </div>
                                    <button
                                        className={`card--click ${desert === index ? 'desert' : ''}`}
                                        onClick={() => getDesert(index)}
                                    >
                                        <img onClick={() => handleCardClick(index)} src={tab.image}
                                             alt=""/>
                                    </button>
                                    {
                                        tabs.slice(0, 1).map((tab) => (
                                            <div className="card--text">
                                                <div className="card--text__ice">
                                                    <h1>{tab.name}</h1>
                                                    <h4>{tab.description}</h4>
                                                </div>
                                                <p>{tab.price}</p>
                                            </div>
                                        ))
                                    }


                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
