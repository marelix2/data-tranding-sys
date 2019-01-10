import React, { Component } from 'react';
import TsTitle from './../../components/TsTitle/TsTitle';
import BranchChooser from '../../components/BranchChooser/BranchChooser';
import {Route} from 'react-router-dom';
import {Row,Col} from 'antd';
import ProvideDataPage from './InnerComponents/ProvideDataPage/ProvideDataPage';
class SellDataView extends Component {
    render() {
        const categoryChildren= (<h3>dodaj dane w tej kategorii</h3>)
        return (
            <div>
                <TsTitle
                    title='Sprzedaż danych'
                    image={{ name: 'sellData', type: 'png' }} />

                   
                    <Route exact path={`${this.props.match.path}`} render={() => (<BranchChooser
                        pathUrl={this.props.match.url}
                        stepTitleText={{ subText: 'Wybierz ', value: 'kategorię', postText: "danych:" }}
                        emailCategoryChildren={categoryChildren}
                        companyCategoryChildren={categoryChildren}
                    />)} />

                <Route
                     exact path={`${this.props.match.path}/emails`}
                    render={() => (
                        <ProvideDataPage category={'Emaile'}/>
                    )}
                    />

                <Route
                    exact path={`${this.props.match.path}/companies`}
                    render={() => (
                        <ProvideDataPage  category={'Firmy'}/>
                    )}
                />
                  
            </div>
        );
    }
}

export default SellDataView;