import React, { Component } from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import ChosenMark from './innerComponents/ChosenMark/ChosenMark';
import { Row, Col, Switch, Icon } from 'antd';

class TsMapWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mapConfig: {
                center: [52.069, 19.127],
                zoom: 6
            },

            payload: '',
            isPayloadVisible: false,
            mapMode: 'dark_all'
        }
    }


    onMouseOver = (evt) => {
        this.setState({ payload: evt.payload, isPayloadVisible: true })
    }
    onMouseOut = () => {
        this.setState({ payload: "", isPayloadVisible: false })
    }

    mapProvider = (x, y, z) => `https://cartodb-basemaps-a.global.ssl.fastly.net/${this.state.mapMode}/${z}/${x}/${y}.png`;

    render() {

        const markers = this.props.defaultMarkers.map(marker => (
            <Marker key={`marker_${marker.name}`} anchor={marker.latlng} payload={marker.name} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} />
        ));

        return (
            <>
                <ChosenMark value={this.state.payload} textInHeader={this.props.textInHeader || 'Wybrano'} isPayloadVisible={this.state.isPayloadVisible} />
                <div className="map">
                    <Map
                        width={window.innerWidth / 1.2}
                        height={600}
                        defaultCenter={this.state.mapConfig.center}
                        defaultZoom={this.state.mapConfig.zoom}
                        provider={this.mapProvider}
                    >
                        {markers}
                    </Map>
                </div>
            </>
        );
    }
}

export default TsMapWrapper;