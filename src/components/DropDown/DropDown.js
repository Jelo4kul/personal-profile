import React from 'react';
import classes from './DropDown.css';
import circle from '../../assets/circleTwo.svg';
import curvedTriangle from '../../assets/curvedTriangle.svg';
import circleInSquare from '../../assets/circleInSquareTwo.svg';
import invertedSphere from '../../assets/invertedSphere.svg';

import { Spring, config } from 'react-spring/renderprops';
import { Route, Link } from 'react-router-dom'
import Auxiliary from '../Auxiliary';

const transitElements = (props, element, pathName) => {
    return <div className={classes.Elements}>
        <Spring
            from={{ transform: props.dropDownActive ? `translateY(-100%)` : `translateY(0%)` }}
            to={{ transform: props.dropDownActive ? `translateY(0%)` : `translateY(-100%)` }}
            config={{ delay: 700, ...config.slow }}
        >
            {prop => (
                <Link to={pathName} onClick={props.dropDownHandler} style={prop} className={classes.wrapper}>
                    {element}
                </Link>
            )}
        </Spring>
    </div>
};

const transitPortfolio = (props) => {
    const element = (
        <Auxiliary>
            <div className={classes.shape}><img className={classes.circle} src={circle} alt="shape" /></div>
            <p className={classes.text1}>Home</p>
        </Auxiliary>
    )
    return transitElements(props, element, '/')
};

const transitAbout = (props) => {
    const element = (
        <Auxiliary>
            <div className={classes.shape}><img className={classes.invertedSphere} src={invertedSphere} alt="shape" /></div>
            <p className={classes.text2}>About</p>
        </Auxiliary>
    )
    return transitElements(props, element)
};

const transitBlog = (props) => {
    const element = (
        <Auxiliary>
            <div className={classes.shape}><img style={props} className={classes.curvedTriangle} src={curvedTriangle} alt="shape" /></div>
            <p className={classes.text3}>Blog</p>
        </Auxiliary>
    )
    return transitElements(props, element)
};

const transitContact = (props) => {
    const element = (
        <Auxiliary>
            <div className={classes.shape}><img className={classes.circleInSquare} src={circleInSquare} alt="shape" /></div>
            <p className={classes.text4}>Contact</p>
        </Auxiliary>
    )
    return transitElements(props, element, '/contact')
};

const DropDown = props => (
    <Spring
        from={{ transform: props.dropDownActive ? `translateY(-100%)` : `translateY(0%)` }}
        to={{ transform: props.dropDownActive ? `translateY(0%)` : `translateY(-100%)` }}
        config={config.slow}
    >
        {properties => (
            <div style={properties} className={classes.DropDown}>

                <div className={classes.content}>
                    {transitPortfolio(props)}
                    {transitAbout(props)}
                    {transitBlog(props)}
                    {transitContact(props)}
                </div>

            </div>
        )}
    </Spring>
)

export default DropDown