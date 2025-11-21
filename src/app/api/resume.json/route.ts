import { NextResponse } from 'next/server';
import DefaultResumeData from '@/components/resume-builder/utility/DefaultResumeData';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  // Map DefaultResumeData to JSON Resume schema v1.0.0
  const jsonResume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: DefaultResumeData.name,
      label: DefaultResumeData.position,
      image: DefaultResumeData.profilePicture || '',
      email: DefaultResumeData.email,
      phone: DefaultResumeData.contactInformation,
      url: `https://${DefaultResumeData.socialMedia.find(s => s.socialMedia === 'Website')?.link || 'ismail.kattakath.com'}`,
      summary: DefaultResumeData.summary,
      location: {
        address: '24-242 John Garland Blvd',
        postalCode: 'M9V 1N8',
        city: 'Toronto',
        countryCode: 'CA',
        region: 'Ontario',
      },
      profiles: DefaultResumeData.socialMedia.map(social => ({
        network: social.socialMedia,
        username: social.link.split('/').pop() || social.link,
        url: social.link.startsWith('http') ? social.link : `https://${social.link}`,
      })),
    },
    work: DefaultResumeData.workExperience.map(job => ({
      name: job.company,
      position: job.position,
      url: job.url.startsWith('http') ? job.url : `https://${job.url}`,
      startDate: job.startYear,
      endDate: job.endYear === 'Present' ? '' : job.endYear,
      summary: job.description,
      highlights: job.keyAchievements.split('\n').filter(h => h.trim()),
      keywords: job.technologies || [],
    })),
    education: DefaultResumeData.education.map(edu => ({
      institution: edu.school,
      url: edu.url.startsWith('http') ? edu.url : `https://${edu.url}`,
      area: edu.degree.includes('Computer Science') ? 'Computer Science and Engineering' : edu.degree,
      studyType: edu.degree.includes('Bachelor') ? "Bachelor's Degree" : edu.degree,
      startDate: edu.startYear,
      endDate: edu.endYear,
    })),
    skills: DefaultResumeData.skills.map(skillCategory => ({
      name: skillCategory.title,
      keywords: skillCategory.skills.map(skill => skill.text),
    })),
    languages: DefaultResumeData.languages.map(lang => ({
      language: lang,
      fluency: 'Native speaker',
    })),
    meta: {
      canonical: 'https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json',
      version: 'v1.0.0',
      lastModified: new Date().toISOString().split('T')[0],
    },
  };

  return NextResponse.json(jsonResume, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
