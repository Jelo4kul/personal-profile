import React, { Component } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { Link } from 'react-router-dom'
import classes from '.././Portfolios.css';
import worm from '../../../assets/wormTwo.svg';
import Auxiliary from '../../../components/Auxiliary';

class DummyPortfolios extends Component {

    myRef = React.createRef();

    state = {
        showContact: false,
        hideContact: true,
        canShowContact: false,
        delayTime: 2000
    }

    leftSection = (portfolio, c) => (
        <section className={classes.LeftSection}>
            <Spring
                from={{ opacity: 1 }}
                to={{ opacity: 0 }}
                config={config.slow}
            >
                {props => (
                    <div style={props} className={classes.TopContent}>
                        <span>Portfolio</span>
                        <img src={worm} alt="underline" />
                    </div>
                )}
            </Spring>

            <div className={classes.BottomContent}>
                <Spring
                    from={{ transform: "translateY(0%)" }}
                    to={{ transform: "translateY(100%)" }}
                    config={config.slow}
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

    rightSection = (portfolio, c) => (
        <section className={classes.RightSection}>
            <Spring
                from={{ opacity: 1 }}
                to={{ opacity: 0 }}
                config={config.slow}
            >
                {props => (
                    <div style={props} className={classes.DynamicNavigator}>
                        <div className={classes.Slider}></div>
                        <div  className={classes.Counter} onClick={this.props.switchPortfolioHandler}>
                            <span>0{+this.props.counter + 1}</span>
                            <span>/</span>
                            <span>0{this.props.portfolio.length}</span>
                        </div>
                    </div>

                )}</Spring>

            <Spring
                from={{ transform: !this.props.portfolioChanged ? "translateX(0%)" : "translateX(-83%)" }}
                to={{ transform: !this.props.portfolioChanged ? "translateX(-80.4%)" : "translateX(-40%)" }}
                config={{ ...config.slow, delay: 500 }}
            >
                {props => (
                    <div style={props}>
                        <img src={portfolio[c].image} alt="MoveInn_Image" />
                    </div>
                )}
            </Spring>
            <div className={classes.MetaValues}>
                <Spring
                    from={{ transform: "translateY(0%)" }}
                    to={{ transform: "translateY(100%)" }}
                    config={config.slow}
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
                                    from={{ transform: "translateY(0%)" }}
                                    to={{ transform: "translateY(100%)" }}
                                    config={config.slow}
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
            <div className={classes.OuterButtonMask}>
                <Spring
                    from={{ transform: "translateY(0%)", backgroundColor: !this.props.portfolioChanged ? "white" : "#B7503A" }}
                    to={{ transform: "translateY(100%)", backgroundColor: !this.props.portfolioChanged ? "#B7503A" : "white" }}
                    config={{ delay: 0, tension: 280, friction: 60 }}
                >
                    {props => (
                        <div style={props} className={classes.InnerButtonMask}>
                            <Spring
                                from={{ transform: "translateY(0%)" }}
                                to={{ transform: "translateY(100%)" }}
                                config={{ delay: 0, tension: 280, friction: 60 }}
                            >
                                {props => (
                                    <div style={props}>
                                        <Link to='portfolio/' >
                                            <button className={classes.Button}>View use case</button>
                                        </Link>
                                    </div>
                                )}
                            </Spring>
                        </div>
                    )}
                </Spring>
            </div>
        </section>

    );

    render() {
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
                    <div style={{ ...props, position: 'absolute', zIndex: '1' }} className={classes.Portfolio}>
                        <div ref={this.myRef} style={{ height: "100vh", display: "flex" }}>
                            {this.leftSection(portfolio, c)}
                            {this.rightSection(portfolio, c)}
                        </div>
                    </div>
                )}
            </Spring>
        )
    }
}

export default DummyPortfolios;