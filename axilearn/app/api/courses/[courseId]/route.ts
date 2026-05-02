import { NextResponse } from 'next/server'
import {
  CanvasRawModule,
  CleanModule,
  CleanModuleContentDetails,
  CleanModuleItem,
  CourseDetail,
} from '@/types/index.js'
import { getCourseById, getCourseModules } from '@/lib/canvas'

export async function GET(
  _request: Request,
  { params }: { params: { courseId: string } },
) {
  const { courseId } =  params

  try {
    // Fetch course and modules in parallel
    const [courseData, modules] = await Promise.all([
      getCourseById(courseId),
      getCourseModules(courseId),
    ])
    const cleanModules: CleanModule[] = modules.map((mod) => ({
      id: mod.id,
      title: mod.name,
      position: mod.position,
      unlockAt: mod.unlock_at,
      requireSequentialProgress: mod.require_sequential_progress,
      requirementType: mod.requirement_type,
      publishFinalGrade: mod.publish_final_grade,
      prerequisiteModuleIds: mod.prerequisite_module_ids,
      itemCount: mod.items_count,
      items: (mod.items || []).map((item): CleanModuleItem => ({
        id: item.id,
        position: item.position,
        title: item.title,
        indent: item.indent,
        quizLti: item.quiz_lti,
        type: item.type.toLowerCase(),
        moduleId: item.module_id,
        htmlUrl: item.html_url ?? null,
        pageUrl: item.page_url ?? null,
        publishAt: item.publish_at ?? null,
        contentId: item.content_id ?? null,
        // Multiplexer logic for internal vs external links   
        url: item.page_url
          ? `/courses/${courseId}/pages/${item.page_url}`
          : item.html_url || item.url || '',
        contentDetails: item.content_details
          ? {
              lockedForUser: item.content_details.locked_for_user ?? false,
              displayName: item.content_details.display_name ?? null,
              thumbnailUrl: item.content_details.thumbnail_url ?? null,
              dueAt: item.content_details.due_at ?? null,
              unlockAt: item.content_details.unlock_at ?? null,
              lockAt: item.content_details.lock_at ?? null,
              pointsPossible: item.content_details.points_possible ?? null,
              lockInfo: item.content_details.lock_info
                ? {
                    lockAt: item.content_details.lock_info.lock_at ?? null,
                    canView: item.content_details.lock_info.can_view ?? null,
                    assetString: item.content_details.lock_info.asset_string ?? null,
                  }
                : null,
              lockExplanation: item.content_details.lock_explanation ?? null,
            }
          : null,
      })),
    }))

    // Return aggregated response with course title and modules
    const response: CourseDetail = {
      course: {
        id: courseData.id,
        title: courseData.name,
      },
      modules: cleanModules,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
