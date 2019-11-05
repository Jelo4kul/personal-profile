import React, { Component } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { Link, NavLink } from 'react-router-dom'
import classes from './Portfolios.css';
import worm from '../../assets/wormTwo.svg';
import Contact from '../Contact/WebContact/Contact';
import _ from 'underscore';

class Portfolios extends Component {

    myRef = React.createRef();

    state = {
        showContact: false,
        hideContact: true,
        canShowContact: false,
        hovered: false,
        delayTime: 2000
    }

    componentDidMount() {

        if (this.myRef.current.addEventListener) {
            // IE9, Chrome, Safari, Opera
            this.myRef.current.addEventListener("mousewheel", this.MouseWheelHandler(), false);
            // Firefox
            this.myRef.current.addEventListener("DOMMouseScroll", this.MouseWheelHandler(), false);
        }
        // IE 6/7/8
        else this.myRef.current.attachEvent("onmousewheel", this.MouseWheelHandler());
    };

    componentWillUnmount() {
        this.myRef.current.removeEventListener('onmousewheel', this.MouseWheelHandler());
    };

    MouseWheelHandler = (e) => _.throttle(() => {
        // cross-browser wheel delta
        let event = window.event || e; // old IE support
        let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

        //if the user scrolls down
        if (delta === -1) {
            if (this.props.counter !== (this.props.portfolio.length - 1)) {
                this.scrollDirection = 'down';
                this.props.switchPortfolioHandler()
            }
        }
        //if the user scrolls up and we are not in the first portfolio
        else if (delta === 1 && this.props.counter !== 0) {
            this.scrollDirection = 'up';
            this.props.switchPortfolioHandler()
        }

        return false;
    }, 2000, { 'leading': true, 'trailing': false })

    deleteContactPage = () => {
        this.setState({ showContact: false })
    };

    switchPortHandler = () => {
        if (this.props.portfolioChanged) {

            if (this.scrollDirection === 'down') {
                this.props.incrementCounter()
            } else {
                this.props.decrementCounter()
            }

        }
    };

    setHover = () => {
        this.setState({ hovered: true })
    };

    cancelHover = () => {
        this.setState({ hovered: false })
    };

    leftSection = (portfolio, c) => (
        <section className={classes.LeftSection}>
            <div className={classes.TopContent}>
                <span>Portfolio</span>
                <img src={worm} alt="underline" />
            </div>

            <div className={classes.BottomContent}>
                <Spring
                    from={{ transform: !this.props.portfolioChanged ? "translateY(100%)" : "translateY(0%)" }}
                    to={{ transform: !this.props.portfolioChanged ? "translateY(0%)" : "translateY(100%)" }}
                    config={{ delay: this.props.homepageScrolledDown ? 800 : 0, tension: 280, friction: 60 }}
                    onRest={c => this.switchPortHandler()}
                >
                    {props => (
                        <div style={props}>
                            <h1 className={classes.ProjectName}>{portfolio[c].projectName}</h1>
                            <p className={classes.ProjectDesc}>{portfolio[c].desc}</p>
                        </div>
                    )}</Spring>
            </div>
        </section>

    );

    createButton = () => (
        <div className={classes.OuterButtonMask}>
            <Spring
                from={{ transform: !this.props.portfolioChanged ? "translateY(100%)" : "translateY(0%)", backgroundColor: !this.props.portfolioChanged ? "white" : "#B7503A" }}
                to={{ transform: !this.props.portfolioChanged ? "translateY(0%)" : "translateY(120%)", backgroundColor: !this.props.portfolioChanged ? "#B7503A" : "white" }}
                config={{ delay: this.props.homepageScrolledDown ? 1650 : 0, tension: 280, friction: 60 }}
            >
                {props => (

                    <div onMouseOver={this.setHover}
                        onMouseOut={this.cancelHover}
                        style={props}
                        className={classes.InnerButtonMask}>
                        <Spring
                            from={{ transform: !this.props.portfolioChanged ? "translateY(100%)" : "translateY(0%)" }}
                            to={{
                                transform: !this.props.portfolioChanged ? "translateY(0%)" : "translateY(100%)"
                            }}
                            config={{ delay: this.props.homepageScrolledDown ? 1650 : 0, tension: 280, friction: 60 }}
                        >
                            {props => (
                                <Link to={{
                                    pathname: 'portfolio/' + this.props.counter,
                                    data: this.props.portfolio
                                }} >
                                    <button style={props} className={classes.Button}></button>
                                    <Spring
                                        to={{
                                            transform: this.state.hovered ? "scaleY(1)" : "scaleY(0)",
                                            transformOrigin: this.state.hovered ? "bottom center" : "top center"
                                        }}
                                        config={config.slow}
                                    >
                                        {props => (
                                            <button style={{ ...props, backgroundColor: '#B7503A', position: 'absolute' }}
                                                className={classes.Button}>
                                            </button>
                                        )}
                                    </Spring>
                                    <p className={classes.ButtonText}
                                        style={{ color: this.state.hovered ? 'white' : '#403E4A' }}
                                    >
                                        View use case
                                </p>
                                </Link>
                            )}
                        </Spring>
                    </div>


                )}
            </Spring>
        </div>
    );

