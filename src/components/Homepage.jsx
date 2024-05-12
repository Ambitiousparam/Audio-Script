import React from 'react';
import { useState,useEffect,useRef} from 'react';

export default function Homepage(props) {
    const {setAudioStream,setFile}= props

    const [recordingStatus,setrecordingStatus]= useState("inactive");
    const [audiochunks,setaudiochunks]= useState([])
    const [duration,setDuration] = useState(0);
    
    const mediarecorder =useRef(null);

    const mimeType =  "audio/webm"

    async function startrecording(){
      let tempStream

      console.log("start recording")
      try{
        const streamdata = navigator.mediaDevices.getUserMedia({
          audio:true,
          video:false
        })
        tempstream=streamdata

      }catch(err){
        console.log(err.message);
        return
      }

      const media = new mediarecorder(tempstream,{temp:mimetype})
      mediarecorder.current= media
      mediarecorder.current.start()
      let localaudiochunks =[]
      mediarecorder.current.ondataavalaible =(event)=>{
        if(typeof event.data=== "undefined"){return}
        if(event.data.size ===  0 ){return}

        setaudiochunks(localaudiochunks)

      }
    }

    async function stoprecording(){
      setrecordingStatus('inactive')
      console.log('stop recording')

      mediarecorder.current.stop()
      mediarecorder.current.onstop=()=>{
        const audioblob =new Blob(audiochunks,{type:mimetype})
        setAudioStream(audioblob)
        setaudiochunks([] )
        setDuration(0)
      }
    }

    useEffect(()=>{
      if( recordingStatus==='inactive ') {return}
      const interval = setinterval(()=>{
        setDuration(curr=>curr+1)

      },1000)
      return()=>clearInterval(interval)

    })
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-20 gap-3 sm:gap-4 md:gap-5">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Audio <span className="text-blue-400 bold"> Script</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span>Transcribe<span className="text-blue-400">&rarr;</span>Translate
      </h3>
      <button className=' px-4 py-2 rounded-lg specialbtn flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
        <p className='text-blue-400'>{recordingStatus=== 'inactive'? 'Record':'stop recording'}</p>
        <div className='flex items-center gap-2'>
          {duration && (
            <p className='text-sm '>{duration}s</p>
          )}

        </div>
        <span><i className="fa-solid fa-microphone"></i>
        </span>
 
      </button>
      <p>Or <label className='text-blue cursor-pointer hover:text-blue-400 duration-200'>Upload <input onChange={(e)=>{
        const tempfile =e.target.files[0]
        setFile(tempfile)

      }} className='hidden'type="file" accept='.mp3,.wave'></input></label> a mp3 file</p>
      <p className="italic text-slate-500">Free now free forever</p>
      
    </main>
  );
};


