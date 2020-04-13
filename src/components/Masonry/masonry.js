import * as React from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0,
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
};

class Gallery extends React.Component {

   render() {
        const islandoraNodes = this.props.islandora_data.map(function(obj_data){
            return (
                <div key={obj_data.uuid} className="grid-item">
                    <div className="grid-item-inner">
                        <a href={obj_data.path} title={obj_data.name} target="_blank">
                            <img src={obj_data.img_src} alt={obj_data.name}/>
                            <h2>{obj_data.name}</h2>
                        </a>
                    </div>
                </div>
            );
        });

        return (
            <Masonry
                className={'grid'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
                <div className="grid-sizer"></div>
                {islandoraNodes}
            </Masonry>
        );
    }
}

export default Gallery;