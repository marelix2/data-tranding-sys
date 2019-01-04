import React, { Component } from 'react';
import axios from './../../../../axiosAPI';
import Api from './../../../../endpoints';
import { getPathFromUrl } from './../../../../utils';
import TsMapWrapper from './../../../../components/TsMapWrapper/TsMapWrapper';

class CategoryInfoPage extends Component {
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
                    latlng: [50.5893 , 17.8033]
                },
                {
                    name: 'Podkarpackie',
                    latlng: [49.920, 22.344]
                },
                {
                    name: 'Podlaskie',
                    latlng: [53.359 , 22.768]
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
        }
    }

    componentDidMount() {
        this.saveExploredPath()
    }

    saveExploredPath = () => {

        axios.put(Api.PUT_EXPLORED_PATH, { userId: 1, path: this.props.location, name: getPathFromUrl(this.props.location, this.props.path) }).then((response) => {
        })
    }

    render() {
        return (
            <div>
                <TsMapWrapper defaultMarkers={this.state.defaultMarkers} />
            </div>
        );
    }
}

export default CategoryInfoPage;