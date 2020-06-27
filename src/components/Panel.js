import React from 'react';

class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: ["index", "text", "image", "gallery", "social", "links", "spacer"],
        }
    }

    renderComponent(e, data) {

        { this.props.togglepanel(this); }
    }

    render() {
        return (
            <div className="panel" style={{ top: window.event.clientY, left: window.event.clientX }}>
                {
                    this.state.arr?.map(elem => (
                        <button key={elem} type="button" onClick={this.renderComponent.bind(this, elem)} >{elem}</button>
                    ))
                }
                {
                    this.props.location === "NAV"
                        ? 
                        <div>
                            <input type="text" placeholder="hex-code color"/>
                        </div>
                        : console.log("click identified:", "within main content")
                }
            </div>
        )
    }
}

export default Panel;