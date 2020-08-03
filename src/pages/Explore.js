import React from 'react';

class Explore extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            exists: true,
        }
    }

    componentDidMount() {
        // this.checkPageExist();
    }


    checkPageExists() {

    }

    render() {
        return (<>
            <main className="explore vrtTC">
                <h1>explore other pages</h1>
                <p>created by other awesome people on the internet!</p>
                <div className="gallery-block">
                    <div className="node-block vrtCC">
                        <img src="//i.imgur.com/zAXnWxK.jpg" />
                        <div className="data">
                            <p>
                                <span aria-label="name of website" className="style2">Poll Trip 2</span>&nbsp;
                                <span aria-label="author of website">byjackli</span>
                            </p>
                            <p aria-label="description of website">description of website</p>
                            <button href="#">view</button>
                        </div>
                    </div>
                </div>
            </main>
        </>)
    }
}

export default Explore