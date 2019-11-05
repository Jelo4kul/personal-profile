import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './containers/Homepage/Homepage';
import DropDown from './components/DropDown/DropDown';
import Contact from './containers/Contact/WebContact/Contact';
import Portfolio from './containers/Portfolios/Portfolio/Portfolio'
import Layout from './containers/Layout/Layout';
import Layout2 from './containers/Layout/Layout copy';
import { BrowserRouter, Route } from 'react-router-dom';

import navDefaultIcon from './assets/navIcon.svg';
import navCloseIcon from './assets/close.svg';
import classes from './App.css'
import { Spring, config } from 'react-spring/renderprops';
import MobileContact from './containers/Contact/MobileContact/MobileContact';


class App extends React.Component {

  state = {
    mobileView: false,
    navBarShown: true,
    dropDownActive: false,
    initiateDropDown: false,
    initiateContact: false,
    hovered: false,
    contactActive: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  };

  resize = () => {
    const width = Math.min( window.innerWidth,  document.documentElement.clientWidth )
    if (width < 400)
      this.setState({ mobileView: true })
    else
      this.setState({ mobileView: false })
  };

  dropDownHandler = () => {
    this.setState({ dropDownActive: !this.state.dropDownActive, initiateDropDown: true })
  }

  initiateContact = () => {
    this.setState({ initiateContact: true, contactActive: true })
  }


  setHover = () => {
    this.setState({ hovered: true })
  };

  cancelHover = () => {
    this.setState({ hovered: false })
  };

  render() {

    let image = <img style={{ position: 'absolute' }} className={classes.navIcon} src={navDefaultIcon} alt="navIcon" />
    if (this.state.dropDownActive) {
      image = <img style={{ position: 'absolute' }} className={classes.navIcon} src={navCloseIcon} alt="navIcon" />
    }

    let navBar = null;
    navBar = (
      <div onMouseOver={this.setHover} onMouseOut={this.cancelHover}>
        <div onClick={this.dropDownHandler} className={classes.navBar}>
          {image}
        </div>
        <div className={classes.navBarMask} style={{ overflow: 'hidden' }}>
          <Spring to={{ transform: this.state.hovered ? "translateY(-3%)" : "translateY(100%)" }}>
            {props => (
              <div style={{ ...props, backgroundColor: '#35343A' }} onClick={this.dropDownHandler} className={classes.innerNavBar}>
                {image}
              </div>
            )}
          </Spring>
        </div>
      </div>
    )

    return (
      <BrowserRouter>
        <div className={classes.App}>
          {navBar}

          {this.state.initiateDropDown ?
            <DropDown
              dropDownHandler={this.dropDownHandler}
              initiateContact={this.initiateContact}
              dropDownActive={this.state.dropDownActive}
            /> : null}
          <Route path="/" exact render={(props) => <Layout mobileView={this.state.mobileView} {...props} />} />
          <Route path="/contact" exact render={(props) => <Contact mobileView={this.state.mobileView} {...props} />} />
          <Route path="/portfolio/:id" 
                 exact 
                 render={({match, location, history}) => 
                            <Portfolio mobileView={this.state.mobileView} match={match} location={location} history={history}/>} />

          {this.state.initiateContact ?
            <Contact
              contactActive={this.state.contactActive} /> : null}
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
