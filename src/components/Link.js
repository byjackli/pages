import React from 'react';

export class LinkBlock extends React.PureComponent {

    render() {
        return (<div className="link-block" style={{ textAlign: this.props.align }}>
            <a
                href={this.props.link}
                style={{
                    fontSize: `${this.props.fontSize}${this.props.fontSizeUnit}`
                }}>
                {this.props.label}
            </a>
        </div>)
    }
}

export class LinkInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: 24,
            fontSizeUnit: "px",
            link: "#",
            label: "",
            align: "center",
        }
    }

    updateFontSize(e) {
        this.setState({ fontSize: e.target.value });
        this.props.save(["link", {
            fontSize: e.target.value,
            fontSizeUnit: this.state.fontSizeUnit,
            link: this.state.link,
            label: this.state.label,
            align: this.state.align
        }]);
    }
    updatefontSizeUnit(e) {
        this.setState({ fontSizeUnit: e.target.value });
        this.props.save(["link", {
            fontSize: this.state.fontSize,
            fontSizeUnit: e.target.value,
            link: this.state.link,
            label: this.state.label,
            align: this.state.align
        }]);
    }
    updateLink(e) {
        this.setState({ link: e.target.value });
        this.props.save(["link", {
            fontSize: this.state.fontSize,
            fontSizeUnit: this.state.fontSizeUnit,
            link: e.target.value,
            label: this.state.label,
            align: this.state.align
        }]);
    }
    updateLabel(e) {
        this.setState({ label: e.target.value });
        this.props.save(["link", {
            fontSize: this.state.fontSize,
            fontSizeUnit: this.state.fontSizeUnit,
            link: this.state.link,
            label: e.target.value,
            align: this.state.align
        }]);
    }
    updateAlignment(e) {
        this.setState({ align: e.target.value });
        this.props.save(["link", {
            fontSize: this.state.fontSize,
            fontSizeUnit: this.state.fontSizeUnit,
            link: this.state.link,
            label: this.state.label,
            align: e.target.value
        }]);
    }

    renderSettings() {
        return (<>
            <div className="vrtTL">
                <input aria-label="link" type="text" placeholder="link" onChange={this.updateLink.bind(this)} />
                <input aria-label="label for link" type="text" placeholder="label" onChange={this.updateLabel.bind(this)} />
            </div>
            <div className="hrzTL">
                <input aria-label="font size" className="spacer-size" type="text" placeholder="font size" onChange={this.updateFontSize.bind(this)} />
                <input aria-label="unit for font size, default is px" className="spacer-unit" type="text" placeholder="unit" onChange={this.updatefontSizeUnit.bind(this)} />
            </div>
            <select value={this.state.align} onChange={this.updateAlignment.bind(this)}>
                <option value="center" defaultValue>Center Align</option>
                <option value="left">Left Align</option>
                <option value="right">Right Align</option>
            </select>
        </>)
    }

    render() {
        return (<div className="editor-link vrtTL">
            {this.renderSettings()}
            <strong>Preview:</strong>
            <LinkBlock
                fontSize={this.state.fontSize}
                fontSizeUnit={this.state.fontSizeUnit}
                link={this.state.link}
                label={this.state.label}
                align={this.state.align}
            />
        </div>)
    }
}