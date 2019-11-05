import React from 'react';
import { Spring, config } from 'react-spring/renderprops';
import classes from './Portfolio.css';
import DummyPortfolios from './DummyPortfolios';
import Auxiliary from '../../../components/Auxiliary';

import Zoom from 'react-reveal/Zoom';

import portfolioImage from '../../../assets/portfolioImage.svg';
import portfolio2 from '../../../assets/portfolio2.svg';
import portfolio3 from '../../../assets/portfolio3.svg';
import visitWebsiteArrow from '../../../assets/visitWebsiteArrow.svg';
import rightArrow from '../../../assets/right-arrow.svg';
import downArrow from '../../../assets/downarrow.svg';
import dashboard from '../../../assets/image1.png';
import profile from '../../../assets/image2.png';
import homepage from '../../../assets/image3.png';
import settings from '../../../assets/image4.png';
import mobilePortImage2 from '../../../assets/mobilePortImage2.svg';
import mobilePortImage1 from '../../../assets/mobilePortImage1.svg';
import mobilePortImage3 from '../../../assets/mobilePortImage3.svg';
import MobilePortfolio from '../MobilePortfolio/MobilePortfolio';

class Portfolio extends React.Component {

    state = {
        mobileView: false,
        deactivate: false,
        switchPortfolio: false,
        showMainLayer: true,
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
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, image: portfolio3, role: 'Software Engineer', agency: 'Self Agent', year: '2019', mImage: mobilePortImage3,
        }]
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    };

    resize = () => {
        const width = window.innerWidth
        if(width < 400) {
           this.setState({mobileView: true})
        }
        else {
           this.setState({mobileView: false})
        }
    };

    deactivateElements = () => {
        this.setState({ showMainLayer: true })
    };

    delayExec = (e) => {
        this.setState({ deactivate: !this.state.deactivate, showMainLayer: true })
        e.preventDefault();
    };

    portfolioLoaded = () => {

    };

    goToNextPortfolio = () => {
        this.setState({ switchPortfolio: true })
    }

    transitionHelper = (from, to, element, className, delay, onRest) => (
        <Spring
            from={from}
            to={to}
            config={{ ...config.slow, delay: delay }}
            onRest={onRest}
        >
            {prop => (
                <div style={prop} className={className}>
                    {element}
                </div>
            )}
        </Spring>
    );

    leftSection = (prop) => {

        const metaDataFrom = { transform: !this.state.switchPortfolio ? 'translateY(100%)' : 'translateY(0%)' };
        const metaDataTo = { transform: !this.state.switchPortfolio ? 'translateY(0%)' : 'translateY(100%)' };
        const metaDataDelay = !this.state.switchPortfolio ? 1800 : 0
        const metaData = (
            <Auxiliary>
                <div className={classes.MetaProps}>
                    <span>Role</span>
                    <span>Agency</span>
                    <span>Year</span>
                </div>
                <div className={classes.MetaValues}>
                    <span>{this.portfolios[this.id].role}</span>
                    <span>{this.portfolios[this.id].agency}</span>
                    <span>{this.portfolios[this.id].year}</span>
                </div>
            </Auxiliary>
        )

        const webVisitFrom = { transform: !this.state.switchPortfolio ? 'scaleX(0)' : 'scaleX(1)' };
        const webVisitTo = { transform: !this.state.switchPortfolio ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left center' }
        const webVisitDelay = !this.state.switchPortfolio ? 2000 : 0
        const webVisit = (
            <Auxiliary>
                <div className={classes.Circle}>
                    <img src={visitWebsiteArrow} alt='visitWebsite' />
                </div>
                <p>Visit Website</p>
            </Auxiliary>
        )

        return (
            <div className={classes.LeftSection} style={prop} >
                <div className={classes.InnerLeftSection} style={prop}>
                    {!this.fromPrevPage ? (
                        <img style={{ width: '600px', marginBottom: '60px' }} src={this.state.portfolio[this.id].image} alt="MoveInn_Image" />
                    ) : null}

                    <div className={classes.MetaDataMask}>
                        {this.transitionHelper(metaDataFrom, metaDataTo, metaData, classes.MetaData, metaDataDelay)}
                    </div>
                    {this.transitionHelper(webVisitFrom, webVisitTo, webVisit, classes.WebsiteVisit, webVisitDelay)}

                </div>
            </div>
        )

    };

    rightSection = () => {

        return (

            <div className={classes.RightSection}>
                <div className={classes.MaskPName}>
                    <Spring
                        from={{ transform: !this.state.switchPortfolio ? 'translateY(100%)' : 'translateY(0%)' }}
                        to={{ transform: !this.state.switchPortfolio ? 'translateY(0%)' : 'translateY(100%)' }}
                        config={{ ...config.slow, delay: !this.state.switchPortfolio ? 1800 : 0 }}
                    >
                        {prop => (
                            <p style={prop} className={classes.ProjectName}>{this.portfolios[this.id].projectName}</p>
                        )}
                    </Spring>
                </div>
                <div className={classes.MaskPDesc}>
                    <Spring
                        from={{ transform: !this.state.switchPortfolio ? 'translateY(110%)' : 'translateY(0%)' }}
                        to={{ transform: !this.state.switchPortfolio ? 'translateY(0%)' : 'translateY(110%)' }}
                        config={{ ...config.slow, delay: !this.state.switchPortfolio ? 2000 : 0 }}
                    >
                        {prop => (
                            <p style={prop} className={classes.ProjectDescription}>{this.portfolios[this.id].desc}</p>
                        )}
                    </Spring>
                </div>

                <Spring
                    from={{ opacity: !this.state.switchPortfolio ? 0 : 1 }}
                    to={{ opacity: !this.state.switchPortfolio ? 1 : 0 }}
                    config={{ ...config.slow, delay: !this.state.switchPortfolio ? 2500 : 0 }}
                >
                    {prop => (
                        <div style={prop} className={classes.TechStack}>
                            <span>Tech Stack</span>
                            <span></span>
                            <span>React</span>
                            <span>Node.js</span>
                            <span>Firebase</span>
                            <span>
                                <img src={downArrow} alt="viewMore" />
                            </span>
                        </div>
                    )}</Spring>
            </div>
        )


    };

    disableSwitchPortfolio = () => (
        this.setState({ switchPortfolio: false })
    );

    body = () => {

        const btmLayoutFrom = { transform: !this.state.switchPortfolio ? 'translateY(100%)' : 'translateY(0%)' };
        const btmLayoutTo = { transform: !this.state.switchPortfolio ? 'translateY(0%)' : 'translateY(100%)' }
        const btmLayoutRest = () => {
            if (this.state.switchPortfolio) {
                window.scrollTo(0, 0);
                this.props.history.push('/portfolio/' + ((+this.id + 1) % this.portfolios.length))
                this.disableSwitchPortfolio();
            }
        }
        const btmLayout = (
            <Auxiliary>
                <span>Next Project:</span>
                <span>{this.portfolios[(this.id + 1) % this.portfolios.length].projectName}</span>
                <span onClick={this.goToNextPortfolio}>
                    <img src={rightArrow} alt="viewMore" />
                </span>
            </Auxiliary>
        )

        return (

            <Auxiliary>

                <section className={classes.LayoutBody}>
                    <Spring
                        from={{ opacity: this.state.switchPortfolio ? 1 : 0 }}
                        to={{ opacity: this.state.switchPortfolio ? 0 : 1 }}
                        config={{ ...config.slow, delay: 400 }}
                    >
                        {prop => (
                            <Auxiliary>
                                <div className={classes.BodyLeft}>
                                    <p className={classes.CaptivatingText}>
                                        Explore the creativity behind <span>{this.portfolios[this.id].projectName}</span>
                                    </p>
                                    <Zoom top delay={300} appear spy={this.state.switchPortfolio}>
                                        <div className={classes.Image1}>
                                            <img src={dashboard} alt='Dashboard' />
                                            <div>Dashboard</div>
                                        </div>
                                    </Zoom>
                                    <Zoom when={!this.state.switchPortfolio} delay={800} bottom appear>
                                        <div className={classes.Image2}>
                                            <img src={profile} alt='Profile' />
                                            <div>Profile</div>
                                        </div>
                                    </Zoom>
                                </div>
                                <div className={classes.BodyRight}>
                                    <Zoom bottom appear spy={this.state.switchPortfolio}>
                                        <div className={classes.Image3}>
                                            <img src={homepage} alt='Homepage' />
                                            <div>Homepage</div>
                                        </div>
                                    </Zoom>

                                    <Zoom opposite style={prop} delay={600} top appear when={!this.state.switchPortfolio}>
                                        <div className={classes.Image4}>
                                            <img src={settings} alt='Settings' />
                                            <div>Settings</div>
                                        </div>
                                    </Zoom>
                                </div>
                            </Auxiliary>

                        )}</Spring>
                </section>
                <div className={classes.LayoutBottomMask}>
                    {this.transitionHelper(btmLayoutFrom, btmLayoutTo, btmLayout, classes.LayoutBottom, 300, btmLayoutRest)}
                </div>
            </Auxiliary>
        )
    }

    Layout = () => (
        <div className={classes.SinglePortfolio}>

            {this.fromPrevPage ? (
                <DummyPortfolios
                    counter={this.id}
                    portfolio={this.portfolios}
                    portfolioLoaded={this.portfolioLoaded}
                    val1="0"
                    val2="0" />
            ) : null}

            {this.state.showMainLayer ? (
                <div className={classes.MainLayer} >
                    <div className={classes.Header}>
                        <Spring
                            from={{ transform: !this.state.switchPortfolio ? 'translateX(-100%)' : 'translateX(0%)' }}
                            to={{ transform: !this.state.switchPortfolio ? 'translateX(0%)' : 'translateX(-100%)' }}
                            config={{ ...config.slow, delay: !this.state.switchPortfolio ? 600 : 0 }}
                        >
                            {prop => this.leftSection(prop)}
                        </Spring>
                        {this.rightSection()}
                    </div>
                    {this.body()}
                </div>
            ) : null}
        </div>
    )

    render() {
        this.id = this.props.match.params.id
        this.portfolios = this.props.location.data
        this.fromPrevPage = true;
        if (!this.portfolios) {
            this.portfolios = this.state.portfolio
            this.fromPrevPage = false
        }
        const Layout = this.Layout

        const width = window.innerWidth;

        let LayoutToRender = (
            <MobilePortfolio 
                id={this.id} 
                portfolios={this.portfolios}
                history={this.props.history}
                disableSwitchPortfolio={this.disableSwitchPortfolio}
                goToNextPortfolio={this.goToNextPortfolio}
                switchPortfolio={this.state.switchPortfolio}
                homepage={homepage}
                dashboard={dashboard}
                settings={settings} />
        )
        if (width > 400 && !this.props.mobileView) {
            LayoutToRender = <Layout />
        }
        return (
            LayoutToRender
        )
    }
};

export default Portfolio;