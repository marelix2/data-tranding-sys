import React, { Component } from 'react';
import classes from './Newsletter.module.css';
import {Icon, Input, Button,Row,Col} from 'antd';
import TsHeaderTitle from '../../../components/TsHeaderTitle/TsHeaderTitle';
import EmailValidator from 'email-validator';

class Newsletter extends Component {

    constructor(props){
        super(props);
        this.state = {
            emailAdress: '',
        }
    }

        emitEmpty = () => {
        this.emailAdressInput.focus();
        this.setState({ emailAdress: ''});
      }



      onChangeEmail = (e) => {
        this.setState({ emailAdress: e.target.value });
      }

      handleSubmit = () => {
          
            if(EmailValidator.validate(this.state.emailAdress)){
                console.log('email poprawny');
            }else {
                console.log('email niepoprawny');
            }
            //to do, send data on server to do a bunch of funny staff.
      }
    
    render() {

        const {emailAdress} = this.state;
        const inputPreffix = <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>;
        const inputSuffix = emailAdress ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const buttonIcon = <Icon type='right'/>
        return (
            <div>  
            <Row type='flex'
            justify='space-around'
            align='middle'
            className={classes.newsletterWrapper}>
            <Col>
               <TsHeaderTitle message={'Dołącz do newslettera'} textSize={64}/>
                     <Input
                         placeholder='adres email'
                         prefix={inputPreffix} 
                         suffix={inputSuffix}
                         value={emailAdress}
                         onChange={this.onChangeEmail}
                         ref={(node) => this.emailAdressInput = node}
                         />
                
                    <Button
                    className={classes.newsletterButton}
                        type="primary"
                        htmlType="submit"
                        disabled={false}
                        onClick={this.handleSubmit}>
                        Dołącz {buttonIcon}
                    </Button>

            </Col>
                </Row> 
            </div>
        );
    }
}


export default Newsletter;