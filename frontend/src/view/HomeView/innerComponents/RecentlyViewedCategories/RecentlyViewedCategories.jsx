import React from 'react';
import { Card, Collapse, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import classes from './RecentlyViewedCategories.module.css';
import { Link } from 'react-router-dom';

const Panel = Collapse.Panel;

const RecentlyViewedCategories = (props) => {

    const panels = props.data.map((panel) => {
        return (<Panel header={panel.categoryName} key={panel.categoryName}>
            <div className={classes.PanelWrapper}>
                <span> Wyświetlono: {panel.dataToDisplay.date}</span>
                <Link to={panel.path} params={{ categoryName: panel.categoryName}}>
                <Button>
                    Przejdź do kategorii <Icon type="right" />
                </Button>
                </Link>
            </div>

        </Panel>)
    })

    return (
        <div>
            <Card title="Ostatnio odwiedzane kategorie:">
                <Collapse>
                    {panels}
                </Collapse>,
            </Card>
        </div>
    );
};



export default RecentlyViewedCategories;