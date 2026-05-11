 'use server'
    
import main from '../lib/gemini'
    export async function doSubmit(message : string) {

    const aiResponse = await main(message);  
    return aiResponse;
    }