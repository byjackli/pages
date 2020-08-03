import React from 'react';
import crypto from 'crypto';
import Tutorial from '../pages/Tutorial';
import salt from '../config/salt';
import firebase, { database } from '../config/firebase';
import { Panel, Editor } from '../components/Panel';

import { TextBlock } from '../components/Text';
import { LinkBlock } from '../components/Link';
import { ImageBlock } from '../components/Image';
import { GalleryBlock } from '../components/Gallery';
import { SocialBlock } from '../components/Social';
import { SpacerBlock } from '../components/Spacer';

class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            panel: false,
            editor: false,
            tag: null,

            allow: true,
            tutorial: false,
        })
    }

    componentDidMount() {
        // this.initAdmin();
        this.checkTutorial();
    }

    /**
     * Checks if user should be taken through the tutorial mode.
     */
    checkTutorial() {
        firebase.auth().onAuthStateChanged(user => {
            database.collection("users").doc(user.uid).collection("pages").doc("default").get()
                .then(doc => {
                    if (doc.exists) { this.setState({ tutorial: true, }); }
                    else { this.setState({ tutorial: false, }); }
                })
        })
    }
 
    /**
     * Retreives page content from database.
     */
    initAdmin() {
        database.collection("users").doc(this.state.user).collection("pages").get()
            .then(snapshot => {
                console.log("raw snapshot", snapshot)
                if (snapshot) {
                    let rawData = new Map();
                    snapshot.docs.forEach(doc => { rawData.set(doc.id, doc.data()) })
                    crypto.pbkdf2(JSON.stringify(rawData), salt, 1000, 512, "sha512", (err, derivedKey) => {

                        console.info("error detected:", err);
                        console.info("derived key:", derivedKey);

                        this.setState({
                            siteData: derivedKey,
                        })
                        localStorage.setItem("siteData", derivedKey);
                    });
                }
            })
    }

    /**
     * Closes editor panel.
     */
    closeEditor() { this.setState({ allow: true }); }

    /**
     * Toggles panel that contains a list of editor tool options.
     * 
     * @param e - The observable event.
     */
    togglePanel(e) {
        let location = "MAIN"
        if (window.event.clientX < window.innerWidth * .3) { location = "NAV" }
        this.setState({
            panel: !this.state.panel,
            tag: location,
        });
    }

    warning(event) {
        event.preventDefault();
        return alert("you have unsaved changes. are you sure you want to exit without saving?");
    }

    /** 
     * Updates the editor with the correct editing tools.
     * 
     * @param {Object} data the attached object 
     * 
     * panel(boolean) is set to false when the editor is active, only one active editor at a time.
     * editor(string) is set to which ever button was selected, presents the correct editor.
     * allow(boolean) is set to false when editor is activate, handles the state of editor.
     */
    updateEditor(e, data) {
        this.setState({
            panel: !this.state.panel,
            editor: data?.target.innerText,

            allow: false,
        });
    }

    /**
     * Saves edits to local storage to avoid exceeding firebase document quotas.
     */
    saveEdits() {
        localStorage.setItem("edits", JSON.stringify)
    }

    /**
     * Logs out user (via firebase) and redirects them to homepage.
     */
    logout() {
        firebase.auth().signOut().then(() => {
            localStorage.clear();
            window.location.replace("/")
        })
    }

    /**
     * Populates individual page with data.
     * 
     * @param {array} data Array of JSON objects, data values that make up the content blocks 
     * @returns An array of JSX Elements, content blocks. 
     */
    renderContent(data) {
        if (data) {
            let arr = [];
            data.forEach(elem => {
                let block = JSON.parse(elem);

                if (block.type === "text") {
                    arr.push(<TextBlock fontSize={block.data.fontSize} fontSizeUnit={block.data.fontSizeUnit} align={block.data.align} text={block.data.text} />)
                }
                else if (block.type === "link") {
                    arr.push(<LinkBlock fontSize={block.data.fontSize} fontSizeUnit={block.data.fontSizeUnit} link={block.data.link} label={block.data.label} align={block.data.align} />)
                }
                else if (block.type === "image") {
                    arr.push(<ImageBlock />)
                }
                else if (block.type === "gallery") {
                    arr.push(<GalleryBlock packedData={block.data.packedData} />)
                }
                else if (block.type === "social") {
                    arr.push(<SocialBlock />)
                }
                else if (block.type === "spacer") {
                    arr.push(<SpacerBlock />)
                }

            })

            return arr;
        }
    }

    /**
     * Renders admin navigator panel.
     * 
     * @returns JSX Element for admin navigator panel.
     */
    renderSavePanel() {
        return (<div className="save-panel hrzBT">
            <div>
                <strong><a href="https://byjackli.com">explore more byjackli</a></strong>&nbsp;
                <button onClick={this.logout.bind(this)}>Log Out</button>
            </div>
            <div>
                <button onClick={this.saveEdits.bind(this, "draft")}>Save</button>
                <button onClick={this.saveEdits.bind(this, "publish")}>Publish</button>
            </div>
        </div>)
    }

    /**
     * Enables admin editing features.
     * 
     * @returns JSX Element for the admin view of the page.
     */
    renderAdmin() {
        return (
            <>
                {this.renderSavePanel()}
                {
                    this.state.panel
                        ? <Panel updateeditor={this.updateEditor.bind(this)} location={this.state.tag} />
                        : null
                }
                <nav onClick={this.state.allow ? this.togglePanel.bind(this) : null}>
                    {this.renderContent(JSON.parse(localStorage.getItem("saveNAV")))}
                    {!this.state.allow
                        ? <Editor location="NAV" tag={this.state.tag} type={this.state.editor} closeeditor={this.closeEditor.bind(this)} />
                        : null
                    }
                </nav>
                <main onClick={this.state.allow ? this.togglePanel.bind(this) : null}>
                    {this.renderContent(JSON.parse(localStorage.getItem("saveMAIN")))}
                    {!this.state.allow
                        ? <Editor location="MAIN" tag={this.state.tag} type={this.state.editor} closeeditor={this.closeEditor.bind(this)} />
                        : null
                    }
                </main>
            </>
        )
    }

    render() {
        return (<>{
            this.state.tutorial
                ? <Tutorial />
                : this.renderAdmin()
        }</>)
    }
}

export default Admin;