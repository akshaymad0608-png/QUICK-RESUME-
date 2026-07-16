import * as XLSX from 'xlsx';
import type { ResumeData } from '../types';

/**
 * Builds and downloads a well-structured .xlsx workbook from resume data.
 * One sheet per section so recruiters / ATS tooling can read it as a table.
 */
export function exportResumeToExcel(data: ResumeData) {
  const wb = XLSX.utils.book_new();
  const p = data.personalInfo;

  const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim();

  // ---- Profile sheet (key/value) ----
  const profileRows: (string | undefined)[][] = [
    ['Field', 'Value'],
    ['Full Name', fullName],
    ['Job Title', p.jobTitle],
    ['Email', p.email],
    ['Phone', [p.phoneCode, p.phone].filter(Boolean).join(' ')],
    ['Location', p.location || [p.city, p.country].filter(Boolean).join(', ')],
    ['LinkedIn', p.linkedin],
    ['Portfolio', p.portfolio],
    ['Website', p.website],
    ['Summary', data.summary],
  ];
  const wsProfile = XLSX.utils.aoa_to_sheet(profileRows);
  wsProfile['!cols'] = [{ wch: 16 }, { wch: 70 }];
  XLSX.utils.book_append_sheet(wb, wsProfile, 'Profile');

  // ---- Experience ----
  if (data.experience?.length) {
    const rows = [
      ['Job Title', 'Company', 'Location', 'Start', 'End', 'Description'],
      ...data.experience.map((e) => [
        e.jobTitle,
        e.company,
        [e.city, e.country].filter(Boolean).join(', '),
        e.startDate,
        e.isPresent ? 'Present' : e.endDate,
        (e.description || '').replace(/\n+/g, ' • '),
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 26 }, { wch: 24 }, { wch: 20 }, { wch: 12 }, { wch: 12 }, { wch: 60 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Experience');
  }

  // ---- Education ----
  if (data.education?.length) {
    const rows = [
      ['Degree', 'Field of Study', 'School', 'Location', 'Start', 'End'],
      ...data.education.map((e) => [
        e.degree,
        e.fieldOfStudy,
        e.schoolName,
        [e.city, e.country].filter(Boolean).join(', '),
        e.startYear,
        e.endYear,
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 24 }, { wch: 24 }, { wch: 28 }, { wch: 20 }, { wch: 10 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Education');
  }

  // ---- Skills ----
  if (data.skills?.length) {
    const rows = [['#', 'Skill'], ...data.skills.map((s, i) => [String(i + 1), s])];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 5 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Skills');
  }

  // ---- Projects ----
  if (data.projects?.length) {
    const rows = [
      ['Title', 'Subtitle', 'Link', 'Start', 'End', 'Description'],
      ...data.projects.map((pr) => [
        pr.title,
        pr.subtitle,
        pr.link,
        pr.startDate,
        pr.endDate,
        (pr.description || '').replace(/\n+/g, ' • '),
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 26 }, { wch: 24 }, { wch: 30 }, { wch: 12 }, { wch: 12 }, { wch: 50 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Projects');
  }

  // ---- Certifications ----
  if (data.certifications?.length) {
    const rows = [
      ['Name', 'Issuer', 'Date', 'Link'],
      ...data.certifications.map((c) => [c.name, c.issuer, c.date, c.link]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 30 }, { wch: 24 }, { wch: 14 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Certifications');
  }

  // ---- Languages ----
  if (data.languages?.length) {
    const rows = [
      ['Language', 'Proficiency'],
      ...data.languages.map((l) => [l.name, l.proficiency]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 22 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Languages');
  }

  const safeName = (fullName || 'resume').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '');
  XLSX.writeFile(wb, `${safeName || 'resume'}_Resume.xlsx`);
}
