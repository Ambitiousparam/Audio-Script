import { useState, useRef, useEffect } from 'react';
import Homepage from './components/Homepage';
import Header from './components/Header';
import Information from "./components/information";
import Transcribing from './components/transcribing';
import FileDisplay from './components/Filedisplay';
import { MessageTypes } from './utils/presets';

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setloading] = useState(false);
  const [finished,setfinished] = useState(false);
  const [downloading,setdownloading] = useState(false)

  const isaudioavailable = file || audioStream;

  function handleaudioreset() {
    setFile(null);
    setAudioStream(null);
  }

  const worker =useRef(null)
  useEffect(()=>{
    if (!worker.current){
      worker.current   = new Worker(new URL('./utils/whisper.worker.js',import.meta.url),{
        type:'module'
      })
    }

    const onmessagereceived = async(e)=>{
      switch(e.data.type){
          case 'downloading':
            setdownloading(true)
            console.log("downloading")
            break;
          case 'LOADING':
            setloading(true)
            console.log("loading")
            break;
          case 'RESULT':
          setOutput(e.data.results)
          break;
           
          case 'INFERENCE_DONE':
            setfinished(true)
            console.log("Done")
            break;
      
      }
    }

    worker.current.addEventListener('message',onmessagereceived)
    return ()=>{
      worker.current.removeEventListener(
        "message",onmessagereceived
      )
    }

  },[])
  async function readaudiofrom(file){
    const sampling_rate=16000
    const audioctx = new AudioContext({sampleRate:sampling_rate})
    const response = await file.arrayBuffer()
    const  audio = decoded.getChannelData(0)
    return audio

  }

  async function handleFormSubmission(){
    if(!file && audioStream){return} 

    let audio =await readaudiofrom(file?file:audioStream)
    const model_name = 'openai/whisper-tiny.en'

    worker.current.postMessage({
      type:MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    })
     
  }
 
  

  return (
    <div className="flex flex-col max-w-[1000px] m-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isaudioavailable ? (
          <FileDisplay file={file} audioStream={audioStream} />
        ) : (
          <Homepage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
