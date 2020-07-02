import React from 'react';

export class GalleryBlock extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    /* ===== preview gallery ===== 
     * if multiple links, render list
     * else render the single link
     */
    renderGallery() {
        if (this.props.gallery) {
            let regex = /[,\n]/g;
            if (this.props.gallery.includes(",") || this.props.gallery.includes("\n")) {
                let raw = this.props.gallery.split(regex);
                return (<>{
                    raw.map(imageLink => (
                        <img className="image-preview" src={imageLink} />
                    ))
                }</>);
            }
            else { return (<img className="image-preview" src={this.props.gallery} />); }
        }
        return null;
    }

    render() {
        return (<div className="gallery-block">
            {this.renderGallery()}
        </div>)
    }
}

export class GalleryInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            gallery: null,
        }
    }

    updateGallery(e) { this.setState({ gallery: e.target.value }); }

    render() {
        return (<div className="editor-gallery">
            <textarea placeholder="separate each image with a , (comma)" onChange={this.updateGallery.bind(this)}>

            </textarea>
            <GalleryBlock gallery={this.state.gallery} />
        </div>)
    }
}