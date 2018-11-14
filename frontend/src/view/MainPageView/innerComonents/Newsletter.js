import React, { Component } from 'react';
import classes from './Newsletter.module.css';
import {Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;


class Newsletter extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    handleSubmit = (e) => {
        console.log(e);
    }

    render() {
        return (
            <div className={classes.newsletterWrapper}>   

                
                <Form layout='inline' onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Input className={classes.newsletterInput} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='adres email'/>
                    </FormItem>
                    <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={true}>
                        Dołącz <Icon type='right'></Icon>
                    </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}


export default Newsletter;