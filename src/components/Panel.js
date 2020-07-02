import React from 'react';
import { IndexInput } from '../components/Index';
import { TextInput, TextBlock } from '../components/Text';
import { ImageInput } from '../components/Image';
import { GalleryInput } from '../components/Gallery';
import { SocialInput } from '../components/Social';
import { LinksInput } from '../components/Links';
import { SpacerInput } from '../components/Spacer';

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

        if (this.props.type === "index") { return <IndexInput /> }
        else if (this.props.type === "text") { return <TextInput /> }
        else if (this.props.type === "image") { return <ImageInput /> }
        else if (this.props.type === "gallery") { return <GalleryInput /> }
        else if (this.props.type === "social") { return <SocialInput /> }
        else if (this.props.type === "links") { return <LinksInput /> }
        else if (this.props.type === "spacer") { return <SpacerInput /> }


    }

    render() {

        if (this.props.tag === this.props.location) {
            return (<div className="editor">
                {this.toggleEditor()}
                <button type="button" onClick={this.props.closepanel} >SAVE</button>
                <button type="button" onClick={this.props.closepanel} >CANCEL</button>
            </div>)
        }

        else { return null; }
    }

}