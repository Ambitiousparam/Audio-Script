import { Pipeline } from "@xenova/transformers";
class MyTranscriptionPipeline{
    static task = 'automatic-speech-recognition'
    static model = 'openai/whisper-tiny.en'
    static instance = null

    static async getInstance = (progress_callback = null){
        
    }
}