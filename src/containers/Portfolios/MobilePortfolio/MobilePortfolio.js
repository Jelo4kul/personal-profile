import React, { PureComponent } from 'react';
import { Spring, config, Keyframes } from 'react-spring/renderprops'
import classes from './MobilePortfolio.css';

import portfolio2 from '../../../assets/mobilePortImage2.svg';
import portfolio1 from '../../../assets/mobilePortImage1.svg';
import portfolio3 from '../../../assets/mobilePortImage3.svg';
import visitWebsiteArrow from '../../../assets/visitWebsiteArrow.svg';
import rightArrow from '../../../assets/right-arrow.svg';
import SlideOutElement from '../../../components/UI/SlideOutElement';

export default class MobilePortfolio extends PureComponent {

    state = {
        slideElementShown: false
    }

    showSlideElement = () => {
        this.setState({ slideElementShown: true })
    };

    changeProject = () => {

        if(this.state.slideElementShown) {
            this.props.goToNextPortfolio()
            if (this.props.switchPortfolio) {
                window.scrollTo(0, 0);
                this.props.history.push('/portfolio/' + ((+this.props.id + 1) % this.props.portfolios.length))
                this.props.disableSwitchPortfolio()
            }
            this.setState({ slideElementShown: false })
        }
      
    }

   createSlideOutTransition = _ => (
        Keyframes.Spring(async next => {
            if (true) {
                await next({ 
                    transform: this.state.slideElementShown ? "translateX(0%)" : "translateX(100%)", 
                    from: { transform: this.state.slideElementShown ? "translateX(-100%)" :  "translateX(0%)"}, 
                    config: { ...config.slow }, 
                    reset: false }, true)
                 }
        })
    );

    render() {

        const Script = this.createSlideOutTransition()

        return (
            <div className={classes.MobilePortfolio}>
             
                <Script onRest={() => this.changeProject()} >
                    {prop => (
                         <SlideOutElement prop={prop} />
                    )}
                </Script>

                <div className={classes.ImageHolder}>
                    <img src={this.props.portfolios[this.props.id].mImage} alt='ProjectImage' />
                    <div className={classes.VisitWebsite}>
                        <div className={classes.Circle}>
                            <img src={visitWebsiteArrow} alt='visitWebsiteArrow' />
                        </div>
                        <p>Visit Website</p>
                    </div>
                </div>
                <div className={classes.MetaData}>
                    <div className={classes.MetaProp}>
                        <span>Role</span>
                        <span>Agency</span>
                        <span>Year</span>
                    </div>
                    <div className={classes.MetaValue}>
                        <span>{this.props.portfolios[this.props.id].role}</span>
                        <span>{this.props.portfolios[this.props.id].agency}</span>
                        <span>{this.props.portfolios[this.props.id].year}</span>
                    </div>
                    <div className={classes.Divider} />
                </div>
                <p className={classes.ProjectName}>{this.props.portfolios[this.props.id].projectName}</p>
                <p className={classes.ProjectDescription}>{this.props.portfolios[this.props.id].desc}</p>
                <div className={classes.ProjectPreview}>
                    <div>
                        <img src={this.props.homepage} alt='Homepage' />
                        <span>Homepage</span>
                    </div>
                    <div>
                        <img src={this.props.dashboard} alt='Homepage' />
                        <span>Dashboard</span>
                    </div>
                    <div>
                        <img src={this.props.settings} alt='Homepage' />
                        <span>Settings</span>
                    </div>
                </div>
                <div className={classes.Tools}>
                    <div className={classes.TechStack}>
                        <p>Tech Stack</p>
                        <span></span>
                    </div>
                    <div className={classes.TechStackContents}>
                        <span>Node.js</span>
                        <span>React</span>
                        <span>Firebase</span>
                        <span>MongoDB</span>
                        <span>Quill.js</span>
                        <span>React-Router</span>
                        <span>React-Spring</span>
                        <span>Figma</span>
                    </div>
                    <div className={classes.Divider} />
                    <div className={classes.LayoutBottom}>
                        <span>Next Project:</span>
                        <span>{this.props.portfolios[(this.props.id + 1) % this.props.portfolios.length].projectName}</span>
                        <span onClick={this.showSlideElement}>
                            <img src={rightArrow} alt="viewMore" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
