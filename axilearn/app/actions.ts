'use server'
import { db } from '../lib/prisma'
import main from '../lib/gemini'
import generator from '../lib/generator'
import { getFilebyId, getPagebyId } from '../lib/canvas'
import * as cheerio from 'cheerio';

export async function doSubmit(message: string) {

    const aiResponse = await main(message);
    console.log("doSubmit func test")
    return aiResponse;
}

export async function genAction(type: string, courseId: string, url: string, structure: string) {
    let content 
    if (type == "page") {
     let page = await getPagebyId(courseId, url)
     //using cheerio lib to remove html and css tags from body
     const html = page.body  
     const $ = cheerio.load(html)
     //turn imgCount to an array, point .attr src to 
     // fetch the src inside each index
    const imgCount = $('img').toArray(); 
    const downloadedImages:string[] = [];

     for (let index = 0 ; index < imgCount.length; index++) {
          const source = $(imgCount[index]).attr('src');
        
         if (source) {
            const response = await fetch(source)
             const arrayBuffer = await response.arrayBuffer();
             const base64 = Buffer.from(arrayBuffer).toString('base64');
            downloadedImages.push(base64)   
            // 3. Create your dynamic placeholder text
            let placeValueMarker = `Target Image:${index}`
      // 4. Swap the HTML tag for your text placeholder
      $(imgCount[index]).replaceWith(placeValueMarker);
         } 
         //this cheerio logic will take the html body, 
         //get all the img tags, turn into an array
         //turn the src properties into base64
         //and store into separate array
         //also adding placeholder so gemini api knows 
         //where in the html body, the array index belongs in
    const cleanHTML = $.text().replace(/\s+/g, " ").trim(); 

     //this removes all the tags and cleans spaces
     
     const content = {
        cleanHTML, 
        downloadedImages,
     }

    }

}
    if (type === "file") {
     content = await getFilebyId(courseId, url)
    const arrayBuffer = `/api?canvasUrl=${encodeURIComponent(content.url)}`;
      const base64 = Buffer.from(arrayBuffer).toString('base64')
        console.log("base 64 gotten")

        //this returns a single base 64 pdf instead of the list of images
    }
    else {
        console.log("content error")
    }

  

    const action = await generator(content, structure)
    console.log("Generate Actions.ts triggered")
    return action;
}


const MOCK_USER_ID = "1";


export async function createMessage(conversationId: string, message: string) {
    try {


        if (!conversationId) {
            const newConvo = await db.conversation.create({
                data: {
                    userId: MOCK_USER_ID,
                    title: "omsim",
                }
            })
            console.log("Case 1")
            await db.message.create({
                data: {
                    conversationId: newConvo.id,
                    content: message,
                }
            })

            return { success: true, conversationId: newConvo.id };
        }



        else {

            const text = await db.message.create({
                data: {
                    conversationId: conversationId,
                    content: message,
                }
            })
            console.log("else case ")
            console.log(conversationId)
            return { success: true, conversationId }
        }
    }
    catch (error) {
        console.error(error)
        return { success: false, conversationId: null }

    }

}

//  if (!conversationId && message == null) {
//     console.log("Case 2")
//     throw new Error("convo id null and message null")
// }