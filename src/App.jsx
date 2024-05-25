import { useState, useEffect } from 'react';
import Homepage from './components/Homepage';
import Header from './components/Header';
import Information from "./components/information";
import Transcribing from './components/transcribing';
import FileDisplay from './components/Filedisplay';

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(true);
  const [loading, setoading] = useState(false);

  const isaudioavailable = file || audioStream;

  function handleaudioreset() {
    setFile(null);
    setAudioStream(null);
  }

  useEffect(() => {
    console.log(audioStream);
  }, [audioStream]);

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
