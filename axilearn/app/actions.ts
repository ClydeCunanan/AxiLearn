    'use server'
    
import main from '../lib/gemini'
    export async function doSubmit(message : string) {

    await main(message);  
    }