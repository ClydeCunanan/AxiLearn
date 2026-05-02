
import React from 'react'
import { NextResponse } from 'next/server'
import { CleanCourse, CanvasRawCourse } from '@/types/index.js'


export async function GET() {
  const token = process.env.CANVAS_API_TOKEN
  const baseUrl = process.env.CANVAS_BASE_URL
  try {
    const res = await fetch(`${baseUrl}/api/v1/courses`, {
     
      headers: {
        'Authorization': `Bearer ${token}`
      }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch courses')
  }
      const courses : CanvasRawCourse[] = await res.json()
    const filteredCourses: CleanCourse[] = courses.map(course => ({
      id: course.id,
      name: course.name,
      code: course.course_code,
      enrollment_term_id: course.enrollment_term_id,
    }))
    return NextResponse.json(filteredCourses)
  }

  catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

