import React, { Component } from 'react';
import classes from './TsHeaderTitle.module.css'

class TsHeaderTitle extends Component {
constructor(props){
    super(props);

    this.state = {
        message: props.message,
        textSize: props.textSize || 64,
    }
}

    render() {
        return (
            <div className={classes.Wrapper}>
                <p className={classes.headerMessage} style={{fontSize:this.state.textSize}}>{this.state.message}</p>
            </div>
        );
    }
}

export default TsHeaderTitle;