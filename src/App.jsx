import { useState } from 'react';
import Homepage from './components/Homepage';
import Header from './components/Header';
import FileDisplay from"./components/Filedisplay"

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);

  const isaudioavailable = file || audioStream

 function handleaudioreset(props){
    setFile(null)
    setAudioStream(null)
  }

  return (
    <div className="flex flex-col m-w-[1000px] m-auto w-full">
      <section className="min-h-screen flex flex-col">
       <Header/>
       { isaudioavailable ?(
        <FileDisplay file ={file} audioStream={setAudioStream} />
       ):(<Homepage setFile={setFile} setAudioStream={setAudioStream}/>)}
      </section>
   

      <footer></footer>
    </div>
  );
}

export default App;
