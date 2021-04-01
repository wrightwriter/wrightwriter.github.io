import {React, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Lightbox from "react-image-lightbox"
import {Route, Switch} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ModalVideo from 'react-modal-video'




const Images_Project_Pathtracing = {
  title: "Pathtraced",
  description:
    `Made with my own pathtracer. Everything is generated with isosurface SDFs, defined with math functions.`,
  pictures: [
    require("../images/pathtraced/Ha2Ch0D.png").default,
    require("../images/pathtraced/Hhdk6NsUzCUWqcE4gnJieEEyKSKS8vt737P2VPffLRXxkbz7BZnD8Efmjz5R9f6P8CJBYa1YeaSScAAAAASUVORK5CYII.png").default,
    require("../images/pathtraced/flowers.png").default,
    require("../images/pathtraced/unknown.png").default,
    // require("../images/pathtraced/QUacfvYAhZ9Jg8QBvZ0dscD3KGWEbNKpWm4wPcBqugJWgkLHX5TY4j3TDr4O9Q9rqb0LuiZL3gAAAABJRU5ErkJggg.png").default,
  ],
  image: "",
  side: "left"
};
const Images_Project_Generative = {
  title: "Generative",
  description:
    `Varius mediums. All created with code.`,
  pictures: [
    require("../images/generative/unknown.png").default,
    require("../images/generative/soDroUS.gif").default,
    require("../images/generative/1fFAAAAABJRU5ErkJggg.png").default,
    require("../images/generative/P0y3BNk6U271AAAAAElFTkSuQmCC.png").default,
    require("../images/generative/uPcWTedBzgAAAABJRU5ErkJggg.png").default,
    require("../images/generative/tenor.gif").default,
    require("../images/generative/capture - 2021-02-06T155448.767.webm").default,
  ],
  image: "",
  side: "left"
};
const Images_Project_Paintings = {
  title: "Paintings/ Sculptures",
  description:
    ``,
  pictures: [
    require("../images/paintings/306.png").default,
    require("../images/paintings/307-c.png").default,
    require("../images/paintings/308-c.png").default,
    require("../images/paintings/not305.png").default,
    require("../images/paintings/290-a-c.png").default,
    require("../images/paintings/302-o.png").default,
    // require("../images/paintings/unknown.png").default,
  ],
  image: "",
  side: "left"
};

const Images_Project_Renders = {
  title: "Renders",
  description:
    ``,
  pictures: [
    require("../images/renders/untitled10.png").default,
    require("../images/renders/untitled11_2.png").default,
    require("../images/renders/houdinifx_1b0usqcbZW.png").default,
    // require("../images/renders/untitled12.png").default,
    // require("../images/paintings/unknown.png").default,
  ],
  image: "",
  side: "left"
};


export default function Projects() {
  return (
    <div className='Page'>
      <div className='Projects'>
        <Category title='Visual/ GFX Programming'>
          <ImageProject project={Images_Project_Pathtracing} />
          <ImageProject project={Images_Project_Generative} />
          <ImageProject project={Images_Project_Paintings} />
          <ImageProject project={Images_Project_Renders} />
        </Category>
        <Category title='Audio'>
        </Category>
      </div>
    </div>
  );
}
function ImageProject(props){
  let project = props.project;
  let pictures = props.project.pictures;

  let imgStyle;

  project.side == "left" ? imgStyle ={float: "left"} : imgStyle = {float: "right"};

  const [photoIndex, setPhotoIndex]= useState(0)
  const [isOpen, setIsOpen]= useState(false)
  const [isVideoOpen, setIsVideoOpen]= useState(false)

  return (
    <article className='Project'>
        <ModalVideo channel='custom' autoplay loop isOpen={isVideoOpen} url={pictures[photoIndex]} onClose={() => setIsVideoOpen(false)} />
        {isOpen && pictures && (
          <Lightbox
            mainSrc={pictures[photoIndex]}
            nextSrc={pictures[(photoIndex + 1) % pictures.length]}
            prevSrc={pictures[(photoIndex + pictures.length - 1) % pictures.length]}
            onCloseRequest={
              ()=>{
                setIsOpen(false)
              }
            }
            // onImageLoadError={()=>{alert("error loading")}}

            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + pictures.length - 1) % pictures.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex(
                (photoIndex + 1) % pictures.length,
              )
            }
          />
        )}
      {/* {project.image ? <img style={imgStyle} src={project.image} /> : <>no img</>} */}
      <div className='text'>
        <div className='title'>{project.title}</div>
        <ReactMarkdown className="description" source={project.description} />

        <div className='imagesBox'>
          {
            pictures.map((picture, idx)=>{

              if( picture.split(".")[picture.split(".").length - 1] === "webm"){
                return <>
                {/* <video controls="" autoplay="" name="media"><source src="http://localhost:3000/static/media/capture%20-%202021-02-06T155448.767.fe4671f6.webm" type="video/webm"></video> */}
                <video width="460" height="230" frameborder="0" autoplay="" loop="" playsinline="" allowfullscreen="" tabindex="-1" class="image mtz-vlc-pboid"
                  onClick={ ()=> { setPhotoIndex(idx);setIsVideoOpen(true) }}>
                  <source src={pictures[idx]} />
                  </video>
                  </>


              } else{
                return <img 
                  src={picture} 
                  className='image'
                  onClick={()=>{
                    setIsOpen(true)
                    setPhotoIndex(idx)
                  }}
                >
                </img>

              }

            }
            )

          }

          <div>
  
          </div>
        </div>
      </div>
    </article>
  );

}

function Category(props) {
  return (
    <div className='Category'>
      <div className='CategoryTitle'>
        <div>{props.title}</div>
      </div>
      {props.children}
    </div>
  );
}

function Project(props) {
  let project = props.project;

  let imgStyle;

  project.side == "left" ? imgStyle ={float: "left"} : imgStyle = {float: "right"};


  return (
    <article className='Project'>
      {project.image ? <img style={imgStyle} src={project.image} /> : <>no img</>}
      <div className='text'>
        <div className='title'>{project.title}</div>

        <div className='description'>
          <ReactMarkdown source={project.description} />
        </div>
      </div>
    </article>
  );
}


const Audio_Project1 = {
  title: "SyncFO",
  description:
    `This is a plugin for the digital audio workstation Ableton Live. It acts as an LFO, whose speed can me modulated by a MIDI signal. Signal shape be changed and speed - manipulated.   
    [Download](imgur.com)`,
  pictures: ["", ""],
  image: "https://i.imgur.com/SNU8hFi.jpg",
  side: "left"
};
const Audio_Project2 = {
  title: "Hallucinator",
  description: "This is a Max For Live audio device, which can change things.",
  pictures: ["", ""],
  image: "https://i.imgur.com/SNU8hFi.jpg",
  side: "right"
};

const Script_Project1 = {
  title: "Soundcloud Demetricator",
  description: "This",
  image: "https://i.imgur.com/SNU8hFi.jpg",
  side: "left"

}