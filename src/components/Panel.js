import React from 'react';
import Index from '../components/Index';
import Text from '../components/Text';
import Image from '../components/Image';
import Gallery from '../components/Gallery';
import Social from '../components/Social';
import Links from '../components/Links';
import Spacer from '../components/Spacer';

export class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: ["index", "text", "image", "gallery", "social", "links", "spacer"],
        }
    }

    renderComponent(e, data) {
        { this.props.updateeditor(this, data); }
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
                            <input type="text" placeholder="hex-code color" />
                        </div>
                        : console.log("click identified:", "within main content")
                }
            </div >
        )
    }
}

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
        })
    }

    toggleEditor(data) {
        console.log(this.state.tag)

        if (this.props.type === "index") { return <Index /> }
        else if (this.props.type === "text") { return <Text /> }
        else if (this.props.type === "image") { return <Image /> }
        else if (this.props.type === "gallery") { return <Gallery /> }
        else if (this.props.type === "social") { return <Social /> }
        else if (this.props.type === "links") { return <Links /> }
        else if (this.props.type === "spacer") { return <Spacer /> }


    }

    render() {

        if (this.props.tag === this.props.location) {
            return (<>
                < button type="button" onClick={this.props.closepanel} >CLOSE</button>
                {this.toggleEditor()}
            </>)
        }

        else { return null; }
    }

}