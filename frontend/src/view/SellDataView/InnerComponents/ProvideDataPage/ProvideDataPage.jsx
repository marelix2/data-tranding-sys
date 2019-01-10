import React, { Component } from 'react';
import { Row, Col, Divider, message, Select, Popconfirm, Button, Icon } from 'antd';
import ValidationActions from './../ValidationActions/ValidationActions';
import TsTable from './../../../../components/TsTable/TsTable';
import FileUploader from '../FileUploader/FileUploader';
import { filter, defaults } from 'lodash';
import equal from 'fast-deep-equal';
import TsSelector from './../../../../components/TsSelector/TsSelector';
import axios from './../../../../axiosAPI';
import Api from './../../../../endpoints';
import SingleRecordForm from '../SingleRecordForm/SingleRecordForm';

const Option = Select.Option;

class ProvideDataPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emailHeader: [
                {
                    name: 'Numer Wiersza',
                    width: '4'
                },
                {
                    name: 'Wartość',
                    width: '8'
                },
                {
                    name: 'Kategoria danych',
                    width: '8'
                },
            ],
            companyHeader: [
                {
                    name: 'Numer Wiersza',
                    width: '4'
                },
                {
                    name: 'Wartość',
                    width: '8'
                },
                {
                    name: 'Kategoria danych',
                    width: '8'
                },
                {
                    name: 'Opis',
                    isHidden: true
                },
                {
                    name: 'Numer Kontaktowy',
                    isHidden: true
                },
                {
                    name: 'Lokalizacja',
                    isHidden: true
                },
                {
                    name: 'Ulica',
                    isHidden: true
                },
                {
                    name: 'Kod pocztowy',
                    isHidden: true
                },
                {
                    name: 'Kraj',
                    isHidden: true
                },
                {
                    name: 'strona internetowa',
                    isHidden: true
                },
                {
                    name: 'Województwo',
                    isHidden: true
                }
            ],
            data: [],
            csvData: [],
            chosenTags: [],
            tag: null
        }
    }

    componentDidMount() {
        this.fetchTags(this.props.category)
    }

    rowDeleteHandle = (id) => {
        console.log('wywal', id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!equal(prevState.csvData, this.state.csvData)) {
            let convertedValues = [...this.state.data];
            let cols = [...this.state.csvData];
            for (let index = 1; index < cols.length; index++) {
                let row = cols[index].map((col, i) => {
                    let value = col ? col : 'brak';
                    if (cols[0][i].trim().localeCompare('name') === 0) {
                        return { 'value': col, 'width': '8' };
                    } else {
                        return { 'value': value, 'isHidden': true };
                    }
                });
                row.splice(0, 0, { 'value': index, 'width': '4' });
                row.splice(2, 0, { 'value': this.props.category, 'width': '8' });
                convertedValues = [...convertedValues, row];
            }
            this.setState({ data: convertedValues });
        }
    }

    onUploadChange = (info) => {
        const status = info.file.status;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            let fileReader = new FileReader();
            fileReader.onloadend = (e) => {
                const rows = fileReader.result.split('\n');
                let cols = rows.map(row => row.split(','));
                cols = filter(cols, (col) => col !== '');
                this.setState({ csvData: cols });
            }
            fileReader.readAsText(info.fileList[0].originFileObj);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    fetchTags = (category) => {

        axios.put(Api.GET_TAGS, { category: category }).then((response) => {
            const tags = response.data.tags.map((tag) => {
                const { title } = tag;
                return (<Option value={title} key={title}>{title}</Option>)
            });
            this.setState({ chosenTags: tags });
        })
    }

    onTagChooseHandler = (value) => {
        if (value === undefined) this.setState({ tag: null });
        this.setState({ tag: value });
    }

    onProvideDataHandler = () => {
        
    }

    singleRecordConfirmHandler = () => {

    }


    render() {
        const actions = <ValidationActions rowDeleteHandle={this.rowDeleteHandle} />

        const page = this.state.tag ? (
            <>
                <Col offset={1} span={22}>
                    <Divider>Dodaj pojedyńczy rekord</Divider>
                </Col>
                <Col offset={1} span={22}>
                    <SingleRecordForm  
                    onConfirm={this.singleRecordConfirmHandler} 
                    fields={this.props.category === 'emails' ? this.state.emailHeader : this.state.companyHeader}/>
                </Col>
                <Col offset={1} span={22}>
                    <Divider>Dodaj kilka rekordów</Divider>
                </Col>
                <Col offset={1} span={22}>
                    <FileUploader onUploadChange={this.onUploadChange} />
                </Col>
                <Col offset={1} span={22}>
                    <Divider dashed >Dodane</Divider>
                </Col>
                <Col offset={1} span={22}>
                    <TsTable
                        header={this.props.category === 'emails' ? this.state.emailHeader : this.state.companyHeader}
                        rows={this.state.data}
                        actions={actions}></TsTable>
                </Col>
                <Col offset={1} span={22}>
                    <Divider></Divider>
                </Col>
                <Col offset={11} span={11}>
                    <Popconfirm placement="top" title={'Czy na pewno chcesz przejść do płatności?'} onConfirm={this.onProvideDataHandler} okText="Tak" cancelText="Nie">
                        <Button type='primary' size={'large'} disabled={this.state.data.length === 0}>
                            Prześlij <Icon type={"mail"} />
                        </Button>
                    </Popconfirm>
                </Col>
                <Col offset={1} span={22}>
                    <Divider></Divider>
                </Col>
            </>) : null

        return (
            <div>
                <Row gutter={22}>
                    <Col offset={1} span={22}>
                        <TsSelector
                            key={'Tag'}
                            title={'Wybierz Tag'}
                            handle={this.onTagChooseHandler}
                            options={this.state.chosenTags}
                            allowClear={true}/>
                    </Col>
                    {page}
                </Row>
            </div>
        );
    }
}

export default ProvideDataPage;