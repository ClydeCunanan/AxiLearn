
import {
  CleanCourse,
  CanvasRawCourse,
  CanvasRawModule,
  CanvasRawModuleContentDetails,
  CanvasRawModuleItem,
  CanvasRawPage,
  CleanPage,
  CleanModule,
  CleanModuleContentDetails,
  CleanModuleItem,
  CourseDetail,
  RawFile,
  CleanFile,
} from '@/types/index.js'

const mapCourse = (course: CanvasRawCourse): CleanCourse => ({
  id: course.id,
  name: course.name,
  code: course.course_code,
  enrollment_term_id: course.enrollment_term_id,
})

const mapModuleContentDetails = (
  details: CanvasRawModuleContentDetails,
): CleanModuleContentDetails => ({
  lockedForUser: details.locked_for_user ?? false,
  displayName: details.display_name ?? null,
  thumbnailUrl: details.thumbnail_url ?? null,
  dueAt: details.due_at ?? null,
  unlockAt: details.unlock_at ?? null,
  lockAt: details.lock_at ?? null,
  pointsPossible: details.points_possible ?? null,
  lockInfo: details.lock_info
    ? {
        lockAt: details.lock_info.lock_at ?? null,
        canView: details.lock_info.can_view ?? null,
        assetString: details.lock_info.asset_string ?? null,
      }
    : null,
  lockExplanation: details.lock_explanation ?? null,
})

const mapModuleItem = (
  courseId: string,
) =>
  (item: CanvasRawModuleItem): CleanModuleItem => ({
    id: item.id,
    position: item.position,
    title: item.title,
    indent: item.indent,
    quizLti: item.quiz_lti,
    type: item.type.toLowerCase(),
    moduleId: item.module_id,
    htmlUrl: item.html_url,
    pageUrl: item.page_url  ,
    publishAt: item.publish_at  ,
    contentId: item.content_id  ,
    url: item.page_url
      ? `/courses/${courseId}/page/${encodeURIComponent(item.page_url)}`
        : item.html_url || item.url || '',
    contentDetails: item.content_details
      ? mapModuleContentDetails(item.content_details)
      : null,
  })

const mapModule = (courseId: string) => (mod: CanvasRawModule): CleanModule => ({
  id: mod.id,
  title: mod.name,
  position: mod.position,
  unlockAt: mod.unlock_at,
  requireSequentialProgress: mod.require_sequential_progress,
  requirementType: mod.requirement_type,
  publishFinalGrade: mod.publish_final_grade,
  prerequisiteModuleIds: mod.prerequisite_module_ids,
  itemCount: mod.items_count,
  items: (mod.items || []).map(mapModuleItem(courseId)),
})

const mapPage = (page: CanvasRawPage): CleanPage => ({
  url: page.url,
  title: page.title,
  createdAt: page.created_at,
  editingRoles: page.editing_roles,
  pageId: page.page_id,
  published: page.published,
  hideFromStudents: page.hide_from_students,
  frontPage: page.front_page,
  htmlUrl: page.html_url,
  todoDate: page.todo_date,
  publishAt: page.publish_at,
  updatedAt: page.updated_at,
  lockedForUser: page.locked_for_user,
  body: page.body,
})



export async function getCourses() {
  const baseUrl = process.env.CANVAS_BASE_URL
  try {
    const res = await fetch(`${baseUrl}/api/v1/courses`, getFetchConfig())
  if (!res.ok) {
    throw new Error('Failed to fetch courses')
  }
    const courses : CanvasRawCourse[] = await res.json()
    const filteredCourses: CleanCourse[] = courses.map(mapCourse)
    return filteredCourses
  }

  catch (error) {
    console.log(error)
      throw new Error('Internal Server Error')
  }
}

export async function getCourseById(courseId: string ) {
  const baseUrl = process.env.CANVAS_BASE_URL

  try {
    const res = await fetch(`${baseUrl}/api/v1/courses/${courseId}`, getFetchConfig())

    if (!res.ok) {
      throw new Error('Failed to fetch course details')
    }
    const course: CanvasRawCourse = await res.json()
    return {
      id: course.id,
      name: course.name,
      code: course.course_code,
      enrollment_term_id: course.enrollment_term_id,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error')
  }
}

export async function getCourseModules(courseId: string) {
  const baseUrl = process.env.CANVAS_BASE_URL

  const queryParams = new URLSearchParams()
  queryParams.append('include[]', 'items')
  queryParams.append('include[]', 'content_details')
  queryParams.append('per_page', '50')

  try {
    const res = await fetch(
      `${baseUrl}/api/v1/courses/${courseId}/modules?${queryParams.toString()}`,
      getFetchConfig(),
    )

    if (!res.ok) {
      throw new Error('Failed to fetch modules for this course')
    }

    const modules: CanvasRawModule[] = await res.json()
    return modules.map(mapModule(courseId))
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error')
  }
}

export async function getPagebyId(courseId: string, page_url: string) {
  const baseUrl = process.env.CANVAS_BASE_URL

  // const queryParams = new URLSearchParams()
  // queryParams.append('per_page', '50')
  // queryParams.append('module_item_id[]', 'number')


  try {
    const encoded = encodeURIComponent(page_url)
    const res = await fetch(
      `${baseUrl}/api/v1/courses/${courseId}/pages/${encoded}`,
      getFetchConfig(),
    )

    if (!res.ok) {
      throw new Error('Failed to fetch content for this page')
    }

    const page: CanvasRawPage = await res.json()
    return mapPage(page)
    
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error') 
  }
}

export async function getFilebyId(courseId: string, fileUrl: string) {
  const baseUrl = process.env.CANVAS_BASE_URL

  // const queryParams = new URLSearchParams()
  // queryParams.append('per_page', '50')
  // queryParams.append('module_item_id[]', 'number')


  try {
    const encoded = encodeURIComponent(fileUrl)
    const res = await fetch(
      `${baseUrl}/api/v1/courses/${courseId}/files/${encoded}`,
      getFetchConfig(),
    )

    if (!res.ok) {
      throw new Error('Failed to fetch pdf content')
    }

    const file: RawFile = await res.json()
    const cleanFile: CleanFile = {
      id: file.id.toString(),
      displayName: file.display_name,
      fileName: file.filename,
      contentType: file['content-type'],
      downloadUrl: file.url,
      isPdf:
        file['content-type'] === 'application/pdf' ||
        file.filename.toLowerCase().endsWith('.pdf'),
    }
    return cleanFile
    
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error') 
  }
}
//HELPER FUNCTIONS



const getFetchConfig = () => ({
  headers: {
    Authorization: `Bearer ${process.env.CANVAS_API_TOKEN}`,
    Accept: 'application/json',
  },
  next: { revalidate: 3600 },
});