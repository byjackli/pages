import React from 'react';
import Panel from '../components/Panel'
import { render } from '@testing-library/react';

class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = ({
            panel: false,
            tag: null,
        })
    }

    togglePanel(e) {
        this.setState({ panel: !this.state.panel, tag: e?.target?.tagName });
    }

    render() {
        return (
            <>
                {
                    this.state.panel
                        ? <Panel togglepanel={this.togglePanel.bind(this)} location={this.state.tag}/>
                        : null
                }
                <nav onClick={this.togglePanel.bind(this)}>
                </nav>
                <main onClick={this.togglePanel.bind(this)}>
                </main>
            </>
        )
    }
}

export default Admin;