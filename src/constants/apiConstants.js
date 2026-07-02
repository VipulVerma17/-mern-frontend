// API Constants
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: '/auth/register',
  AUTH_LOGIN: '/auth/login',
  AUTH_PROFILE: '/auth/profile',

  // Students
  STUDENTS_LIST: '/students',
  STUDENTS_GET: (id) => `/students/${id}`,
  STUDENTS_CREATE: '/students',
  STUDENTS_UPDATE: (id) => `/students/${id}`,
  STUDENTS_DELETE: (id) => `/students/${id}`,

  // Faculty
  FACULTY_LIST: '/faculty',
  FACULTY_GET: (id) => `/faculty/${id}`,
  FACULTY_CREATE: '/faculty',
  FACULTY_UPDATE: (id) => `/faculty/${id}`,
  FACULTY_DELETE: (id) => `/faculty/${id}`,

  // Courses
  COURSES_LIST: '/courses',
  COURSES_GET: (id) => `/courses/${id}`,
  COURSES_CREATE: '/courses',
  COURSES_UPDATE: (id) => `/courses/${id}`,
  COURSES_DELETE: (id) => `/courses/${id}`,

  // Attendance
  ATTENDANCE_LIST: '/attendance',
  ATTENDANCE_MARK: '/attendance/mark',

  // Notices
  NOTICES_LIST: '/notices',
  NOTICES_CREATE: '/notices',
  NOTICES_DELETE: (id) => `/notices/${id}`,

  // Health
  HEALTH: '/health',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student',
};

// Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  REGISTRATION_SUCCESS: 'Registration successful',
  PROFILE_UPDATED: 'Profile updated successfully',
  DATA_DELETED: 'Data deleted successfully',
  OPERATION_SUCCESS: 'Operation completed successfully',
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You do not have permission to perform this action.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};

// Request Status
export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
