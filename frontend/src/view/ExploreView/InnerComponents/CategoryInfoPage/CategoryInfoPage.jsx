import React, { PureComponent } from 'react';
import axios from './../../../../axiosAPI';
import Api from './../../../../endpoints';
import { getPathFromUrl } from './../../../../utils';
import TsMapWrapper from './../../../../components/TsMapWrapper/TsMapWrapper';
import { Col, Row, Divider, Card, Button, Icon } from 'antd';
import TsTable from './../../../../components/TsTable/TsTable';
import { upperFirst, filter } from 'lodash';
import classes from './CategoryInfoPage.module.css';
import StepTitle from './../StepTitle/StepTitle';

class CategoryInfoPage extends PureComponent  {
    constructor(props) {
        super(props);

        this.state = {
            defaultMarkers: [
                {
                    name: 'Mazowieckie',
                    latlng: [52.266, 21.193]
                },
                {
                    name: 'Lubelskie',
                    latlng: [51.281, 22.879]
                },
                {
                    name: 'Dolnośląskie',
                    latlng: [50.959, 16.306]
                },
                {
                    name: 'Kujawsko-pomorskie',
                    latlng: [53.0619, 18.5044]
                },
                {
                    name: 'Lubuskie',
                    latlng: [52.252, 15.475]
                },
                {
                    name: 'Łódzkie',
                    latlng: [51.6253, 19.3668]
                },
                {
                    name: 'Małopolskie',
                    latlng: [49.8541, 20.2525]
                },
                {
                    name: 'Opolskie',
                    latlng: [50.5893, 17.8033]
                },
                {
                    name: 'Podkarpackie',
                    latlng: [49.920, 22.344]
                },
                {
                    name: 'Podlaskie',
                    latlng: [53.359, 22.768]
                },
                {
                    name: 'Pomorskie',
                    latlng: [54.222, 18.226]
                },
                {
                    name: 'Śląskie',
                    latlng: [50.2536, 19.0046]
                },
                {
                    name: 'Świętokrzyskie',
                    latlng: [50.7686, 20.7861]
                },
                {
                    name: 'Warmińsko-mazurskie',
                    latlng: [53.852, 20.967]
                },
                {
                    name: 'Wielkopolskie',
                    latlng: [52.401, 17.441]
                },
                {
                    name: 'Zachodniopomorskie',
                    latlng: [53.659, 15.546]
                },



            ],
            categoryName: '',
            data: [],
            description: "Brak opisu :<"

        }
    }

    componentDidMount() {
        this.saveExploredPath();
    }

    saveExploredPath = () => {
        axios.put(Api.PUT_EXPLORED_PATH, { userId: 1, path: this.props.location, name: getPathFromUrl(this.props.location, this.props.path) }).then((response) => {
            const { name } = response.data.exploredTag;
            this.setState({ categoryName: name });
            this.fetchExampleData(name);
            this.fetchProvinceData(name);
            this.fetchTagDescription(name);
        })
    }

    fetchExampleData = (name) => {
        axios.put(Api.PUT_EXPLORED_TAG_EXAMPLE_DATA, { name: name, category: this.props.category }).then((response) => {
            if (this.props.category === 'email') {
                const data = response.data.data.map((row) => {
                    return [
                        {
                            value: row.name,
                            width: '9'
                        },
                        {
                            value: row.Tags[0].title,
                            width: '7'
                        },
                        {
                            value: row.createdAt,
                            width: '4'
                        }]
                })

                this.setState({data: data});
            } else if (this.props.category === 'companies') {
                const data = response.data.data.map((row) => {
                    return [
                        {
                            value: row.name,
                            width: '9'
                        },
                        {
                            value: row.Tags[0].title,
                            width: '7'
                        },
                        {
                            value: row.createdAt,
                            width: '4'
                        },
                        {
                            value: row.description,
                            isHidden: true
                        },
                        {
                            value: row.address,
                            isHidden: true
                        },
                        {
                            value: row.province,
                            isHidden: true
                        },
                        {
                            value: row.contactNumber,
                            isHidden: true
                        },
                        {
                            value: row.website,
                            isHidden: true
                        },
                        {
                            value: row.zipCode,
                            isHidden: true
                        }
                    ]
                })

                this.setState({ data: data });
             }
        })
    }

    fetchProvinceData = (name) => {
        axios.put(Api.PUT_EXPLORED_PROVINCE, { name: name }).then((response) => {
            const markers = filter(this.state.defaultMarkers, (marker) => {
                return response.data.data.includes(marker.name);
            })
            this.setState({defaultMarkers: markers});
        })
    }

    fetchTagDescription = (name) => {
        axios.put(Api.PUT_EXPLORED_TAG_DESCRIPTION, { name: name }).then((response) => {
            this.setState({description: response.data.desc});
        })
    }

    render() {
        const mapWrapper = this.props.showMap ? (
            <>
                <Col offset={1} span={22}>
                    <Divider dashed>Dostępne aktualnie dla podanych województw</Divider>
                </Col>
                <Col offset={1} span={22}>
                    <TsMapWrapper defaultMarkers={this.state.defaultMarkers} />
                </Col>
            </>
            ) : null
        return (
            <>
                <Row gutter={24}>
                    <Col offset={6} span={12} className={classes.TagWrapper}>

                        <Button type="primary"
                            onClick={() => this.props.goBack(this.props.path)}>
                            <Icon type="left" />Powrót
                        </Button>

                        <StepTitle subText={'Wybrany Tag:'} value={upperFirst(this.state.categoryName)}>
                            <p>Wybrana kategoria: {upperFirst(this.props.category)}</p>
                        </StepTitle>
                    </Col>

                    <Col>
                        <Button type="primary"
                            onClick={() => this.props.goBack(this.props.path)}>
                            Dodaj Do koszyka <Icon type="shopping-cart" />
                        </Button>
                    </Col>
                    <Col offset={2} span={20}>
                        <Card title="OPIS">
                            <p>
                               {this.state.description}
                           </p>
                        </Card>

                    </Col>
                    <Col offset={1} span={22}>
                        <Divider>Przykładowe dane</Divider>
                    </Col>
                    <Col offset={1} span={22}>
                        <TsTable
                            header={this.props.tableHeader}
                            rows={this.state.data}
                            disableDownload={true}>
                        </TsTable>
                    </Col>
                    {mapWrapper}
                </Row>

            </>
        );
    }
}

export default CategoryInfoPage;