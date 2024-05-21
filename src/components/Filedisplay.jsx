import React from 'react';

export default function FileDisplay(props) {
  const { handleaudioreset, file, audioStream } = props;
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-20 gap-3 sm:gap-4 md:gap-5  mx-w-full  sm-w-96 mx-w-auto">
      <h1 className="font-semibold text-5xl sm:text-6xl  md:text-7xl">
        Your <span className="text-blue-400 bold">File</span>
      </h1>
      <div className=' my-4 mx-auto flex flex-col text-left'>
        <h3 className='font-semibold'>
          Name
        </h3>
        <p>{file ? file?.name :'custom audio'}</p> 
      </div>
      <div className='flex items-center justify-between gap-4'>
        <button onClick={handleaudioreset} className=' hover:text-blue-400 duration-200'>Reset</button>
        <button className='flex items-center font-medium specialbtn px-3 py-2 rounded-lg gap-2 text-blue-400'>
        <p>Transcribe</p>  <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
}
