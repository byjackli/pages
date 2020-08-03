import React from 'react';

class Page extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            owner: false,
        }
    }

    componentWillMount() {
        // this.checkOwner();
    }

    checkOwner() {

    }
    renderAdmin() {
        return null;
    }

    render() {
        return (<>
            {
                this.state.owner
                    ? this.renderAdmin()
                    : null
            }
            <nav>

            </nav>
            <main>

            </main>
        </>)
    }
}

export default Page