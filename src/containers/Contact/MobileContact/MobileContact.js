import React from 'react';
import classes from './MobileContact.css';

import twitter from '../../../assets/twitter.svg';
import linkedIn from '../../../assets/linkedin.svg';

class MobileContact extends React.PureComponent {
    render() {
        return (
            <div className={classes.MobileContact}>
                <section className={classes.Top}>
                    <p className={classes.Motivation1}>Once you see results,<br />it becomes an addiction.</p>
                    <p className={classes.Motivation2}>Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions. Your next project might change the world.</p>
                    <div>
                        <span>Get in touch:</span>
                        <span>Jelo4kul@gmail.com</span>
                    </div>
                </section>
                <section className={classes.Bottom}>
                    <div>
                        <p>Let's work together</p>
                        <form className={classes.Form} method="post">
                            <input type="text" className={classes.Name} placeholder="Name" />
                            <input type="email" className={classes.Email} placeholder="Email" />
                            <textarea className={classes.ProjectDescription} placeholder="Project Description" />
                            <button type="button">Submit</button>
                        </form>
                    </div>
                    <div>
                        <img className={classes.twitter} src={twitter} alt='twitter' />
                        <span className={classes.Divider}></span>
                        <img className={classes.linkedIn} src={linkedIn} alt='twitter' />
                    </div>
                </section>
            </div>
        )
    }
}

export default MobileContact;