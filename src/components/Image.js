import React from 'react';
import { render } from 'react-dom';

export class ImageBlock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (<div>
            <img src={this.props.imageLink} />
        </div>)
    }
}

export class ImageInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        }
    }

    updateImage(e) { this.setState({ image: e.target.value }); }

    render() {
        return (<div className="vrtTL">
            <input type="text" placeholder="image link" onChange={this.updateImage.bind(this)} />
            <strong>Preview:</strong>
            <ImageBlock imageLink={this.state.image} />
        </div>)
    }
}