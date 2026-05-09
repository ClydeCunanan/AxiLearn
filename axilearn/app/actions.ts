    'use server'
    
import main from './gemini'
    export async function doSubmit(message : string) {

    await main(message);  
    }