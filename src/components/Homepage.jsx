import React, { useState, useEffect, useRef } from 'react';

export default function Homepage(props) {
    const { setAudioStream, setFile } = props;

    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(0);

    const mediaRecorder = useRef(null);

    const mimeType = "audio/webm";

    async function startRecording() {
        let tempStream;

        console.log("start recording");
        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            tempStream = streamData;
        } catch (err) {
            console.log(err.message);
            return;
        }

        setRecordingStatus('recording');

        const media = new MediaRecorder(tempStream, { mimeType: mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                localAudioChunks.push(event.data);
            }
        };

        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(localAudioChunks, { type: mimeType });
            setAudioStream(audioBlob);
            setAudioChunks([]);
            setDuration(0);
        };
    }

    async function stopRecording() {
        setRecordingStatus('inactive');
        console.log('stop recording');

        mediaRecorder.current.stop();
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') { return; }
        const interval = setInterval(() => {
            setDuration(curr => curr + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [recordingStatus]);

    return (
        <main className="flex-1 flex flex-col justify-center items-center p-20 gap-3 sm:gap-4 md:gap-5">
            <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
                Audio <span className="text-blue-400 bold"> Script</span>
            </h1>
            <h3 className="font-medium md:text-lg">
                Record <span className="text-blue-400">&rarr;</span>Transcribe<span className="text-blue-400">&rarr;</span>Translate
            </h3>
            <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className='px-4 py-2 rounded-lg specialbtn flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
                <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : 'Stop Recording'}</p>
                <div className='flex items-center gap-2'>
                    {duration && (
                        <p className='text-sm'>{duration}s</p>
                    )}
                    <i className={"fa-solid fa-microphone" + (recordingStatus === 'recording' ? ' text-rose-300' : '')}></i>
                </div>
            </button>
            <p>Or <label className='text-blue cursor-pointer hover:text-blue-400 duration-200'>Upload <input onChange={(e) => {
                const tempFile = e.target.files[0];
                setFile(tempFile);
            }} className='hidden' type="file" accept='.mp3,.wav'></input></label> a mp3 or wav file</p>
            <p className="italic text-slate-500">Free now free forever</p>
        </main>
    );
};
