import {React, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Lightbox from "react-image-lightbox"
import {Route, Switch} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Images_Project_Pathtracing = {
  title: "Pathtraced images",
  description:
    `Made with my own pathtracer`,
  pictures: [
    "//placekitten.com/1500/500", 
    "//placekitten.com/1500/500", 
    "//placekitten.com/1500/500", 
    "//placekitten.com/1500/500", 
    "//placekitten.com/1500/500",
    "//placekitten.com/1500/500",
    "//placekitten.com/1500/500",
    "//placekitten.com/1500/500",
  ],
  image: "",
  side: "left"
};
const Images_Project_Shadertoy = {
  title: "Pathtraced images",
  description:
    `Made with my own pathtracer`,
  pictures: [
    "//placekitten.com/1500/500", 
    "//placekitten.com/1500/500", 
    "//placekitten.com/1500/500", 
    "//placekitten.com/1500/500", 
    "//placekitten.com/1500/500",
    "//placekitten.com/1500/500",
    "//placekitten.com/1500/500",
    "//placekitten.com/1500/500",
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
          <ImageProject project={Images_Project_Shadertoy} />
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

  return (
    <article className='Project'>
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
            onImageLoadError={()=>{alert("error loading")}}

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
        <ReactMarkdown source={project.description} />

        <div className='imagesBox'>
          {
            pictures.map((picture, idx)=>(
              <img 
                src={picture} 
                className='image'
                onClick={()=>{
                  setIsOpen(true)
                  setPhotoIndex(idx)
                }}
              >
              </img>
            ))

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