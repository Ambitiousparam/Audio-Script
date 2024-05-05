import React from 'react';

export default function Homepage(props) {
    const {setAudioStream,setFile}= props
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-20 gap-3 sm:gap-4 md:gap-5">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Audio <span className="text-blue-400 bold"> Script</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span>Transcribe<span className="text-blue-400">&rarr;</span>Translate
      </h3>
      <button className=' px-4 py-2 rounded-lg specialbtn flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
        <p className='text-blue-400'>Record</p>
        <span><i class="fa-solid fa-microphone"></i>
        </span>
 
      </button>
      <p>Or <label className='text-blue cursor-pointer hover:text-blue-400 duration-200'>Upload <input onChange={} className='hidden'type="file" accept='.mp3,.wave'></input></label> a mp3 file</p>
      <p className="italic text-slate-500">Free now free forever</p>
      
    </main>
  );
};


