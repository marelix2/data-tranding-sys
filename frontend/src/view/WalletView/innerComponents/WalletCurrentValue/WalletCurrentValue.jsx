import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import classes from './WalletCurrentValue.module.css';
import TsBasicButton from './../../../../components/TsBasicButton/TsBasicButton';

const CurrentValue = (props) => {
    const actions = [
        <TsBasicButton type="schedule" message={'historia zakupów'} directory='sold'/>,
        <TsBasicButton type="rise" message={'Wypłać zgromadzone środki'} directory='wallet'/>
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