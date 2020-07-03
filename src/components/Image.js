import React from 'react';
import { render } from 'react-dom';

export class ImageBlock extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let
            width = `${this.props.container.width}${this.props.container.unitWidth}`,
            height = `${this.props.container.height}${this.props.container.unitHeight}`,
            align = "hrzCC",
            wide = "fit-content";

        this.props.container.width == 0 ? width = "fit-content" : width = width;
        this.props.container.height == 0 ? height = "fit-content" : height = height;

        this.props.container.align == "left" ?
            align = "hrzTL"
            : this.props.container.align == "right"
                ? align = "hrzTR"
                : this.props.container.align == "wide"
                    ? wide = "100%"
                    : align = align;

        return (<div className={`image-block ${align}`}
            style={{
                width: width,
                height: height
            }}>
            <img src={this.props.imageLink} style={{ width: wide }} />
        </div>)
    }
}

export class ImageInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            width: 100,
            height: 100,
            unitWidth: "px",
            unitHeight: "px",
            align: "autocenter",
        }
    }

    updateImage(e) { this.setState({ image: e.target.value }); }

    updateWidth(e) { this.setState({ width: e.target.value }); }
    updateHeight(e) { this.setState({ height: e.target.value }); }
    updateUnitWidth(e) { this.setState({ unitWidth: e.target.value }); }
    updateUnitHeight(e) { this.setState({ unitHeight: e.target.value }); }
    updateAlignment(e) { this.setState({ align: e.target.value }); }

    renderSettings() {
        return (<>
            <div className="hrzTL">
                <input aria-label="numeric value for width of image container" className="spacer-size" type="number" placeholder="width" onChange={this.updateWidth.bind(this)} />
                <input aria-label="unit for width, default is px" className="spacer-unit" type="text" placeholder="unit" onChange={this.updateUnitWidth.bind(this)} />
            </div>
            <div className="hrzTL">
                <input aria-label="numeric value for height of image container" className="spacer-size" type="number" placeholder="height" onChange={this.updateHeight.bind(this)} />
                <input aria-label="unit for height, default is px" className="spacer-unit" type="text" placeholder="unit" onChange={this.updateUnitHeight.bind(this)} />
            </div>
            <select value={this.state.align} onChange={this.updateAlignment.bind(this)}>
                <option value="autocenter" defaultValue>Center Align</option>
                <option value="left">Left Align</option>
                <option value="right">Right Align</option>
                <option value="wide">Wide</option>
            </select>
        </>)
    }

    render() {
        return (<div className="editor-image vrtTL">
            <input type="text" placeholder="image link" onChange={this.updateImage.bind(this)} />
            {this.renderSettings()}
            <p>Tip: setting the width or height to 0 will fit the exact resolution of the image.</p>
            <strong>Preview:</strong>
            <ImageBlock
                imageLink={this.state.image}
                container={{
                    width: this.state.width,
                    height: this.state.height,
                    unitWidth: this.state.unitWidth,
                    unitHeight: this.state.unitHeight,
                    align: this.state.align,
                }}
            />
        </div>)
    }
}