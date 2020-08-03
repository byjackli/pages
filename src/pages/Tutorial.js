import React from 'react';
import { database } from "../config/firebase";
import { Panel, Editor } from '../components/Panel';

class Tutorial extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            exists: true,
        }
    }

    componentWillMount() {
        // this.checkPageExist();
    }


    checkPageExists() {

    }

    renderSteps() {
        if (this.state.step === 1) { return this.renderStep1; }         // overall layout (navbar and main content)
        else if (this.state.step === 2) { return this.renderStep2; }    // toolbar (add new content, adjust colors) 
        else if (this.state.step === 2) { return this.renderStep2; }    // remove (add new content, adjust colors)
        else if (this.state.step === 3) { return this.renderStep3; }    // sidebar (adding/removing pages)
        else if (this.state.step === 4) { return this.renderStep4; }    // top bar (save as draft and publish page)
    }

    renderStep1() {
        return (<div>

        </div>)
    }

    render() {
        return (<>
            {this.renderSteps()}
            <div>
                <button>SKIP TUTORIAL</button>
            </div>
            {/* {this.renderSavePanel()} */}
            {
                this.state.panel
                    ? <Panel updateeditor={this.updateEditor.bind(this)} location={this.state.tag} />
                    : null
            }
            <nav onClick={this.state.allow ? this.togglePanel.bind(this) : null}>
                {/* {this.renderContent(localStorage.getItem("nav-data"))} */}
                {!this.state.allow
                    ? <Editor location="NAV" tag={this.state.tag} type={this.state.editor} closepanel={this.closePanel.bind(this)} />
                    : null
                }
            </nav>
            <main onClick={this.state.allow ? this.togglePanel.bind(this) : null}>
                {/* {this.renderContent(localStorage.getItem("main-data"))} */}
                {!this.state.allow
                    ? <Editor location="MAIN" tag={this.state.tag} type={this.state.editor} closepanel={this.closePanel.bind(this)} />
                    : null
                }
            </main>
        </>)
    }
}

export default Tutorial