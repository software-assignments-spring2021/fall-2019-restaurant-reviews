import React from 'react';
import './vendor/bootstrap/css/bootstrap.min.css';
import './css/one-page-wonder.min.css';
import { Link } from 'react-router-dom';


const Landing = () =>{
    return(
    <div className="Landing">
          <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container">
            <a className="navbar-brand" href="index.html">Restaurant Review Agregator</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  {/*<Router>
                    <Route path="/" exact component={signUp} >
                  </Router>*/}
                  <a className="nav-link" href="signup.html">Sign Up</a>
                </li>
                <li className="nav-item">
                  {/*<Router>
                    <Route path="/edit/:id" component={login} />
                  </Router>*/}
                  <a className="nav-link" href="login.html">Log In</a>
                </li>
                <li className="nav-item">
                  {/*<Router>
                    <Route path="/userpage" component={UserPage} />
                  </Router>*/}
                  <Link className="nav-link" to="/userpage">My User Page</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

   
        <header className="masthead text-center text-white">
        <div className="masthead-content">
            <div className="container">
            <h2 className="masthead-subheading mb-0">Give Your Tastebuds a Treat</h2>
                <h2 className="masthead-subheading mb-0">Everyone Eats</h2>
                <a href="/restaurant" className="btn btn-primary btn-xl rounded-pill mt-5">Search</a>
            </div>
        </div>
        <div className="bg-circle-1 bg-circle"></div>
        <div className="bg-circle-2 bg-circle"></div>
        <div className="bg-circle-3 bg-circle"></div>
        <div className="bg-circle-4 bg-circle"></div>
        </header>
        
            
            

  

        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                    <img className="img-fluid rounded-circle" src={require("./img/food1.jpeg")} alt="" />
                    </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                  <h2 className="display-4">Find the Best!</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="p-5">
                    <img className="img-fluid rounded-circle" src={require("./img/food2.jpeg")} alt="" />
                    </div>
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <h2 className="display-4">For those who want the best!</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                    <img className="img-fluid rounded-circle" src={require("./img/food3.jpeg")} alt=""/>
                    </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                  <h2 className="display-4">Food Food Food!</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-5 bg-black">
          <div className="container">
            <p className="m-0 text-center text-white small"><a className="nav-link" href="https://github.com/nyu-software-engineering/fall-2019-restaurant-reviews">Contact The Team</a></p>
          </div>
        </footer>

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      </div>
    )
};

export default Landing;