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
       const childElements = this.props.elements.map(function(element){
           return (
               <div key={element.uuid} className="grid-item">
                   <div className={'grid-item-inner'}>
                       <div className={'grid-item-data'}>
                           <a href={element.path} target={"_blank"} rel="noopener noreferrer">
                               <img src={element.img_src} alt={element.name} title={element.name} />
                           </a>
                           <h2>{element.name}</h2>
                       </div>
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
                {childElements}
            </Masonry>
        );
    }
}

export default Gallery;