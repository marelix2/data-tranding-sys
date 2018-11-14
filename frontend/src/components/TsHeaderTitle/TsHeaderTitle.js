import React, { Component } from 'react';
import classes from './TsHeaderTitle.module.css'

class TsHeaderTitle extends Component {
constructor(props){
    super(props);

    this.state = {
        message: props.message,
        textSize: props.textSize,
    }
}

    render() {
        return (
            <div>
                <p className={classes.headerMessage} style={{fontSize:this.state.textSize}}>{this.state.message}</p>
            </div>
        );
    }
}

export default TsHeaderTitle;