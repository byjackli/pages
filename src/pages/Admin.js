import React from 'react';
import crypto from 'crypto';
import salt from '../config/salt';
import { database } from '../config/firebase';
import { Panel, Editor } from '../components/Panel';

class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            panel: false,
            editor: false,
            tag: null,

            user: localStorage.getItem("user"),
            allow: true,
        })
    }

    componentDidMount() {
        // this.initAdmin();
    }

    // retreives all content from page for editing.
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

    closePanel() { this.setState({ allow: true }); }
    togglePanel(e, data) {
        console.info("selected toggle of:", data?.target.innerText)
        this.setState({
            panel: !this.state.panel,
            tag: e?.target?.tagName,
        });
    }

    warning(event) {
        event.preventDefault();
        return alert("you have unsaved changes. are you sure you want to exit without saving?");
    }

    updateEditor(e, data) {
        this.setState({
            panel: !this.state.panel,
            editor: data?.target.innerText,

            allow: false,
        });
    }
    saveEdits() {
        localStorage.setItem("edits", JSON.stringify)
    }
    logout() {
        localStorage.clear();
    }

    renderContent(data) {
        data
            ? JSON.parse(data)
                .then(res => {

                })
            : data = 0;
    }
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

    render() {
        return (
            <>
                {this.renderSavePanel()}
                {
                    this.state.panel
                        ? <Panel updateeditor={this.updateEditor.bind(this)} location={this.state.tag} />
                        : null
                }
                <nav onClick={this.state.allow ? this.togglePanel.bind(this) : null}>
                    {this.renderContent(localStorage.getItem("nav-data"))}
                    {!this.state.allow
                        ? <Editor location="NAV" tag={this.state.tag} type={this.state.editor} closepanel={this.closePanel.bind(this)} />
                        : null
                    }
                </nav>
                <main onClick={this.state.allow ? this.togglePanel.bind(this) : null}>
                    {this.renderContent(localStorage.getItem("main-data"))}
                    {!this.state.allow
                        ? <Editor location="MAIN" tag={this.state.tag} type={this.state.editor} closepanel={this.closePanel.bind(this)} />
                        : null
                    }
                </main>
            </>
        )
    }
}

export default Admin;