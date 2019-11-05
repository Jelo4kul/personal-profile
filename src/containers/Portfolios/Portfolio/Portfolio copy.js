import React from 'react';
import { Spring, config, Transition, animated } from 'react-spring/renderprops';
import classes from './Portfolio.css';
import { Switch, Route, Link } from 'react-router-dom'

class Portfolio extends React.Component {

    state = {
        deactivate: false,
        showMainLayer: false
    }

    deactivateElements = () => {
        this.setState({showMainLayer: true })
    };

    delayExec = (e) => {
        this.setState({ deactivate: !this.state.deactivate, showMainLayer: true })
        e.preventDefault();
    };

    A = () => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Spring
                from={{ transform: !this.state.deactivate ? 'translateY(100%)' : 'translateY(0%)' }}
                to={{ transform: !this.state.deactivate ? 'translateY(0%)' : 'translateY(100%)' }}
                config={{ ...config.slow, delay: 400 }}
            >
                {prop => (
                    <div style={{ ...prop, backgroundColor: 'red', color: 'white', width: '200px', height: '200px' }}>
                        Jelo
                </div>
                )}
            </Spring>

            <div>
                <Link to='/portfolio/b' onClick={this.deactivateElements}>A</Link>
            </div>


            <Spring
                from={{ transform: !this.state.deactivate ? 'translateY(100%)' : 'translateY(0%)' }}
                to={{ transform: !this.state.deactivate ? 'translateY(0%)' : 'translateY(100%)' }}
                config={{ ...config.slow, delay: 400 }}
            >
                {prop => (
                    <div style={{ ...prop, backgroundColor: 'blue', color: 'white', width: '200px', height: '200px' }}>
                        Presy
                </div>
                )}
            </Spring>

        </div>
    )

    B = () => (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
            <Spring
                from={{ opacity: this.state.deactivate ? '1' : '1' }}
                to={{ opacity: this.state.deactivate ? '1' : '0' }}
                config={{ ...config.slow, delay: 250 }}
            >
                {prop => (
                    <div style={{ ...prop, backgroundColor: 'red', color: 'white', width: '200px', height: '200px' }}>
                        Jelo
                </div>
                )}
            </Spring>

            <Spring
                from={{ opacity: this.state.deactivate ? '1' : '1' }}
                to={{ opacity: this.state.deactivate ? '1' : '0' }}
                config={{ ...config.slow, delay: 250 }}
            >
                {prop => (
                    <div style={prop}>
                        <Link to='/portfolio/b' >A</Link>
                    </div>
                )}
            </Spring>

            <Spring
                from={{ transform: this.state.deactivate ? 'translateY(0%)' : 'translateX(0%)' }}
                to={{ transform: this.state.deactivate ? 'translateY(0%)' : 'translateX(-470%)' }}
                config={{ ...config.slow, delay: 600 }}
            >
                {prop => (
                    <div style={{ ...prop, backgroundColor: 'blue', zIndex: '2', color: 'white', width: '200px', height: '200px' }}>
                        Presy
                </div>
                )}
            </Spring>


            {this.state.showMainLayer ? (
                <div style={{position: 'absolute', padding: '0', display: 'flex', height: '100vh', width: '100%', justifyContent: 'space-between' }}>
                    <Spring
                        from={{ transform: this.state.deactivate ? 'translateY(0%)' : 'translateX(-100%)' }}
                        to={{ transform: this.state.deactivate ? 'translateY(0%)' : 'translateX(0%)' }}
                        config={{ ...config.slow, delay: 600 }}
                    >
                        {prop => (
                            <div style={{ ...prop, display: 'flex', position: 'relative', left: '0', top: '0', backgroundColor: 'red', height: '100vh', minWidth: '30%' }}>
                                Wow
                    </div>)}
                    </Spring>
                    <div>
                        <h1></h1>
                        <p></p>
                    </div>
                </div>
            ) : null}



        </div>
    )


    render() {

        this.location = this.props.location;
        console.log(this.location)
        const items =
            [{ key: 1, text: '1', delay: '100' },
            { key: 2, text: '2', delay: '200' },
            { key: 3, text: '3', delay: '400' },
            { key: 4, text: '4', delay: '600' }]
        return (
            <div className={classes.Portfolio} style={{ backgroundColor: 'white', height: '100vh', display: 'flex' }}>
                <Switch>
                    <Route path='/portfolio' exact component={this.A} />
                    <Route path='/portfolio/a' component={this.A} />
                    <Route path='/portfolio/b' component={this.B} />
                </Switch>
            </div>

        )
    }
};

export default Portfolio;