'use server'
import { db } from '../lib/prisma'
import main from '../lib/gemini'
export async function doSubmit(message: string) {

    const aiResponse = await main(message);
    // console.log("doSubmit func test")
    return aiResponse;
}
const MOCK_USER_ID = "1";


export async function createMessage(conversationId: string, message: string) {
    try {


    if (conversationId == null) {
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

     if (conversationId == null && message == null) {
        console.log("Case 2")
        throw new Error("convo id null and message null")
    }

    else  {
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
}
    catch (error:any)  {
            console.log("Error")
            console.error(error)
        return { success: false, conversationId: null }
       
    }

}