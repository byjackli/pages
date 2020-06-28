import React from 'react';

class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: ["bold", "italics", "strike", "underline", "large", "normal", "small"],
            text: null
        }
    }

    useTool(e, data) {
        console.info("text selected:", window.getSelection().toString());
        console.info("using tool:", data);
    }
    updateView(e) { this.setState({ text: e.target.value }); }

    render() {
        return (
            <div className="editor">
                <div className="tools">
                    {
                        this.state.arr?.map(elem => (
                            <button key={elem} type="button" onClick={this.useTool.bind(this, elem)} >{elem}</button>
                        ))
                    }
                </div>
                <textarea placeholder="click to add text" onChange={this.updateView.bind(this)}>
                </textarea>
                <div className="preview">

                    <strong>PREVIEW:</strong>
                    <div dangerouslySetInnerHTML={{__html: this.state.text}}>
                    </div>
                </div>
            </div>
        )
    }
}

export default Text;