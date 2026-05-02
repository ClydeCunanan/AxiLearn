
import React from 'react'
import { NextResponse } from 'next/server'
import { CleanCourse, CanvasRawCourse, CanvasRawModule } from '@/types/index.js'


export async function getCourses() {
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
    return filteredCourses
  }

  catch (error) {
    console.log(error)
      throw new Error('Internal Server Error')
  }
}

export async function getCourseById(courseId: string) {
  const token = process.env.CANVAS_API_TOKEN
  const baseUrl = process.env.CANVAS_BASE_URL

  const res = await fetch(`${baseUrl}/api/v1/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch course details')
  }

  return res.json()
}

export async function getCourseModules(courseId: string) {
  const token = process.env.CANVAS_API_TOKEN
  const baseUrl = process.env.CANVAS_BASE_URL

  const queryParams = new URLSearchParams()
  queryParams.append('include[]', 'items')
  queryParams.append('include[]', 'content_details')
  queryParams.append('per_page', '50')

  const res = await fetch(
    `${baseUrl}/api/v1/courses/${courseId}/modules?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      next: { revalidate: 3600 },
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch modules for this course')
  }

  const modules: CanvasRawModule[] = await res.json()
  return modules
}

