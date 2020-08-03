import React from 'react';
import { IndexInput } from '../components/Index';
import { TextInput } from '../components/Text';
import { ImageInput } from '../components/Image';
import { GalleryInput } from '../components/Gallery';
import { SocialInput } from '../components/Social';
import { LinkInput } from './Link';
import { SpacerInput } from '../components/Spacer';

export class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: ["index", "text", "link", "image", "gallery", "social", "spacer"],
        }
    }

    renderComponent(e, data) { this.props.updateeditor(this, data); }

    render() {
        return (
            <div className="panel" style={{ top: window.event.clientY, left: window.event.clientX }}>
                {
                    this.state.arr?.map(elem => (
                        <button key={elem} type="button" onClick={this.renderComponent.bind(this, elem)}>{elem}</button>
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
            type: null,
            data: null,
        })
    }

    setData(input) {
        this.setState({
            type: input[0],
            data: input[1],
        });
        console.log("from panel - type in state", this.state.type)
        console.log("from panel - data in state", this.state.data)
        console.log("from panel - type from input", input[0])
        console.log("from panel - data from input", input[1])
    }

    toggleEditor(data) {
        if (this.props.type === "index") { return <IndexInput save={this.setData.bind(this)} /> }
        else if (this.props.type === "text") { return <TextInput save={this.setData.bind(this)} /> }
        else if (this.props.type === "link") { return <LinkInput save={this.setData.bind(this)} /> }
        else if (this.props.type === "image") { return <ImageInput save={this.setData.bind(this)} /> }
        else if (this.props.type === "gallery") { return <GalleryInput save={this.setData.bind(this)} /> }
        else if (this.props.type === "social") { return <SocialInput save={this.setData.bind(this)} /> }
        else if (this.props.type === "spacer") { return <SpacerInput save={this.setData.bind(this)} /> }
    }

    save() {
        if (this.state.type !== null) {
            let arr = [];
            if (localStorage.getItem(`save${this.props.location}`)) { arr = JSON.parse(localStorage.getItem(`save${this.props.location}`)); }

            arr.push(JSON.stringify({
                type: this.state.type,
                data: this.state.data,
            }))

            localStorage.setItem(`save${this.props.location}`, JSON.stringify(arr));
        }
        this.props.closeeditor();
    }

    render() {

        if (this.props.tag === this.props.location) {
            return (<div className="editor">
                {this.toggleEditor()}
                <button type="button" onClick={this.save.bind(this)} >SAVE</button>
                <button type="button" onClick={this.props.closeeditor} >CANCEL</button>
            </div>)
        }

        else { return null; }
    }

}