import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* Footer Start */}
      <div
        className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Company
              </h4>
              <Link className="btn btn-link" href="#">
                About Us
              </Link>
              <Link className="btn btn-link" href="#">
                Contact Us
              </Link>
              <Link className="btn btn-link" href="#">
                Reservation
              </Link>
              <Link className="btn btn-link" href="#">
                Privacy Policy
              </Link>
              <Link className="btn btn-link" href="#">
                Terms & Condition
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Contact
              </h4>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3"></i>123 Street, New
                York, USA
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3"></i>+012 345 67890
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>info@example.com
              </p>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" href="#">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" href="#">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" href="#">
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link className="btn btn-outline-light btn-social" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Opening
              </h4>
              <h5 className="text-light fw-normal">Monday - Saturday</h5>
              <p>09AM - 09PM</p>
              <h5 className="text-light fw-normal">Sunday</h5>
              <p>10AM - 08PM</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="section-title ff-secondary text-start text-primary fw-normal mb-4">
                Newsletter
              </h4>
              <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                &copy;{" "}
                <Link className="border-bottom" href="#">
                  Your Site Name
                </Link>
                , All Right Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <Link href="#">Home</Link>
                  <Link href="#">Cookies</Link>
                  <Link href="#">Help</Link>
                  <Link href="#">FQAs</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

      {/*} Back to Top */}
      <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </Link>
    </div>
  );
};

export default Footer;
