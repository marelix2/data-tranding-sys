import React, { Component } from 'react';
import classes from './HomeView.module.css';
import CurrentValue from './innerComponents/WalletCurrentValue/CurrentValue';
import RecentlyViewedCategories from './innerComponents/RecentlyViewedCategories/RecentlyViewedCategories';
import { Col, Row, Button } from 'antd';
import axios from './../../axiosAPI';
import Api from './../../endpoints';

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            explored: [
            ],

            walletValue: 0
        }
    }

    componentDidMount() {
        this.fetchWalletValue();
        this.fetchExplored();
    }

    fetchWalletValue = () => {
        axios.put(Api.GET_CURRENT_VALUE, { userId: localStorage.getItem('id')}).then((response) => {
            this.setState({walletValue: response.data.current.currentState})
        })
    }

    fetchExplored = () => {
        axios.put(Api.GET_EXPLORED, { userId: localStorage.getItem('id') }).then((response) => {
            const explored = response.data.exploredTag.map((tag) => {
                return ({
                    categoryName: tag.name,
                    dataToDisplay: {
                        date: tag.updatedAt
                    },
                    path: tag.path
                })
            })

            this.setState({explored: explored})
        })
    }

    handleClick = () => {
        axios.get(Api.GET_FILE).then((response) => {
            window.open(`http://localhost:6969/api${Api.GET_FILE}`);
        })
    }

    render() {
        return (
            <div className={classes.HomeViewWrapper}>
                <Row gutter={24}>
                    <Col offset={2} span={12}>
                        <RecentlyViewedCategories data={this.state.explored}/>
                    </Col>
                    <Col span={8}>
                        <CurrentValue value={this.state.walletValue}/>
                    </Col>

                    <Col offset={12} span={12}>
                        <Button onClick={this.handleClick} >Kliknij mnie </Button>
                    </Col>
                </Row>
                
            </div>

        );
    }
}

export default HomeView;
