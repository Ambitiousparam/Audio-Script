import React, { useState } from 'react';
import Transcription from './transcription';
import Translation from './translation';

const Information = () => {
  const [tab,setTab] =useState("transcription")
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 lg:p-20 gap-3 sm:gap-4 md:gap-5 max-w-screen-lg mx-auto">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl whitespace-nowrap">
        Your <span className="text-blue-400 font-bold">Transcription</span>
      </h1>
      <div className='flex  mx-auto bg-white border-2 border-solid border-blue-300 shadow rounded-full overflow-hidden items-center gap-2'>
      <button onClick={() => setTab('transcription')} className={'px-4 rounded duration-200 py-1 ' + (tab === 'transcription' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 rounded duration-200 py-1  ' + (tab === 'translation' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Translation</button>


      </div>
      {tab ==="translation" ?(
        <Translation/>
        ):(
          <Transcription/>
        )}
        
        
      
    </main>
  );
};

export default Information;
