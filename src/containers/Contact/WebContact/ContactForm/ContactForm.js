import React from 'react';
import classes from './ContactForm.css';
import { Spring, config } from 'react-spring/renderprops'

const ContactForm = props => (

    <Spring
        from={{ transform: `scale(0)` }}
        to={{ transform: `scale(1)` }}
        config={{ delay: 1300, ...config.wobbly }}
    >
        {prop => (
            <div style={prop} className={classes.ContactForm}>
                <p className={classes.header}>Let's work together</p>
                <form className={classes.Form} method="post">
                    <input type="text" className={classes.Name} placeholder="Name" />
                    <input type="email" className={classes.Email} placeholder="Email" />
                    <textarea className={classes.ProjectDescription} placeholder="Project Description" />
                    <button type="button">Submit</button>
                </form>
            </div>
        )}
    </Spring>


);

export default ContactForm;