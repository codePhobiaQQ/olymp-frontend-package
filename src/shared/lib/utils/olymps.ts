function getCurrentAcademicYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Academic year starts in September
  let academicYearStart;
  let academicYearEnd;

  if (currentMonth >= 8) {
    academicYearStart = currentYear;
    academicYearEnd = currentYear + 1;
  } else {
    academicYearStart = currentYear - 1;
    academicYearEnd = currentYear;
  }

  return `${academicYearStart}-${academicYearEnd}`;
}

export const currentYear = getCurrentAcademicYear()