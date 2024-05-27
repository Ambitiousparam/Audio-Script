import React, { useState } from 'react';

const Information = () => {
  const [tab,settab] =useState("transcription")
  return (
    <main className="flex-1 flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 lg:p-20 gap-3 sm:gap-4 md:gap-5 max-w-screen-lg mx-auto">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl whitespace-nowrap">
        Your <span className="text-blue-400 font-bold">Transcription</span>
      </h1>
      <div className='flex  mx-auto bg-white border-2 border-solid border-blue-300 shadow rounded-full overflow-hidden items-center gap-2'>
        <button className='px-4 py-1 font-medium'>Transcription</button>
        <button className='px-4 py-1 font-medium'>Translation</button>


      </div>
    </main>
  );
};

export default Information;
