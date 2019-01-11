import React, { Component } from 'react';
import { Card, Input, Divider } from 'antd';
import CardButton from './../CardButton/CardButton';

const SingleRecordForm = (props) => {
    const title = props.category === 'emails' ? 'Adres email' : 'Nazwa firmy';
        const fields =props.fields.map((field) => {
            return (
                <div key={field.colName}>
                    <Divider>{field.colName === 'Wartość' ? title : field.colName}</Divider>
                    <Input
                        placeholder={`podaj wartość`}
                        value={field.value}
                        onChange={(e) => props.onChange(e, field.colName)}
                    />
                </div>
            )
        });

        return (
            <>
                <Card
                    size="small"
                    title={'Wypełnij formularz'}
                    bodyStyle={{ background: 'rgb(236, 236, 236)' }}
                    actions={[<CardButton message='Zapisz' type='check' clicked={props.cardButtonClicked} />]}>
                    {fields}
                </Card>
            </>
        );
};

export default SingleRecordForm;