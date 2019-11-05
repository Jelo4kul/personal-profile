import React, { PureComponent } from 'react';
import { Spring, config } from 'react-spring/renderprops'
import Zoom from 'react-reveal/Zoom';
import classes from './MobileLayout.css';
import profilePic from '../../../assets/asset12.svg';
import worm from '../../../assets/worm.svg';
import circleInSquare from '../../../assets/circleInSquare.svg';
import circle from '../../../assets/circle.svg';
import edgeSphere from '../../../assets/asset8.svg';
import { createTransition, createWormTransition } from '../../../utilityHelpers/KeyframeTransitions';
import SlideOutElement from '../../../components/UI/SlideOutElement';


export default class MobileLayout extends PureComponent {

    state = {
        slideElementShown: false
    }

    showSlideElement = (index) => {
        this.index = index
        this.setState({ slideElementShown: true })
    };

    goToPortfolio = () => {
        if (this.state.slideElementShown) {
            this.props.history.push({
                pathname: 'portfolio/' + this.index,
                data: this.props.portfolio
            })
            this.setState({ slideElementShown: false })
        }

    };

    render() {

        //Scripts for react-spring Keyframes
        const SmallWormScript = createWormTransition(1500, 2000);
        const CircleInSquareScript = createTransition(1500, 2200);
        const CircleScript = createTransition(1300, 2800);
        const EdgeSphereScript = createTransition(500, 1000);

        return (
            <div className={classes.MobileLayout}>
                <div className={classes.MobileHomepage}>
                    <div className={classes.HomepageText}>
                        <Zoom top cascade>
                            <p>I build Stuffs</p>
                        </Zoom>
                        <Zoom delay={1000} right cascade>
                            <p>#tech is my world</p>
                        </Zoom>
                    </div>
                    <div className={classes.Profile}>
                        <p className={classes.profileName}>Jelo</p>
                        <Zoom>
                            <img className={classes.profilePic} src={profilePic} alt="profilePic" />
                        </Zoom>
                    </div>
                    <SmallWormScript>
                        {props => (
                            <img style={props} src={worm} className={classes.wormShape} alt="shape1" />
                        )}
                    </SmallWormScript>
                    <CircleScript>
                        {props => (
                            <img style={props} src={circle} className={classes.circleShape} alt="shape2" />
                        )}
                    </CircleScript>
                    <EdgeSphereScript>
                        {props => (
                            <img style={props} src={circleInSquare} className={classes.circleInSquareShape} alt="shape3" />
                        )}
                    </EdgeSphereScript>
                    <CircleInSquareScript>
                        {props => (
                            <img style={props} src={edgeSphere} className={classes.edgeSphereShape} alt="shape4" />
                        )}
                    </CircleInSquareScript>
                </div>
                <div className={classes.Portfolios}>
                    {this.state.slideElementShown ? (
                        <Spring
                            from={{ transform: this.state.slideElementShown ? 'translateX(-100%)' : 'translateX(0%)' }}
                            to={{ transform: this.state.slideElementShown ? 'translateX(0%)' : 'translateX(0%)' }}
                            config={config.slow}
                            onRest={() => this.goToPortfolio() }
                        >
                            {prop => (
                                <SlideOutElement prop={prop} />
                            )}
                        </Spring>
                    ) : null}


                    <div className={classes.Header}>
                        <div className={classes.PortfolioLabel}>
                            <span>Portfolio</span>
                            <img src={worm} alt="underline" />
                        </div>
                    </div>
                    {this.props.portfolio.map(({ projectName, desc, image, role, agency, year }, index) => (
                        <div key={index} className={classes.Body}>
                            <section>
                                <img src={image} alt='' />
                                <div className={classes.MetaData}>
                                    <div className={classes.MetaProp}>
                                        <span>Role</span>
                                        <span>Agency</span>
                                        <span>Year</span>
                                    </div>
                                    <div className={classes.MetaValue}>
                                        <span>{role}</span>
                                        <span>{agency}</span>
                                        <span>{year}</span>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div></div>
                                <div></div>
                                <div>0{index + 1}</div>
                            </section>
                            <section>
                                <div className={classes.ProjectName}>{projectName}</div>
                                <div className={classes.ProjectDescription}>{desc}</div>

                                <button onClick={this.showSlideElement.bind(this, index)}>View use case</button>

                            </section>
                        </div>

                    ))}

                </div>

            </div>
        )
    }
}