import React, { Component } from 'react';
import Auxiliary from '../../components/Auxiliary';
import { Spring, config } from 'react-spring/renderprops';
import Homepage from '../Homepage/Homepage'
import DropDown from '../../components/DropDown/DropDown';

import classes from './Layout.css';
import navDefaultIcon from '../../assets/navIcon.svg';
import navCloseIcon from '../../assets/close.svg';
import portfolioImage from '../../assets/portfolioImage.svg';
import portfolio2 from '../../assets/portfolio2.svg';
import portfolio3 from '../../assets/portfolio3.svg';
import Portfolios from '../Portfolios/Portfolios';
import Contact from '../Contact/WebContact/Contact';

class Layout2 extends Component {

    homepageRef = React.createRef();
    portfolioRef = React.createRef();
    contactRef = React.createRef();

    state = {
        contactPage: null,
        contactVisible: false,
        showContact: false,
        homePageShown: true,
        windowLoaded: true,
        hidePortfolio: false,
        dropDownActive: false,
        scrolled: false,
        counter: 0,
        portfolio: [{
            projectName: 'MoveInn', desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, image: portfolioImage, role: 'Lead Designer', agency: 'Mushib Limited', year: '2018'
        },

        {
            projectName: 'Meter Billing System', desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, image: portfolio2, role: 'Lead Designer', agency: 'Mojec Coms', year: '2018'
        },

        {
            projectName: 'Decentralized Blog Creator', desc: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, image: portfolio3, role: 'Software Engineer', agency: 'Self Agent', year: '2019'
        }],
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = (event) => {
        //this.homePageClicked
        let lastScrollTop = 0;
        let st = window.pageYOffset || document.documentElement.scrollTop;
        console.log(st)
        if (st > lastScrollTop) {
            //downscroll
            console.log('DOWN')

            // this.showContact();
            //this.portfolioRef.current.style.transform = `translateY(${(st*2)}px)`

            this.setState({ homePageShown: false, windowLoaded: false, scrolled: true, contactPage: this.contactPage });
            console.log(this.state.counter, "kk")
            // if(this.state.pageLoaded) {
            //  this.switchPortfolioHandler()
            //}
        } else {
            //upscroll
            console.log('UP')
            this.setState({ homePageShown: true })
        }
        lastScrollTop = st <= 0 ? 0 : st // For mobile or negative scrolling

    };

    showContact = () => {
        this.setState({ showContact: true, contactVisible: true })
    };

    hideContact = () => {
        this.setState({ contactVisible: false })
    };

    deleteContactPage = () => {
        this.setState({ showContact: false })
    }

    portfolioButtonClicked = () => {
        this.setState({ homePageShown: true })
    };

    homePageClicked = () => {
        console.log("Me")
        this.setState({ homePageShown: false, windowLoaded: false })
    }

    dropDownHandler = () => {
        this.setState({ dropDownActive: !this.state.dropDownActive })
    }

    translateHomepage = (val1, val2, hidePortfolio) => {
        return (
            <Spring
                from={{ transform: `translateY(${val1}%)` }}
                to={{ transform: `translateY(${val2}%)` }}
                config={config.slow}
                onRest={c => {
                    this.setState(state => {
                        return { hidePortfolio: hidePortfolio, counter: state.counter + 1 }
                    })
                }}
            >
                {props => (
                    <Homepage style={props} clicked={this.homePageClicked} />
                )}
            </Spring>
        )
    }

    render() {
        let homePageContent = null;
        let portfolioContent = null;
        let contactPage = null;
        this.content = true;

        //if the window is loaded fo r the first time, show only the homepage. 
        //Remove both the contact page and portfolio from the screen
        if (this.state.windowLoaded) {
            homePageContent = <Homepage clicked={this.homePageClicked} val1="0" val2="0" />
            portfolioContent = null;
            this.contactPage = null;
        } else {
            if (this.state.homePageShown) {
                console.log("home show")
                //here we slide in the homepage
                homePageContent = this.translateHomepage(-100, 0, true);
                if (!this.state.hidePortfolio) {
                    console.log("portfolio hidden")
                    //when we want to hide the portfolio page we make sure it remains static
                    //It doesn't animate down or up. It just stays at thesame position
                    portfolioContent = (
                        <Portfolios
                            counter={this.state.counter}
                            portfolio={this.state.portfolio}
                            switchPortHandler={this.switchPortHandler}
                            switchPortfolioHandler={this.switchPortfolioHandler}
                            clicked={this.portfolioButtonClicked}
                            showContact={this.showContact}
                            val1="0"
                            val2="0" />
                    )
                } else {
                    //if the homepage has finished sliding down, we remove the portfolio page from the screen
                    console.log("portfolio shown")
                    portfolioContent = null;
                }

            } else {
                //when the homepage is slid up, we remove it from the screen and bring in the portfolioPage
                homePageContent = homePageContent = this.translateHomepage(0, -100, false);
                portfolioContent = (
                    <Portfolios
                        counter={this.state.counter}
                        portfolio={this.state.portfolio}
                        switchPortHandler={this.switchPortHandler}
                        switchPortfolioHandler={this.switchPortfolioHandler}
                        clicked={this.portfolioButtonClicked}
                        showContact={this.showContact}
                        val1="100"
                        val2="0" />
                )
                this.contactPage = null;
            }
        }

        let image = <img className={classes.navIcon} src={navDefaultIcon} alt="navIcon" />
        if (this.state.dropDownActive) {
            image = <img className={classes.navIcon} src={navCloseIcon} alt="navIcon" />
        }

        //if(this.homepageRef.current){
            console.log(this.homepageRef, "jelo")
        //}
        return (
            <div className={classes.Layout}>
                <Homepage homepageRef={this.homepageRef} clicked={this.homePageClicked} />
                <Portfolios portfolioRef={this.portfolioRef}
                    counter={this.state.counter}
                    portfolio={this.state.portfolio}
                    switchPortHandler={this.switchPortHandler}
                    switchPortfolioHandler={this.switchPortfolioHandler}
                    clicked={this.portfolioButtonClicked}
                    showContact={this.showContact} />
                <Contact contactRef={this.contactRef} deleteContactPage={this.deleteContactPage}
                    contactVisible={this.state.contactVisible}
                    hideContact={this.hideContact}
                />
            </div>

        )
    }
}

export default Layout2;