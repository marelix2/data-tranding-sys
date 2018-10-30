import React, { Component } from 'react';

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleCollapsed: props.onChangeCollapse,
            collapsed: props.sideMenuCollapsed
        }
    }

    render() {
        return(
            <div></div>
        );
    }
}

export default HomeView;
