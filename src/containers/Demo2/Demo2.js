import React from 'react';
import classes from './Demo2.css';
import { Spring, config } from 'react-spring/renderprops';
import FlipMove from 'react-flip-move';

class Demo2 extends React.Component {

    state = {
        numbers: [
            { value: 1, borderRadius: 50, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 2, borderRadius: 6, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 3, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 4, borderRadius: 50, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 5, borderRadius: 0, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 6, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 7, borderRadius: 0, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 8, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 9, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 10, borderRadius: 50, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 11, borderRadius: 0, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 12, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 13, borderRadius: 50, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 14, borderRadius: 50, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 15, borderRadius: 0, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 16, borderRadius: 0, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 17, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 18, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 19, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 20, borderRadius: 50, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 21, borderRadius: 6, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 22, borderRadius: 0, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 23, borderRadius: 0, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 24, borderRadius: 0, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 25, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 26, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 27, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 28, borderRadius: 6, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 29, borderRadius: 0, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 30, borderRadius: 50, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 31, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 32, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 33, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 34, borderRadius: 50, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 35, borderRadius: 6, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 36, borderRadius: 50, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 37, borderRadius: 6, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 38, borderRadius: 0, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 39, borderRadius: 6, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 40, borderRadius: 0, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 41, borderRadius: 0, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 42, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 43, borderRadius: 0, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 44, borderRadius: 50, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 45, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 46, borderRadius: 50, bgColor: "#59c9a5", bgColorOrder: 3 },
            { value: 47, borderRadius: 0, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 48, borderRadius: 0, bgColor: "#ee4266", bgColorOrder: 2 },
            { value: 49, borderRadius: 6, bgColor: "#3185fc", bgColorOrder: 1 },
            { value: 50, borderRadius: 50, bgColor: "#ee4266", bgColorOrder: 2 }
        ],
        shapeActivated: false,
        section1: null,
        section2: null,
        section3: null
    }

    renderByNumberOrder = () => {
        const numCopy = this.state.numbers.slice();
        numCopy.sort(function (a, b) {
            return a.value - b.value
        })

        this.setState({ numbers: numCopy })
    }

    renderByShape = () => {
        const numCopy = this.state.numbers.slice();
        const section1 = numCopy.filter(val => (
            val.borderRadius === 0
        ))
        const section2 = numCopy.filter(val => (
            val.borderRadius === 6
        ))
        const section3 = numCopy.filter(val => (
            val.borderRadius === 50
        ))

        numCopy.sort(function (a, b) {
            return a.borderRadius - b.borderRadius
        })
        this.setState({ numbers: numCopy, section2: section2, section3: section3, shapeActivated: true })
    }

    renderByColor = () => {
        const numCopy = this.state.numbers.slice();
        numCopy.sort(function (a, b) {
            return a.bgColorOrder - b.bgColorOrder
        })
        this.setState({ numbers: numCopy })
    }

    render() {
        let counter = -80;

        const sections = null;

        return (
            <div>
                <button onClick={this.renderByNumberOrder}>All</button>
                <button onClick={this.renderByShape}>By Shape</button>
                <button onClick={this.renderByColor}>By Color</button>
                <FlipMove
                    duration={200}
                    delay={10}
                    easing={'cubic-bezier(0.42, 0, 0.58, 1)'}
                    staggerDurationBy={15}
                    staggerDelayBy={10}
                    className={classes.Demo2}>
                    {this.state.numbers.map(({ value, borderRadius, bgColor }, index) => {   
                                    
                            return <li key={value}
                                style={{ borderRadius: borderRadius + "px", backgroundColor: bgColor }} className={classes.Element}>
                                {value}
                            </li>
                    })}   
                </FlipMove>

            </div>

        )
    }
}

export default Demo2;