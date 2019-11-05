import React, { Component } from 'react';
import { Spring, Keyframes, config } from 'react-spring/renderprops';
import Zoom from 'react-reveal/Zoom';
import classes from './Homepage.css';
import profilePic from '../../assets/asset12.svg';
import worm from '../../assets/worm.svg';
import circleInSquare from '../../assets/circleInSquare.svg';
import circle from '../../assets/circle.svg';
import shape7 from '../../assets/asset8.svg';
import shape8 from '../../assets/asset9.svg';
import shape9 from '../../assets/asset10.svg';

import { createSTransition, createTransition, createWormTransition } from '../../utilityHelpers/KeyframeTransitions';

class Homepage extends Component {

    displayName = () => (
        <Spring
            from={{ opacity: 0, transform: "scale(3)" }}
            to={{ opacity: 1, transform: "scale(1)" }}
            config={{ delay: 700, ...config.slow }}>
            {props => (
                <div >
                    <div className={classes.profileName}>
                        <p style={props}>Jelo</p>
                    </div>
                    <Spring
                        from={{ opacity: 0, transform: "scale(0)" }}
                        to={{ opacity: 1, transform: "scale(1)" }}
                        config={config.slow}>
                        {props => (
                            <img style={props} className={classes.profilePic} src={profilePic} alt="profile_pic" />
                        )}</Spring>
                </div>
            )}
        </Spring>
    );


    render() {
        //Scripts for react-spring Keyframes
        const SmallWormScript = createWormTransition(1500, 2000);
        const CircleInSquareScript = createTransition(1500, 2200);
        const CircleScript = createTransition(1300, 2800);
        const EdgeSphereScript = createTransition(500, 1000);
        const Shape8Script = createSTransition(1500, 2000);
        const BigWormScript = createWormTransition(1500, 1500);

        return (

            <div style={this.props.style} className={classes.Homepage}>
                <Zoom top cascade>
                    <span className={classes.text1}>I build Stuffs</span>
                </Zoom>
                <Zoom delay={1000} right cascade>
                    <span className={classes.text2}>#tech is my world</span>
                </Zoom>

                {this.displayName()}

                <SmallWormScript>
                    {props => (
                        <img style={props} className={classes.shape1} src={worm} alt="shape" />
                    )}
                </SmallWormScript>

                <CircleInSquareScript>
                    {props => (
                        <img style={props} className={classes.shape2} src={circleInSquare} alt="shape" />
                    )}
                </CircleInSquareScript>


                <CircleScript>
                    {props => (
                        <img style={props} className={classes.shape4} src={circle} alt="shape" />
                    )}
                </CircleScript>
                <EdgeSphereScript>
                    {props => (
                        <img style={props} className={classes.shape7} src={shape7} alt="shape" />
                    )}
                </EdgeSphereScript>
                <Shape8Script>
                    {props => (
                        <img style={props} className={classes.shape8} src={shape8} alt="shape" />
                    )}
                </Shape8Script>
                <BigWormScript>
                    {props => (
                        <img style={props} className={classes.shape9} src={shape9} alt="shape" />
                    )}
                </BigWormScript>
            </div>

        );
    }
}

export default Homepage;