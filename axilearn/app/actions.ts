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
     let fetch = await getPagebyId(courseId, url)
     //using cheerio lib to remove html and css tags from body
     const html = fetch.body  
     const $ = cheerio.load(html)
    const imgCount = $('img').length; 
    const donwloadedImages = [];

     for (let index = 0 ; index < imgCount; index++) {
         $('img').attr('src');
}




    const content = $.text().replace(/\s+/g, " ").trim(); 
       console.log("this is no tag",content)
     // so iterate through every img tag, get the src 
// , and if it starts with http download it,
//  add to an array named download images,  
//  place down a marker image tag, so that when .text
//   happens it doesn't get wiped
    }
    if (type === "file") {
     content = await getFilebyId(courseId, url)
    const src = `/api?canvasUrl=${encodeURIComponent(content.url)}`;
        //turn array buffer to base64
        console.log("file content")
    }
    else {
        console.log("content error")
    }
    // const content = src
  

    // const action = await generator(content, structure)
    // console.log("Generate Actions.ts triggered")
    // return action;
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