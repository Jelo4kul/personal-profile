import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import classes from './Contact.css';
import navDefaultIcon from '../../../assets/navIcon.svg';
import navCloseIcon from '../../../assets/close.svg';
import navIcon from '../../../assets/upArrow.svg';
import twitter from '../../../assets/twitter.svg';
import linkedIn from '../../../assets/linkedin.svg';
import worm from '../../../assets/worm.svg';
import { Spring, config } from 'react-spring/renderprops';
import Auxiliary from '../../../components/Auxiliary';
import MobileContact from '../MobileContact/MobileContact';


class Contact extends Component {

    initiateTitle = (yellow) => (
        <Auxiliary>
            <span className={yellow.concat(classes.title).join(' ')}>Contact</span>
            <img src={worm} alt="underline" />
        </Auxiliary>
    );

    initiateMotivation1 = () => (
        <div className={classes.Mask1}>
            <Spring
                from={{ transform: `translateY(120%)` }}
                to={{ transform: `translateY(0%)` }}
                config={{ delay: 700, ...config.slow }}
            >
                {prop => (
                    <h1 style={prop} className={classes.Motivation1}>Once you see results,<br /> it becomes an addiction.</h1>
                )}
            </Spring>
        </div>
    );

    initiateMotivation2 = () => (
        <div className={classes.Mask2}>
            <Spring
                from={{ transform: `translateY(120%)` }}
                to={{ transform: `translateY(0%)` }}
                config={{ delay: 700, ...config.slow }}
            >
                {prop => (
                    <p style={prop} className={classes.Motivation2}>Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions. Your next project might change the world.</p>
                )}
            </Spring>
        </div>
    );

    initiateEmail = (whiteShade, yellow) => (
        <div className={classes.bottomContent}>
            <Spring
                from={{ transform: `translateY(140%)` }}
                to={{ transform: `translateY(0%)` }}
                config={{ delay: 700, ...config.slow }}
            >
                {prop => (
                    <div style={prop}>
                        <p className={whiteShade.join('')}>Get in touch:</p>
                        <p className={yellow.concat(classes.Email).join(' ')}>Jelo4kul@gmail.com</p>
                    </div>
                )}
            </Spring>
        </div>
    );

    render() {

        const yellow = [classes.yellow]
        const whiteShade = [classes.whiteShade];

        const width = window.innerWidth;

        let ContactToRender = <MobileContact />
        if (width > 400 && !this.props.mobileView) {
            ContactToRender = (
                <Spring
                    from={{ transform: this.props.contactActive ? `translateY(0%)` : `translateY(100%)` }}
                    to={{ transform: this.props.contactActive ? `translateY(100%)` : `translateY(0%)` }}
                    config={{ tension: 280, friction: 60 }}
                >
                    {props => (
                        <div style={props} className={classes.Contact}>
                            <section className={classes.Top}>
                                {this.initiateTitle(yellow)}
                                {this.initiateMotivation1()}
                                {this.initiateMotivation2()}
                                {this.initiateEmail(whiteShade, yellow)}
                            </section>
                            <section className={classes.Bottom}>
                                <div>
                                    <img className={classes.socialMedia} src={twitter} alt="twitter" />
                                    <img className={classes.socialMedia} src={linkedIn} alt="linkedIn" />
                                </div>
                            </section>
                            <ContactForm />
                        </div>
                    )}
                </Spring>
            )
        }

        return (
           ContactToRender
        )
    }
}

export default Contact;
