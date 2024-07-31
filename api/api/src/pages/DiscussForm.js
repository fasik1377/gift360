/* eslint-disable no-useless-escape */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ReactMarkdown from "react-markdown";

import Fade from 'react-reveal/Fade';
import Form from './elements/Form';
import Button from './elements/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoPlayer from '../Components/VideoPlayer';

export default function DiscussForm(props) {
  // video display
  const [videoId, setVideoId] = useState(null)

  function playVideo(e, videoId){
    e.preventDefault()
    setVideoId(videoId)
  }


//post text to AI
  const [post, setPost]=useState({
    text: '',
})
  const handleInput = (event) =>{
    setPost({...post, [event.target.name]:event.target.value})

  }


  const { data, resetForm } = props;

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

 const handleSubmit=()=>
  {
    fetch("/users_text",{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(post)
  });
}


 /* const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);*/

/*  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take upto 10 seconds");
    try {
      console.log("Step 1/6:  Fetching Auth token: Running ");
      const token = await comman.getToken(CLIENT_ID, CLIENT_SECRET);

      console.log("Step 2/6 Status: in-progress Generating Video Preview Step.");
      const jobid = await comman.createPreviewStoryboard(token);

      console.log("Step 3/6 Status: Waiting for Video Preview.");
      const data = await comman.waitForStoryboardJobToComplete(token, jobid);

      console.log("Step 4/6 : Status: in-progress sending Video Generation Request.");
      const rander_jobid = await comman.createVideoRender(token, data);

      console.log("Step 5/6: Video generation Request Sent. now waiting for video generation to complete video");
      const url = await comman.waitForRenderJobToComplete(token, rander_jobid);

      comman.downloadVideo(url, "texttovideo.mp4");
      console.log("Completed: Video downloaded with name texttovideo.mp4 complete");

      setAnswer(
        response[url]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }*/

  return (

    <section className="flex flex-col container mx-auto mt-10 justify-center">
    
    <div>
     {(typeof backendData.users === 'undefined')? (
       <p>Loading...</p>
     ):(
       backendData.users.map((user,i)=>(
         <p key={i}>{user}</p>
       ))
     )}
   </div>
   
   <div className="App">
      {videoId && <VideoPlayer videoId={videoId}></VideoPlayer>} <br />
      <button className="text-xl mx-auto px-12 py-3 mt-5 bg-theme-yellow text-black rounded-full border-2 border-theme-yellow hover:bg-dark-theme-red border-red-800 transition duration-200 focus:outline-none" onClick={(e)=>{playVideo(e, 'cdn')}}>Play Video</button>
    </div>

      <Fade bottom>
        <h1 className="text-5xl text-theme-red text-center font-bold">Lets Discuss</h1>

        <p className="font-light text-lg text-gray-400 text-center mb-12">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Please fill out the form below to discuss your gift and we'll get back to you soon in video format.
        </p>

        <div className="flex flex-col">
          <div className="mx-auto">
            <Form
              id="projectIdea"
              name="projectIdea"
              type="textarea"
             onChange={(ai)=>handleInput(ai)}
              placeholder="Explain about your gift idea"
              className=""
            />
          </div>

          <Button
            className="text-xl mx-auto px-12 py-3 mt-5 bg-theme-yellow text-black rounded-full border-2 border-theme-yellow hover:bg-dark-theme-red border-red-800 transition duration-200 focus:outline-none"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Fade>

      <Fade bottom>


        <div className="flex flex-col">

          <div className="mx-auto"><video width="750" height="500" controls >
            <source src="./Videos/video1.mp4" type="video/mp4" />
          </video>
          </div>
        </div>
      </Fade>

      <Fade bottom>
        <h1 className="text-5xl text-theme-red text-center font-bold">Lets Discuss</h1>

        <p className="font-light text-lg text-gray-400 text-center mb-12">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Please upload video to discuss your gift and we'll get back to you soon in text format.
        </p>

        <div className="flex flex-col">

          <div className="mx-auto"><input type="file" />
          </div>

          <Button
            className="text-xl mx-auto px-12 py-3 mt-5 bg-theme-yellow text-black rounded-full border-2 border-theme-yellow hover:bg-dark-theme-red border-red-800 transition duration-200 focus:outline-none"
            type="button"
          >
            Submit
          </Button>

        </div>
      </Fade>
      <div className="mx-auto">
        <Form
          id=""
          name=""
          type="textarea"
         // value={data.projectIdea}
          placeholder="The text should be displayed here"
          className=""
          //onChange={props.onChange}
        />
      </div>
      <ToastContainer />

    </section>
  );
}
