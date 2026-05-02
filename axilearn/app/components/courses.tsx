"use client"
import { useState } from 'react'
import Link from 'next/link'
import SearchBar from '../components/search'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { CleanCourse } from "@/types/index"
// import courses from "@/lib/courses"

/**
 * THE HAND-OFF LOGIC:
 * 1. Parent page.tsx sends courses (which is an array) to 
 * the CourseList component as a single prop object, so we add {courses} 
 * to access it faster. Right now it's a single prop object so we have to 
 * add CourseListProps. This essentially is nesting Course[], which
 * is the typing of a single object inside courses array. By nesting,
 * we define courses as an array instead of just a single prop object.     
 */


interface CourseListProps {
  courses: CleanCourse[]
}
// so by adding CleanCourse[], we're telling courses 
// it's an array with course object lists, 
// if we just added CleanCourse, we're telling courses 
// it's a single object list with that Type


export default function Courselist({ courses }: CourseListProps) {
    const [query, setQuery] = useState('')

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <SearchBar query={query} setQuery={setQuery} />

      <div className="w-full max-w-full overflow-x-hidden px-1">
        <h1>Your Courses</h1>
        <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
            <Card className="m-0 min-h-32 rounded-xl bg-card p-3">
              <CardTitle>{course.name}</CardTitle>
              <CardContent>
                <CardDescription>Code: {course.code}</CardDescription>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

 
