import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialCarousel = () => {
  const settings = {
    autoplay: true,
    speed: 1000,
    centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="testimonial-carousel">
      <div className="testimonial-item bg-transparent border rounded p-4">
        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
        <p>
          Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet
          amet eirmod eos labore diam
        </p>
        <div className="d-flex align-items-center">
          <img
            className="img-fluid flex-shrink-0 rounded-circle"
            src="img/testimonial-1.jpg"
            style={{ width: "50px", height: "50px" }}
            alt="demo"
          />
          <div className="ps-3">
            <h5 className="mb-1">Client Name</h5>
            <small>Profession</small>
          </div>
        </div>
      </div>
      <div className="testimonial-item bg-transparent border rounded p-4">
        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
        <p>
          Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet
          amet eirmod eos labore diam
        </p>
        <div className="d-flex align-items-center">
          <img
            className="img-fluid flex-shrink-0 rounded-circle"
            src="img/testimonial-2.jpg"
            style={{ width: "50px", height: "50px" }}
            alt="demo"
          />
          <div className="ps-3">
            <h5 className="mb-1">Client Name</h5>
            <small>Profession</small>
          </div>
        </div>
      </div>
      <div className="testimonial-item bg-transparent border rounded p-4">
        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
        <p>
          Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet
          amet eirmod eos labore diam
        </p>
        <div className="d-flex align-items-center">
          <img
            className="img-fluid flex-shrink-0 rounded-circle"
            src="img/testimonial-3.jpg"
            style={{ width: "50px", height: "50px" }}
            alt="demo"
          />
          <div className="ps-3">
            <h5 className="mb-1">Client Name</h5>
            <small>Profession</small>
          </div>
        </div>
      </div>
      <div className="testimonial-item bg-transparent border rounded p-4">
        <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
        <p>
          Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet
          amet eirmod eos labore diam
        </p>
        <div className="d-flex align-items-center">
          <img
            className="img-fluid flex-shrink-0 rounded-circle"
            src="img/testimonial-4.jpg"
            style={{ width: "50px", height: "50px" }}
            alt="demo"
          />
          <div className="ps-3">
            <h5 className="mb-1">Client Name</h5>
            <small>Profession</small>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialCarousel;
