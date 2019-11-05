import React, { Component } from 'react';
import { Spring, config } from 'react-spring/renderprops';

import Homepage from '../Homepage/Homepage';
import Portfolios from '../Portfolios/Portfolios';

import classes from './Layout.css';
import portfolioImage from '../../assets/portfolioImage.svg';
import portfolio2 from '../../assets/portfolio2.svg';
import portfolio3 from '../../assets/portfolio3.svg';

import mobilePortImage2 from '../../assets/mobilePortImage2.svg';
import mobilePortImage1 from '../../assets/mobilePortImage1.svg';
import mobilePortImage3 from '../../assets/mobilePortImage3.svg';
import _ from 'underscore';
import MobileLayout from './MobileLayout/MobileLayout';

class Layout extends Component {

    state = {
        homePageHasFinishedLoading: true,
        contactPage: null,
        contactVisible: false,
        homePageShown: true,
        windowLoaded: true,
        hidePortfolio: false,
        dropDownActive: false,
        portfolioChanged: false,
        portfolioLoaded: false,
        pageLoaded: true,
        homepageScrolledDown: false,
        counter: 0,
        portfolio: [{
            projectName: 'MoveInn', desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, image: portfolioImage, role: 'Lead Designer', agency: 'Mushib Limited', year: '2018', mImage: mobilePortImage1,
        },

        {
            projectName: 'Meter Billing System', desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, image: portfolio2, role: 'Lead Designer', agency: 'Mojec Coms', year: '2018', mImage: mobilePortImage2,
        },

        {
            projectName: 'Decentralized Blog Creator', desc: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, image: portfolio3, role: 'Software Engineer', agency: 'Self Agent', year: '2019', mImage: mobilePortImage3
        }],
    }

    componentDidMount() {
        this.lastScrollTop = 0;
        window.addEventListener('mousewheel', this.handleScroll());
    };

    componentWillUnmount() {
        window.removeEventListener('mousewheel', this.handleScroll());
    };

    handleScroll = (e) => _.debounce(() => {
        // cross-browser wheel delta
        let event = window.event || e; // old IE support
        this.delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        if (this.delta === -1 && this.state.homePageHasFinishedLoading && this.state.homePageShown) {
            //downscroll
            this.setState({
                homePageShown: false,
                windowLoaded: false,
                homePageHasFinishedLoading: false,
                homepageScrolledDown: true,
                contactPage: this.contactPage,
                portfolioLoaded: false
            });
        } else if (this.delta === 1) {
            //upscroll

            if (this.state.homePageShown) {
                //do nothing
            } else {
                if (this.state.counter === 0 && this.state.portfolioLoaded) {
                    if (this.state.homePageHasFinishedLoading) {

                        this.setState({ homePageShown: true, homePageHasFinishedLoading: false })
                    } else {

                        this.setState({ homePageShown: true, homePageHasFinishedLoading: true })
                    }
                }
            }

        }

        return false;
    }, 150, { 'leading': true, 'trailing': false })


    hideContact = () => {
        this.setState({ contactVisible: false })
    };

    portfolioButtonClicked = () => {
        this.setState({ homePageShown: true })
    };

    homePageClicked = () => {
        this.setState({ homePageShown: false, windowLoaded: false })
    }

    translateHomepage = (val1, val2, hidePortfolio) => {
        return (
            <Spring
                from={{ transform: `translateY(${val1}%)` }}
                to={{ transform: `translateY(${val2}%)` }}
                config={config.slow}
                onRest={c => {

                    //if the homepage is scrolled down, then the homepage has finished loading
                    //this is to prevent the user from scrolling while the page is animating

                    this.setState(state => {
                        return { hidePortfolio: hidePortfolio, homePageHasFinishedLoading: true, homepageScrolledDown: false }
                    })
                }}
            >
                {props => (
                    <Homepage style={props} clicked={this.homePageClicked} />
                )}
            </Spring>
        )
    }

    switchPortfolioHandler = () => {
        this.setState(state => (
            {
                homepageScrolledDown: false,
                portfolioChanged: true,
                pageLoaded: false,
            }
        ))
    };

    incrementCounter = () => {
        this.setState((state) => (
            {
                counter: Math.min(this.state.portfolio.length - 1, (state.counter + 1)),
                portfolioChanged: false
            }
        ))
    }

    decrementCounter = () => {
        this.setState((state, props) => (
            {
                counter: Math.max(0, (state.counter - 1)),
                portfolioChanged: false
            }
        ))
    }

    portfolioLoaded = () => {
        this.setState({ portfolioLoaded: true })
    };

    render() {
        let homePageContent = null;
        let portfolioContent = null;
        this.content = true;

        //if the window is loaded for the first time, show only the homepage. 
        //Remove both the contact page and portfolio from the screen
        if (this.state.windowLoaded) {
            homePageContent = <Homepage clicked={this.homePageClicked} val1="0" val2="0" />
            portfolioContent = null;
            this.contactPage = null;
        } else {
            if (this.state.homePageShown) {

                //here we slide in the homepage
                homePageContent = this.translateHomepage(-100, 0, true);
                if (!this.state.hidePortfolio) {

                    //when we want to hide the portfolio page we make sure it remains static
                    //It doesn't animate down or up. It just stays at thesame position
                    portfolioContent = (
                        <Portfolios
                            counter={this.state.counter}
                            portfolio={this.state.portfolio}
                            pageLoaded={this.state.pageLoaded}
                            homepageScrolledDown={this.state.homepageScrolledDown}
                            portfolioLoaded={this.portfolioLoaded}
                            portfolioChanged={this.state.portfolioChanged}
                            incrementCounter={this.incrementCounter}
                            decrementCounter={this.decrementCounter}
                            switchPortfolioHandler={this.switchPortfolioHandler}
                            clicked={this.portfolioButtonClicked}
                            val1="0"
                            val2="0" />
                    )
                } else {
                    //if the homepage has finished sliding down, we remove the portfolio page from the screen
                    portfolioContent = null;
                }

            } else {
                //when the homepage is slid up, we remove it from the screen and bring in the portfolioPage
                homePageContent = homePageContent = this.translateHomepage(0, -100, false);
                portfolioContent = (
                    <Portfolios
                        counter={this.state.counter}
                        portfolio={this.state.portfolio}
                        portfolioLoaded={this.portfolioLoaded}
                        homepageScrolledDown={this.state.homepageScrolledDown}
                        portfolioChanged={this.state.portfolioChanged}
                        pageLoaded={this.state.pageLoaded}
                        incrementCounter={this.incrementCounter}
                        decrementCounter={this.decrementCounter}
                        switchPortfolioHandler={this.switchPortfolioHandler}
                        clicked={this.portfolioButtonClicked}
                        val1="100"
                        val2="0" />
                )
                this.contactPage = null;
            }
        }
        const width = window.innerWidth;

        let LayoutToRender = <MobileLayout portfolio={this.state.portfolio} {...this.props} />
        if (width > 400 && !this.props.mobileView) {
            LayoutToRender = (
                <div className={classes.Layout}>
                    {homePageContent}
                    {portfolioContent}
                </div>
            )
        }

        return (
           LayoutToRender
        )
    }
}

export default Layout;