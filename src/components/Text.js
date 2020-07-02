import React from 'react';

export class TextBlock extends React.PureComponent {
    render() {
        return (<div className="text-block">
            <p>{this.props.text}</p>
        </div>)
    }
}

export class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: ["bold", "italics", "strike", "underline", "large", "normal", "small"],
            text: null
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
            textChange = e.target.value;

        // str !== null && 1 < str.length
        //     ? textChange = `${str.slice(0, this.state.posStart)}${e.target.value.slice(this.state.posStart, tail)}${str.slice(this.state.posEnd, str.length)}` 
        //     : textChange = e.target.value;

        this.setState({ text: textChange });
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
                <textarea placeholder="click to add text" onChange={this.updateView.bind(this)}>
                </textarea>
            </div>
        )
    }
}