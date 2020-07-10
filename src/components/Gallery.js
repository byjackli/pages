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
                        <img className="image-preview" src={imageLink} alt={""} />
                    ))
                }</>);
            }
            else { return (<img className="image-preview" src={this.props.gallery} alt={""}/>); }
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
            galleryName: "untitled",
            gallery: null,
            captions: "",
        }
    }

    updateGalleryName(e) { this.setState({ galleryName: e.target.value }); }
    updateGallery(e) { this.setState({ gallery: e.target.value }); }
    updateCaptions(e) {
        let
            imageid = parseInt(e.target.id.split("imageid")[1]),
            arr = JSON.parse(localStorage.getItem(this.state.galleryName)),
            data = arr[imageid];

        data.caption = e.target.value;
        arr[imageid] = data;
        localStorage.setItem(this.state.galleryName, JSON.stringify(arr));
        
        console.info(imageid, data);
        console.info("updated data", data);
        console.info("updated arr", localStorage.getItem(this.state.galleryName));
    }

    editView() {
        let
            packed = [],
            regex = /[,\n]/g;

        if (this.state.gallery) {
            if (this.state.gallery.includes(",") || this.state.gallery.includes("\n")) {
                let
                    arr = [],
                    counter = 0,
                    raw = this.state.gallery.split(regex);

                raw.forEach(imageLink => {
                    let id = `${this.state.galleryName}imageid${counter}`;
                    if (0 < imageLink.length) {
                        arr.push(
                            <div className="vrtTL" key={id}>
                                <img className="image-preview" src={imageLink} alt={""} />
                                <input id={id} placeholder="descibe the image" onChange={this.updateCaptions.bind(this)} />
                            </div>
                        );
                        packed.push({ image: imageLink });
                        console.info("reading packed", packed);
                        counter++;
                    }
                })
                localStorage.setItem(`${this.state.galleryName}`, JSON.stringify(packed));

                return arr;
            }
            else {
                packed.push({ image: this.state.gallery });
                localStorage.setItem(`${this.state.galleryName}`, JSON.stringify(packed));
                return (
                    <div className="vrtTL">
                        <img className="image-preview" src={this.state.gallery} alt={this.state.captions} />
                        <input id={`${this.state.galleryName}imageid0`} placeholder="descibe the image" onChange={this.updateCaptions.bind(this)} />
                    </div>
                );
            }
        }
        return null;
    }

    render() {
        return (<div className="editor-gallery">
            <p>a unique gallery name is required</p>
            <input placeholder="unique gallery name" required onChange={this.updateGalleryName.bind(this)} />
            <textarea placeholder="separate each image with a , (comma)" onChange={this.updateGallery.bind(this)}></textarea>
            <div className="gallery-block">
                {this.editView()}
            </div>
        </div >)
    }
}