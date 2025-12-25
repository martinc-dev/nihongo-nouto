/**
 * Constants for commonly used numbers throughout the application
 */

// Time constants (in milliseconds)
export const TIME = {
  MILLISECONDS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  // Common time intervals
  FIVE_MINUTES_MS: 1000 * 60 * 5,
  ONE_MINUTE_MS: 1000 * 60,
  ONE_SECOND_MS: 1000,
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

// Numeric constants
export const NUMBERS = {
  // Radix for parseInt
  DECIMAL_RADIX: 10,
  // Default values
  DEFAULT_PAGE: 1,
  DEFAULT_INDEX: 0,
  // Scroll position
  SCROLL_TOP: 0,
  // Array/string operations
  FIRST_INDEX: 0,
  LAST_CHAR_OFFSET: -1,
  // Key codes
  ENTER_KEY_CODE: 13,
} as const

// UI Dimension constants (in pixels or percentages)
export const UI_DIMENSIONS = {
  // WordList component
  WORD_LIST_WIDTH: '40%',
  WORD_LIST_MAX_WIDTH: 500,
  WORD_LIST_MARGIN_RIGHT: 30,
  // WordDashboard components
  WORD_DASHBOARD_WIDTH: '70%',
  WORD_DASHBOARD_BORDER_RADIUS: 3,
  WORD_DASHBOARD_MARGIN_BOTTOM: 20,
  WORD_DASHBOARD_MARGIN_RIGHT: 10,
  WORD_DASHBOARD_PADDING_BOTTOM: 20,
  WORD_DASHBOARD_GAP: 15,
  WORD_DASHBOARD_MIN_WIDTH: 120,
  WORD_DASHBOARD_PADDING: '0 5px',
  WORD_DASHBOARD_BORDER_RADIUS_SMALL: 4,
  // Table/List components
  TABLE_CELL_PADDING: 1,
  TABLE_CELL_PADDING_SMALL: 0.5,
  TABLE_BORDER: 0,
  TABLE_HEAD_MARGIN_BOTTOM: 10,
  TABLE_HEAD_MIN_WIDTH: 40,
  TABLE_HEAD_WIDTH: 24,
  // Form components
  FORM_FIELD_MARGIN_BOTTOM: 2,
  FORM_FIELD_MARGIN_RIGHT: 20,
  FORM_FIELD_MARGIN_RIGHT_SMALL: 5,
  FORM_FIELD_PADDING: '10px 0',
  FORM_FIELD_MARGIN: '10px 0',
  FORM_FIELD_WIDTH: 200,
  FORM_FIELD_WIDTH_FULL: '100%',
  FORM_FIELD_WIDTH_HALF: '50%',
  FORM_FIELD_BORDER_RADIUS: 0,
  FORM_FIELD_MIN_HEIGHT: 100,
  FORM_FIELD_ROWS: 4,
  // Icon components
  ICON_SIZE: 20,
  ICON_BORDER_RADIUS: 5,
  ICON_FONT_WEIGHT: 700,
  // Typography
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 16,
  FONT_WEIGHT_BOLD: 600,
  FONT_WEIGHT_EXTRA_BOLD: 700,
  // Spacing
  SPACING_XS: 4,
  SPACING_SM: 10,
  SPACING_MD: 15,
  SPACING_LG: 20,
  SPACING_XL: 30,
  SPACING_XXL: 50,
  // WordTitle component
  WORD_TITLE_HEIGHT: 80,
  WORD_TITLE_WIDTH_CALC: 'calc(100% - 150px)',
  WORD_TITLE_MARGIN_RIGHT: 50,
  // Footer component
  FOOTER_PADDING: '40px 40px 0 0',
  FOOTER_FONT_SIZE: 12,
  // MainContent component
  MAIN_CONTENT_PADDING_TOP: 20,
  MAIN_CONTENT_PADDING: 3,
  // WordSense component
  WORD_SENSE_WIDTH: '50%',
  // WordSearchInput component
  WORD_SEARCH_INPUT_WIDTH: 250,
  // Grid layouts
  GRID_COLUMNS_2: 'repeat(2, 1fr)',
} as const

// Array/Collection constants
export const ARRAY = {
  EMPTY_LENGTH: 0,
  FIRST_INDEX: 0,
  MIN_NON_EMPTY_LENGTH: 1,
} as const

