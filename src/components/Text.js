import React from 'react';

export class TextBlock extends React.PureComponent {
    render() {
        return (<div className="text-block">
            <p style={{
                fontSize: `${this.props.fontSize}${this.props.fontSizeUnit}`,
                textAlign: this.props.align
            }}>
                {this.props.text}
            </p>
        </div>)
    }
}

export class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: ["bold", "italics", "strike", "underline", "large", "normal", "small"],
            text: null,
            fontSize: 24,
            fontSizeUnit: "px",
            align: "center",
        }
    }

    useTool(data, e) {
        let
            text = this.state.text,
            selected = window.getSelection() + "";

        if (data === "bold") {
            let boldtext = text.replace(selected, `<b>${selected}</b>`);
            console.info(boldtext)
            this.setState({ text: boldtext });
        }
        console.info("text selected:", window.getSelection().toString());
        console.info("using tool:", this.state.posStart);
    }
    updateCur(e) {
        this.setState({
            posStart: e.target.selectionStart,
            posEnd: e.target.selectionEnd
        });
        console.log(`posStart: ${e.target.selectionStart} /// posEnd: ${e.target.selectionEnd}`)
    }
    updateView(e) {
        let
            // str = this.state.text,
            // tail = str?.length - this.state.posEnd,
            textChange = e.target.innerText;

        // str !== null && 1 < str.length
        //     ? textChange = `${str.slice(0, this.state.posStart)}${e.target.value.slice(this.state.posStart, tail)}${str.slice(this.state.posEnd, str.length)}` 
        //     : textChange = e.target.value;

        this.setState({ text: textChange });
        this.props.save(["text", {
            text: textChange,
            fontSize: this.state.fontSize,
            fontSizeUnit: this.state.fontSizeUnit,
            align: this.state.align
        }]);
    }

    updateFontSize(e) {
        this.setState({ fontSize: e.target.value });
        this.props.save(["text", {
            text: this.state.text,
            fontSize: e.target.value,
            fontSizeUnit: this.state.fontSizeUnit,
            align: this.state.align
        }]);
    }
    updatefontSizeUnit(e) {
        this.setState({ fontSizeUnit: e.target.value });
        this.props.save(["text", {
            text: this.state.text,
            fontSize: this.state.fontSize,
            fontSizeUnit: e.target.value,
            align: this.state.align
        }]);
    }
    updateAlignment(e) {
        this.setState({ align: e.target.value });
        this.props.save(["text", {
            text: this.state.text,
            fontSize: this.state.fontSize,
            fontSizeUnit: this.state.fontSizeUnit,
            align: e.target.value
        }]);
    }

    renderSettings() {
        return (<>
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
        return (
            <div className="editor-text">
                {/* <div className="tools">
                    {
                        this.state.arr?.map(elem => (
                            <button key={elem} type="button" onClick={this.useTool.bind(this, elem)} >{elem}</button>
                        ))
                    }
                </div> */}
                {/* onKeyDown={this.updateCur.bind(this)} onClick={this.updateCur.bind(this)} */}
                <div
                    className="editor-text-box"
                    contentEditable={true}
                    placeholder="click to add text"
                    onInput={this.updateView.bind(this)}
                    onBlur={this.updateView.bind(this)}
                    style={{
                        fontSize: `${this.state.fontSize}${this.state.fontSizeUnit}`,
                        textAlign: `${this.state.align}`
                    }}
                >
                </div>
                {this.renderSettings()}
            </div>
        )
    }
}