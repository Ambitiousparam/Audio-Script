import { pipeline} from "@xenova/transformers";
import {MessageTypes} from"./presets";
class MyTranscriptionPipeline{
    static task = 'automatic-speech-recognition'
    static model = 'openai/whisper-tiny.en'
    static instance = null

    static async getInstance(progress_callback = null){
    if(this.instance===null){
        this.instance = await pipeline(this.task,null,{
            progress_callback })
    }
    return this.instance
    }
}
self.addEventListener('message',async(event)=>{
    const{type,audio}= event.data
    if(type === MessageTypes.INFERENCE_REQUEST){
        await transcribe(audio)

    }
})
async function transcribe(audio){
    sendLoadingMessage('Loading')
    let pipeline

    try{
        pipeline =await MyTranscriptionPipeline.getInstance(load_model_Callback)
    }
    catch(err){
        console.log(err.message);

    }
    sendLoadingMessage('Sucess')
    const stride_length_s = 5;
    const generationTracker = new  Generation(pipeline,stride_length_s)
    await pipeline(audio,{
        top_k :0,
        do_sample :false,
        chunk_length :30,
        stride_length_s,
        return_timestamps:true,
        call_back_function:generationTracker.chunkCallback.bind(generationTracker)

    })
    generationTracker.sendFinalResult()
}
async function load_model_callback(data){
    const{status}= data
    if(status ==='progress'){
        const{file,progress,loaded,total} = data
        sendDownloadingMessage(file,progress,loaded,total)
    }
}
function sendLoadingMessage(status){

    self.postMessage({
        type:MessageTypes.LOADING,
        status
    })
}
async function sendDownloadingMessage(file,progress,loaded,total){
    self.postMessage({
        type:MessageTypes.DOWNLOADING,
        file,
        progress,
        loaded,
        total,

    })

}
class GenerationTracker{
    constructor(pipeline,stride_length_s){
        this.pipeline = pipeline
        this.stride_length_s = stride_length_s
        this.chunks = []
        this.time_precision = pipeline?.processor.feature_extractor.config.chunk_length/pipeline.model.config.max_source_positions
        this.processed_chunks = []
        this.callbackFunctionCounter = 0
    
    }
    sendFinalResult(){
        self.postMessage({
            type:MessageTypes.INFERENCE_DONE
        })

    }
    callbackfunction(beans){
        this.callbackFunctionCounter+=1
        if(this.callbackFunctionCounter%10 !=0){
            return
        }
        const bestBeans = beans[0]
        let text = this.pipeline.tokenizer.decode(bestBeans.output_token_ids,{
            skip_special_tokens :true
        })
        const result ={
            text,
            start:this.getLastChunkTimeStamp(),
            end:undefined


        }
        createPartialResultMessage(result)
    }
    chunkCallback(data){
        this.chunks.push(data)
        const[text,{chunks}]=this.pipeline.tokenizer._decode_asr(
            this.chunks,
            {
                time_precision:this.time_precision,
                return_timestamps:true,
                force_full_sequence:false,
            }
        )
        this.processed_chunks=chunks.map({chunk,index}=>{
            return this.processed_chunks(chunk,index)
        })

        createResultMessage{
            this.processed_chunks,false,this.getLastChunkTimeStamp()

        }

        processChunk(chunk,index){
            const{text,timestamp}= chunk

        }

    }
}