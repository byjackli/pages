import React from 'react';
import { Panel, Editor } from '../components/Panel';
import { render } from '@testing-library/react';

class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            panel: false,
            editor: false,
            tag: null,

            allow: true,
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

    updateEditor(e, data) {
        this.setState({
            panel: !this.state.panel,
            editor: data?.target.innerText,

            allow: false,
        });
    }

    renderContent(data) {
        data
            ? JSON.parse(data)
                .then(res => {

                })
            : data = 0;
    }

    render() {
        return (
            <>
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