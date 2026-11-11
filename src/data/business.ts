import {
  Activity,
  Baby,
  ContactRound,
  Eye,
  Glasses,
  HeartPulse,
  Home,
  MessageCircle,
  ScanEye,
  Sparkles,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

export const business = {
  name: 'Alpha Vision',
  tagline: 'Expert care, Excellent Vision',
  professional: {
    name: 'Mr. H.A.W. Dhananjaya',
    designations: [
      'Optometrist',
      'Vision Therapist',
      'Pediatric & Functional Vision Care',
      'Low Vision & Rehabilitation Practitioner',
    ],
  },
  // Add a verified international WhatsApp number here before enabling direct chat.
  whatsappNumber: '',
}

export const services: {
  name: string
  description: string
  icon: LucideIcon
}[] = [
  {
    name: 'Adult Vision Assessment',
    description:
      'A considered assessment of adult visual needs, with clear guidance on possible next steps.',
    icon: Eye,
  },
  {
    name: 'Home Visit Vision Assessment',
    description:
      'A convenient vision assessment at home, with care tailored to your needs and guidance on suitable next steps.',
    icon: Home,
  },
  {
    name: 'Child Vision Assessment',
    description:
      'An age-appropriate assessment that considers how a child uses vision in everyday life.',
    icon: Baby,
  },
  {
    name: 'Cycloplegic Refraction & PMT',
    description:
      'Enquire about cycloplegic refraction and PMT, and whether this assessment may be suitable.',
    icon: ScanEye,
  },
  {
    name: 'Diabetic Vision Follow-up',
    description:
      'Vision-care follow-up for people with diabetes, planned around individual needs.',
    icon: HeartPulse,
  },
  {
    name: 'Low Vision & Rehabilitation',
    description:
      'Assessment and rehabilitation support for people living with reduced vision.',
    icon: Activity,
  },
  {
    name: 'LogMAR Refraction',
    description:
      'A refraction service using LogMAR measurement as part of a structured vision assessment.',
    icon: ScanEye,
  },
  {
    name: 'Geriatric Vision Care',
    description:
      'Considered care for the changing visual needs of older adults.',
    icon: UsersRound,
  },
  {
    name: 'Vision Therapy',
    description:
      'Individualized vision therapy support, discussed following an assessment.',
    icon: Sparkles,
  },
  {
    name: 'Optometric Counselling',
    description:
      'One-to-one guidance to help patients understand visual concerns and care options.',
    icon: MessageCircle,
  },
  {
    name: 'Contact Lens Services',
    description:
      'Guidance on contact lens selection, fitting, and care based on your vision needs.',
    icon: ContactRound,
  },
  {
    name: 'CVI Vision Management',
    description:
      'Personalized vision care for patients seeking CVI Vision Management.',
    icon: Eye,
  },
  {
    name: 'Vision Stimulation',
    description:
      'Supportive activities and guidance intended to engage visual attention and use.',
    icon: Sparkles,
  },
  {
    name: 'Functional Vision Assessment',
    description:
      'An assessment of how vision supports everyday tasks, learning, and participation.',
    icon: Stethoscope,
  },
  {
    name: 'Spectacles & Optical Services',
    description:
      'Prescription eyewear and optical guidance, matched to visual needs and personal style.',
    icon: Glasses,
  },
]

export const locations = [
  {
    name: 'OBERON HEALTH CARE',
    address: 'No. 33, Piyadasa Sirisena Mawatha, Colombo-10',
    telephone: '076 657 87 87',
    telephoneLink: '+94766578787',
  },
  {
    name: 'ALPHA VISION – NELIGAMA',
    address: '1st Lane, Prison Road, Neligama (Delpe Junction)',
    telephone: '071 2 750 740',
    telephoneLink: '+94712750740',
  },
  {
    name: 'ALPHA VISION – RAGAMA',
    address: 'No. 805/2, Thewatta, Ragama',
    telephone: '071 2 750 740',
    telephoneLink: '+94712750740',
  },
]

function createResponsiveImage(
  name: string,
  widths: number[],
  alt: string,
  sizes: string,
  aspectRatio = 4 / 3,
) {
  const toSourceSet = (extension: 'webp' | 'jpg') =>
    widths
      .map((width) => `/images/${name}-${width}.${extension} ${width}w`)
      .join(', ')

  const largestWidth = widths[widths.length - 1]

  return {
    src: `/images/${name}-${largestWidth}.jpg`,
    webpSrcSet: toSourceSet('webp'),
    fallbackSrcSet: toSourceSet('jpg'),
    sizes,
    alt,
    width: largestWidth,
    height: Math.round(largestWidth / aspectRatio),
  }
}

export const images = {
  hero: createResponsiveImage(
    'eyeglasses',
    [480, 768, 1080, 1440],
    'Classic eyeglasses displayed on an open book',
    '(max-width: 680px) calc(100vw - 32px), (max-width: 900px) 55vw, 58vw',
  ),
  eyewear: createResponsiveImage(
    'eyeglasses',
    [480, 768, 1080, 1440],
    'Close-up of clear optical frames and lenses',
    '(max-width: 680px) 78vw, 340px',
  ),
  sunglasses: createResponsiveImage(
    'sunglasses',
    [400, 640, 960],
    'Sunglasses with metal frames on a bright background',
    '(max-width: 680px) 42vw, 200px',
    1.25,
  ),
  optometrist: createResponsiveImage(
    'optometrist',
    [360, 540, 780],
    'Portrait of optometrist Mr. H.A.W. Dhananjaya',
    '(max-width: 680px) 96px, 120px',
    1,
  ),
}