    createMetaValues = (portfolio, c) => (
        <div className={classes.MetaValues}>
            <Spring
                from={{ transform: "translateY(100%)" }}
                to={{ transform: "translateY(0%)" }}
                config={{ delay: this.props.homepageScrolledDown ? 1050 : 0, ...config.slow }}
            >
                {props => (
                    <div style={props} className={classes.MetaData}>
                        <div className={classes.MetaProp}>
                            <span>Role</span>
                            <span>Agency</span>
                            <span>Year</span>
                        </div>
                        <div className={classes.MetaValues}>

                            <Spring
                                from={{ transform: !this.props.portfolioChanged ? "translateY(0%)" : "translateY(0%)" }}
                                to={{ transform: !this.props.portfolioChanged ? "translateY(0%)" : "translateY(100%)" }}
                                config={{ delay: this.props.homepageScrolledDown ? 1050 : 0, tension: 280, friction: 60 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <span>{portfolio[c].role}</span>
                                        <span>{portfolio[c].agency}</span>
                                        <span>{portfolio[c].year}</span>
                                    </div>
                                )}
                            </Spring>

                        </div>
                    </div>
                )}
            </Spring>
        </div>

    );

    createPortfolioImage = (portfolio, c) => (
        <Spring
            from={{ opacity: !this.props.portfolioChanged ? 0 : 1, transform: !this.props.portfolioChanged ? "translateX(40%)" : "translateX(0%)" }}
            to={{ opacity: !this.props.portfolioChanged ? 1 : 0, transform: !this.props.portfolioChanged ? "translateX(0%)" : "translateX(40%)" }}
            config={{ delay: this.props.homepageScrolledDown ? 1350 : 0, ...config.slow }}
            onRest={c => {
                if (this.props.counter === 0)
                    this.props.portfolioLoaded()
            }}
        >
            {props => (
                <div style={props}>
                    <img src={portfolio[c].image} alt="MoveInn_Image" />
                </div>
            )}
        </Spring>
    );

    createDynamicNavigator = () => (
        <div className={classes.DynamicNavigator}>
                <div className={classes.Slider}></div>
                <div className={classes.Counter} onClick={this.props.switchPortfolioHandler}>
                    <Spring
                        from={{ transform: !this.props.portfolioChanged ? "scale(0)" : "scale(1)" }}
                        to={{ transform: !this.props.portfolioChanged ? "scale(1)" : "scale(0)" }}
                        config={{ delay: this.props.homepageScrolledDown ? 300 : 0, ...config.wobbly }}
                    >
                        {property => (
                            <div style={property}>0{this.props.counter + 1}</div>
                        )}</Spring>
                    <div>  /  </div>
                    <div>0{this.props.portfolio.length}</div>
                </div>
            </div>
    );

    rightSection = (portfolio, c) => (
        <section className={classes.RightSection}>
            {this.createDynamicNavigator()}
            {this.createPortfolioImage(portfolio, c)}
            {this.createMetaValues(portfolio, c)}
            {this.createButton()}
        </section>

    );

    render() {
        let width = window.innerWidth;
        console.log(width)
        this.timer = null;
        const portfolio = this.props.portfolio;
        const c = this.props.counter;

        return (
            <Spring
                from={{ transform: `translateY(${this.props.val1}%)` }}
                to={{ transform: `translateY(${this.props.val2}%)` }}
                config={config.slow}
            >
                {props => (
                    <div  ref={this.myRef} style={props} className={classes.Portfolios}>
                        
                            {this.leftSection(portfolio, c)}
                            {this.rightSection(portfolio, c)}
                      
                    </div>
                )}
            </Spring>
        )
    }
}

export default Portfolios;