

import Courselist from '../components/courses'
import {CleanCourse} from "@/types/index"
import { getCourses } from '@/lib/canvas'

// async function getCourses(): Promise<CleanCourse[]> {   
//  const LOCAL_URL = 'http://localhost:3000'

//     try {
//       const res = await fetch(`${LOCAL_URL}/api/courses/`)
//       if (!res.ok){
//         throw new Error('Something went wrong')
//       }
//      return res.json()
//     }
  
//     catch (error) {
//       return []
    
//     }}
  
  

export default async function page() {
  const courses = await getCourses()
  
  return (
    <div className="space-y-4">
      <Courselist courses = {courses}/>
    </div>
  )
}

// so we're defining single items with CleanCourse,
//  while courses: CleanCourse[] is for defining the whole array,
//  but we're trying to pass courses as prop (THE WHOLE ARRAY)
//  so, we need to define the array with a type, 
// not just the single object list