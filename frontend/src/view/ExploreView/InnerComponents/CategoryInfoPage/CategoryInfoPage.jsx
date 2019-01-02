import React, { Component } from 'react';
import axios from './../../../../axiosAPI';
import Api from './../../../../endpoints';
import { getPathFromUrl} from './../../../../utils';

class CategoryInfoPage extends Component {
constructor(props){
    super(props);

    this.state = {

    }
}



componentDidMount() {
    this.saveExploredPath()
}

saveExploredPath = () => {

    axios.put(Api.PUT_EXPLORED_PATH, { userId: 1, path: this.props.location, name: getPathFromUrl(this.props.location, this.props.path ) } ).then((response) => {
        console.log(response);
    })
}

    render() {
        return (
            <div>
                {this.props.path}
            </div>
        );
    }
}

export default CategoryInfoPage;