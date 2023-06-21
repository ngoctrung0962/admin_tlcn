export const Enums = {
  // Enum for the type of the user
  typeLecture: {
    VIDEO: "VIDEO",
    PRESENTATION: "PRESENTATION",
    DOCUMENT: "DOCUMENT",
    QUIZ: "QUIZ",
  },
  typePresentation: {
    TEXT: "TEXT",
    FILE: "FILE",
  },
  ROLE: {
    ADMIN: "ROLE_01",
    TEACHER: "TEACHER",
    REVIEWER: "REVIEWER",
  },
  STATUS_REGISTER_COURSE: {
    _DRAFT: "DRAFT",
    _SUBMITTED: "SUBMITTED",
    _APPROVED: "APPROVED",
    _REJECTED: "REJECTED",
    _WAITING_FOR_REVIEW: "WAITING_FOR_REVIEW",
    _NEED_EDIT: "NEED_EDIT",
    ["DRAFT"]: "Bản phát thảo",
    ["SUBMITTED"]: "Đã nộp",
    ["APPROVED"]: "Đã duyệt",
    ["REJECTED"]: "Đã từ chối",
    ["WAITING_FOR_REVIEW"]: "Đang chờ duyệt",
    ["NEED_EDIT"]: "Cần chỉnh sửa",
  },
};
