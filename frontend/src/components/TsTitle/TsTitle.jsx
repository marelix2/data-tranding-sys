import React from 'react';
import classes from './TsTitle.module.css';
import PropTypes from 'prop-types';

const TsTitle = (props) => {
    const imgSrc = require(`./../../assets/titleViewsImages/${props.image.name}.${props.image.type}`);
    return (
        <>
            <div className={classes.headerWrapper}>
                <img src={imgSrc}
                    className={classes.backgroundImage}
                    alt={`background of ${props.title}`} />
                <div className={classes.titleWrapper}> {props.title}</div>
            </div>
        </>
    );
};

TsTitle.propTypes = {
    image: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string
    }),
    title: PropTypes.string,
}


export default TsTitle;