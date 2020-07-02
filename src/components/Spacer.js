import React from 'react';

export class SpacerBlock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (<div className="spacer-block"
            style={{
                width: `${this.state.width}${this.state.unitWidth}`,
                height: `${this.state.height}${this.state.unitHeight}`
            }}
        >
        </div>)
    }
}

export class SpacerInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 100,
            height: 100,
            unitWidth: "px",
            unitHeight: "px",
        }
    }

    updateWidth(e) { this.setState({ width: e.target.value }); }
    updateHeight(e) { this.setState({ height: e.target.value }); }
    updateUnitWidth(e) { this.setState({ unitWidth: e.target.value }); }
    updateUnitHeight(e) { this.setState({ unitHeight: e.target.value }); }

    render() {
        return (<div className="editor-spacer"
            style={{
                width: `${this.state.width}${this.state.unitWidth}`,
                height: `${this.state.height}${this.state.unitHeight}`
            }}
        >
            <div className="hrzTL">
                <input aria-label="numeric value for width of spacer" className="spacer-size" type="number" placeholder="width" onChange={this.updateWidth.bind(this)} />
                <input aria-label="unit for width, default is px" className="spacer-unit" type="text" placeholder="unit" onChange={this.updateUnitWidth.bind(this)} />
            </div>
            <div className="hrzTL">
                <input aria-label="numeric value for height of spacer" className="spacer-size" type="number" placeholder="height" onChange={this.updateHeight.bind(this)} />
                <input aria-label="unit for height, default is px" className="spacer-unit" type="text" placeholder="unit" onChange={this.updateUnitHeight.bind(this)} />
            </div>
        </div>)
    }
}