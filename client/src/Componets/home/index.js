import { FaCircle } from 'react-icons/fa';
import { SlArrowRightCircle } from "react-icons/sl";
import "./index.css"

const Home = () => {
  return <div className="homepage-container">
    {/* Header Section */}

    {/* Image Slider Section */}
    <div className="image-slider">
      <div className="slider-image image-1"></div>
      <div className="slider-image image-2"></div>
      <div className="slider-image image-3"></div>
    </div>
    <div className="home-container">
      {/* Who are we? Section */}
      <div id="aboutUs" className="card">
        <div className="card-left">
          <img className="card-image" src="images/pexels-kindelmedia-7688161-2048x1536.jpg" alt="Who are we?" />
        </div>
        <div className="card-right">
          <h2 className="card-heading">Who are we?</h2>
          <p className="card-content">
            Originally Shruthi Vasudevan conceived this idea and subsequently assembled a team of volunteers to form this Non-Profit Organization: School of Science and Ancient Literature. The purpose is to excavate the science and technology embedded in ancient literature and educate the present/upcoming generation. We are determined to transform our society into one with knowledge as its base. For this reason, our teachers/researchers hold doctorates in both literature and Science/Engineering. We welcome everyone to join hands with us anytime; we are always open to feedback and suggestions!
          </p>
        </div>
      </div>

      {/* What do we do? Section */}
      <h2 className="card-heading">What do we do?</h2>
      <div className='home-whatdo-container'>
        <div className="card">

          <div className="card-right">
            <p className="card-content">
              <span className="card-dot">
                <FaCircle />
              </span>
              We teach Ancient languages (as of today only Tamil) to kids and adults via a live instructor-led online learning portal.
            </p>
          </div>

        </div>
        <div className="card">

          <div className="card-right">
            <p className="card-content">
              <span className="card-dot">
                <FaCircle />
              </span>
              We follow the Tamil Nadu state board syllabus and our Seal of Biliteracy program to get the Seal of Biliteracy in Tamil.
            </p>
          </div>

        </div>
        <div className="card">
          <div className="card-right">
            <p className="card-content">
              <span className="card-dot">
                <FaCircle />
              </span>
              We teach our students how to read literature and understand the science embedded in ancient Tamil books like:
              <div className='home-text-container'>
                <SlArrowRightCircle />
                <p>Tirumandiram - written by Thirumoolar</p>
              </div>
              <div className='home-text-container'>
                <SlArrowRightCircle />
                <p>Thiruvasagam - written by Manikkavasakar</p>
              </div>
              <div className='home-text-container'>
                <SlArrowRightCircle />
                <p>Gnana vettiyan - written by Thiruvalluvar</p>
              </div>
              <div className='home-text-container'>
                <SlArrowRightCircle />
                <p>Subramaniyar gnanam - written by Lord Subramaniyar</p>
              </div>
              <div className='home-text-container'>
                <SlArrowRightCircle />
                <p>Bogar 700 - written by Bogar</p>
              </div>
              <div className='home-text-container'>
                <SlArrowRightCircle />
                <p>and many more…</p>
              </div>
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-right">
            <p className="card-content">
              <span className="card-dot">
                <FaCircle />
              </span>At FREE of cost, our teachers will guide our students right from the beginning until they acquire a PhD in Science/Engineering/Literature. Our teachers are eligible to be PhD guides for our students and do a tremendously good job at it.We teach Ancient languages (as of today only Tamil) to kids and adults via a live instructor-led online learning portal.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-right">
            <p className="card-content">
              <span className="card-dot">
                <FaCircle />
              </span>
              We help our students to do their school science projects based on our Tamil literature at FREE of cost.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-right">
            <p className="card-content">
              <span className="card-dot">
                <FaCircle />
              </span>
              FREE lifetime membership
            </p>
          </div>
        </div>
      </div>
      <div className="parallax-section">
        <div className="overlay">
          <div className="content">
            <h2>Why do we do it?</h2>
            <p>
              We delve into the science and technology found in our ancient
              literature to guide our society toward becoming a knowledge-based
              community.
            </p>
          </div>
        </div>
      </div>
      <h2 className="card-heading">Our Testimonials</h2>

      <div className="youtube-grid">
        {/* Video 1 */}
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/4vSNSPBbCqk"
            title="YouTube Video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video 2 */}
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/5eImFLgh6WE"
            title="YouTube Video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video 3 */}
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/XxV4EOd1JZ4"
            title="YouTube Video 3"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
}

export default Home