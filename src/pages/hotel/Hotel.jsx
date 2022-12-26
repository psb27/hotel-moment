import React, { useState } from 'react';
import "./hotel.css";

import Navbar from "./../../components/navbar/Navbar";
import Header from "./../../components/header/Header";
import MailList from "./../../components/mailList/MailList";
import Footer from "./../../components/footer/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCircleArrowLeft, faCircleArrowRight, faCircleXmark } from '@fortawesome/free-solid-svg-icons';


const Hotel = () => {

  const [slideIndex, setSlideIndex] = useState(0);
  const [slideOpen, setSlideOpen] = useState(false);


  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (index) => {
    setSlideIndex(index);
    setSlideOpen(true);
   }

   // changing the index of images for the slider
   const handleMove = (direction) => {
      let newSliderIndex;

      if(direction === "l") {

        newSliderIndex = slideIndex === 0 ? 5 : slideIndex - 1;

      } else {

        newSliderIndex = slideIndex === 5 ? 0 : slideIndex + 1;

      }

      setSlideIndex(newSliderIndex);
   }

  return (
    <div>
      <Navbar />
      <Header type="list"/>
      <div className="hotelContainer">
       {slideOpen &&  <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="closeBtn" onClick={() => setSlideOpen(false)}/>
          <FontAwesomeIcon icon={faCircleArrowLeft} className="prevBtn arrow" onClick={() => handleMove("l")}/>
          <div className="sliderWrapper">
            <img src={photos[slideIndex].src} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="nextBtn arrow" onClick={() => handleMove("r")}/>
        </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">
            Grand Hotel
          </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New York</span>
          </div>
          <span className="hotelDistance">Excellent location 500m from the center</span>
          <span className="hotelPriceHighlight">
            Book a stay over $123 at this property and get free airort taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, index) => (
              <div className="hotelImageWrapper">
                <img onClick={() => handleOpen(index)} src={photo.src} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of Mumbai</h1>
              <p className="hotelDesc">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Aspernatur amet molestias earum, nobis quo quisquam sapiente 
                culpa praesentium reprehenderit iure, harum quaerat laudantium quasi 
                nemo, maxime consequuntur soluta tempora 
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                Aspernatur amet molestias earum, nobis quo quisquam sapiente 
                culpa praesentium reprehenderit iure, harum quaerat laudantium quasi 
                nemo, maxime consequuntur soluta tempora 
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for 10 day stay</h1>
              <span>Located in the real heart of Mumbai, this property has
                an excellent location score at 9.8
              </span>
              <h2>
                <b>$945</b> (10 nights)
              </h2>
              <button>Reserve or book now</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Hotel