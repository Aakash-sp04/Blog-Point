import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div>
      <Navbar />

      <div className='big-img'>
        <img src='/images/about.jpg' alt="composeImg"/>
      </div>

      <div className="content-on-image">
        <h1>About me!</h1>
        <p>Who I am & What I do ?</p>
      </div>

      <div className="container-fluid" id="post">
        <div className="row me-0 ms-0">
          <div className="col-lg-4 col-sm-12 intro">
            <div className="row my-3">
              <h3>Hi! I'm Aakash Pachchigar.</h3>
            </div>
            <div className="row justify-content-center ">
              <img src="/images/myphoto01.jpg" className="rounded-circle" alt="myphoto" />
            </div>
          </div>

          <div className="col-lg-8 col-sm-12 mt-5">
            <div className="row px-2 mb-4 para-content">
              <h4>Who am I ?</h4>
              <p className="fst-italic">
                I am a B.Tech(Information Technology) under-graduate student from India.
                Since, some months I started writing blogs.
              </p>
              {/* <hr> */}
            </div>

            <div className="row px-2 mb-4 para-content">
              <h4>What you get here ?</h4>
              <p className="fst-italic">
                As being keen interest in reading blogs I decided why not to start write them &
                express my own thoughs & point of view on limelight topics.
                Here, you will find blogs on recent incidents, new technology trends,
                spiritual talks and on personal well-being. Hope you like to explore through my blog site !
              </p>
              {/* <hr> */}
            </div>

            <div className="row px-2 mb-0 para-content">
              <h4>What is my mission ?</h4>
              <p className="fst-italic">
                As being a new to blogging right now I am now only expressing my throughs & views in my blogs.
                My mission is to develop a blogging site through which people can express their throughs & views on
                a topic they want, express their stories to inspire other people and to provide
                knowledge of their field & topics which are familiar to them. I want my blog site to be the dominant platform for this.
                Hope you like my mission & consider it in direction of mankind !
              </p>
              {/* <hr> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
