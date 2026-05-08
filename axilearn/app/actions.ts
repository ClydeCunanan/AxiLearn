    'use server'
    
import main from './gemini'
    export async function doSubmit(formData: FormData) {
    const message = formData.get('message')

    await main(message);  
    
    }