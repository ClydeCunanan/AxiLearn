
export interface CanvasRawCourse {
  id: number;
  name: string;
  course_code: string;
  enrollment_term_id: number;
}

export interface CleanCourse {
  id: number;
  name: string;
  code: string;
  enrollment_term_id: number;
  room?: string;
}

export interface CanvasRawPage {
  url: string;
  title: string;
  created_at: string;
  editing_roles: string;
  page_id: number;
  published: boolean;
  hide_from_students: boolean;
  front_page: boolean;
  html_url: string;
  todo_date: string | null;
  publish_at: string | null;
  updated_at: string;
  locked_for_user: boolean;
  body: string;
}

export interface CleanPage {
  url: string;
  title: string;
  createdAt: string;
  editingRoles: string;
  pageId: number;
  published: boolean;
  hideFromStudents: boolean;
  frontPage: boolean;
  htmlUrl: string;
  todoDate: string | null;
  publishAt: string | null;
  updatedAt: string;
  lockedForUser: boolean;
  body: string;
}

export interface CanvasRawModuleContentDetails {
  locked_for_user?: boolean;
  display_name?: string;
  thumbnail_url?: string | null;
  due_at?: string | null;
  unlock_at?: string | null;
  lock_at?: string | null;
  points_possible?: number;
  lock_info?: {
    lock_at?: string | null;
    can_view?: boolean;
    asset_string?: string;
  };
  lock_explanation?: string;
}


// 1. RAW: Exactly what comes from the Canvas API
export interface CanvasRawModule {
  id: number;
  name: string;
  position: number;
  unlock_at: string | null;
  require_sequential_progress: boolean;
  requirement_type: string;
  publish_final_grade: boolean;
  prerequisite_module_ids: number[];
  items_count: number;
  items_url: string;
  items?: CanvasRawModuleItem[];
}

// 2. CLEAN: Exactly what Axi Learn needs to render
export interface CleanModuleContentDetails {
  lockedForUser: boolean;
  displayName: string | null;
  thumbnailUrl: string | null;
  dueAt: string | null;
  unlockAt: string | null;
  lockAt: string | null;
  pointsPossible: number | null;
  lockInfo: {
    lockAt: string | null;
    canView: boolean | null;
    assetString: string | null;
  } | null;
  lockExplanation: string | null;
}

export interface CanvasRawModuleItem {
  id: number;
  position: number;
  title: string;
  indent: number;
  quiz_lti: boolean;
  type: string;
  module_id: number;
  html_url: string;
  page_url: string;
  publish_at: string | null;
  content_id: number;
  url?: string;
  content_details?: CanvasRawModuleContentDetails;
}

export interface CleanModuleItem {
  id: number;
  position: number;
  title: string;
  indent: number;
  quizLti: boolean;
  type: string;
  moduleId: number;
  htmlUrl: string ;
  pageUrl: string ;
  publishAt: string | null;
  contentId: number | null;
  url: string;
  contentDetails: CleanModuleContentDetails | null;
}

export interface CleanModule {
  id: number;
  title: string;
  position: number;
  unlockAt: string | null;
  requireSequentialProgress: boolean;
  requirementType: string;
  publishFinalGrade: boolean;
  prerequisiteModuleIds: number[];
  itemCount: number;
  items: CleanModuleItem[];
}

// 3. DETAIL: Course title + modules (for detail page)
export interface CourseDetail {
  course: {
    id: number;
    title: string;
  };
  modules: CleanModule[];
}

export interface RawFile {
  id: number;
  display_name: string;
  filename: string;
  'content-type': string; // Keys with hyphens must be quoted
  url: string;
}
export interface CleanFile {
  id: string;
  displayName: string;
  fileName: string;
  contentType: string;
  downloadUrl: string;
  isPdf: boolean;
}