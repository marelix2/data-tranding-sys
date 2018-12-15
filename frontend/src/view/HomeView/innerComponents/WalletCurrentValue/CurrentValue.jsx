import React from 'react';
import { Card, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import classes from './CurrentValue.module.css';
import TsBasicButton from './../TsBasicButton/TsBasicButton';

const CurrentValue = (props) => {
    const actions = [
        <TsBasicButton type="shopping-cart" message={'przejdź do zakupów'} directory='buy'/>,
        <TsBasicButton type="wallet" message={'twój portwel'} directory='wallet'/>
    ];
    const value = props.value ? numeral(props.value).format('0.00') : '0.00'
    return (
        <div>
            <Card title="Stan twojego portwela:"
                actions={actions}
                bodyStyle={{ background: 'rgb(236, 236, 236)'}}>
                <span className={classes.ValueText}>{value}  PLN</span> 
            </Card>
           
        </div>
    );
};

CurrentValue.propTypes = {
    value: PropTypes.number.isRequired
}

export default CurrentValue;