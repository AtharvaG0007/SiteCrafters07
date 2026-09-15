export type CareerRole = {
  slug: string
  title: string
  status: 'Coming soon' | 'Freelance / contract'
  type: string
  location: string
  description: string
  about: string
  responsibilities: string[]
  requirements: string[]
  goodToHave: string[]
  workOn: string[]
}

export const careerRoles: CareerRole[] = [
  {
    slug: 'website-developer',
    title: 'Website Developer',
    status: 'Coming soon',
    type: 'Project-based / internship',
    location: 'Location discussed per project',
    description: 'Help build fast, responsive websites for businesses and personal brands.',
    about: 'You would help turn clear ideas into accessible, responsive web experiences while learning through real project work.',
    responsibilities: ['Build responsive pages from designs', 'Collaborate on implementation and content details', 'Test interactions across screen sizes'],
    requirements: ['HTML, CSS, and JavaScript fundamentals', 'React or Next.js familiarity', 'Comfort with Git and careful responsive work'],
    goodToHave: ['Basic accessibility knowledge', 'Interest in performance and SEO', 'A small portfolio or personal project'],
    workOn: ['Business websites', 'Reusable UI patterns', 'Performance and mobile refinements'],
  },
  {
    slug: 'ui-ux-designer',
    title: 'Website / UI/UX Designer',
    status: 'Coming soon',
    type: 'Project-based / internship',
    location: 'Location discussed per project',
    description: 'Shape clear, useful interfaces with a strong eye for typography and layout.',
    about: 'You would help make digital experiences easier to understand, navigate, and use, from early structure through polished visual direction.',
    responsibilities: ['Create page flows and wireframes', 'Develop visual directions and responsive layouts', 'Prepare clear designs for implementation'],
    requirements: ['Figma familiarity', 'Strong typography and layout instincts', 'Ability to explain design decisions'],
    goodToHave: ['Design-system experience', 'Interest in accessibility', 'A portfolio showing web or product work'],
    workOn: ['Website structures', 'Responsive page designs', 'Content and visual systems'],
  },
  {
    slug: 'video-editor',
    title: 'Video Editor',
    status: 'Freelance / contract',
    type: 'Freelance',
    location: 'Discussed per project',
    description: 'Turn raw footage into polished short-form and branded content.',
    about: 'This is the currently configured freelance opportunity for editors who care about pacing, clarity, and publish-ready details.',
    responsibilities: ['Edit reels, shorts, and promotional videos', 'Build pacing with captions, music, and transitions', 'Prepare platform-ready exports and revisions'],
    requirements: ['Experience editing short-form video', 'Comfort with captions and timing', 'Reliable communication around revisions'],
    goodToHave: ['Motion graphics experience', 'A portfolio of social content', 'Interest in brand storytelling'],
    workOn: ['Short-form social videos', 'Branded content', 'Content variations for different platforms'],
  },
  {
    slug: 'social-media-manager',
    title: 'Social Media Manager',
    status: 'Coming soon',
    type: 'Project-based / internship',
    location: 'Location discussed per project',
    description: 'Help businesses stay consistent, useful, and recognisable online.',
    about: 'You would help translate a business into practical content plans and a social presence that feels consistent and human.',
    responsibilities: ['Plan content calendars', 'Write clear captions and organise assets', 'Keep client communication and publishing details organised'],
    requirements: ['Strong written communication', 'Understanding of social content formats', 'Reliable organisation and follow-through'],
    goodToHave: ['Basic design or video editing skills', 'Experience with content calendars', 'Interest in small-business storytelling'],
    workOn: ['Content planning', 'Caption and publishing workflows', 'Consistent brand communication'],
  },
]

export function getCareerRole(slug: string) {
  return careerRoles.find((role) => role.slug === slug)
}
