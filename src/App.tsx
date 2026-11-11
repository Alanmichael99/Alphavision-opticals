import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Eye,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { business, images, locations, services } from './data/business'
import './App.css'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Locations', href: '#locations' },
  { label: 'Contact', href: '#contact' },
]

const copyrightYear = new Date().getFullYear()

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
}

function getWhatsAppLink(message: string) {
  const number = business.whatsappNumber.replace(/\D/g, '')
  const recipient = number ? `https://wa.me/${number}` : 'https://wa.me/'
  return `${recipient}?text=${encodeURIComponent(message)}`
}

function isValidSriLankanPhone(value: string) {
  const compact = value.trim().replace(/[\s()-]/g, '')
  return /^(?:(?:\+94|0094)[1-9]\d{8}|0[1-9]\d{8})$/.test(compact)
}

function ResponsiveImage({
  image,
  className,
  loading = 'lazy',
  fetchPriority,
}: {
  image: (typeof images)[keyof typeof images]
  className: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}) {
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={image.webpSrcSet} sizes={image.sizes} />
      <img
        src={image.src}
        srcSet={image.fallbackSrcSet}
        sizes={image.sizes}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 12)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0]
        if (activeEntry) setActiveSection(activeEntry.target.id)
      },
      { rootMargin: '-24% 0px -68% 0px' },
    )
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', updateScrollState)
      observer.disconnect()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header
        className={`site-header${scrolled ? ' is-scrolled' : ''}`}
        onKeyDown={(event) => {
          if (event.key === 'Escape') closeMenu()
        }}
      >
        <div className="header-inner page-width">
          <a className="brand" href="#home" aria-label="Alpha Vision home" onClick={closeMenu}>
            <picture className="brand-logo">
              <source
                type="image/webp"
                sizes="215px"
                srcSet="
                  /images/alpha-vision-logo-480.webp 480w,
                  /images/alpha-vision-logo-960.webp 960w,
                  /images/alpha-vision-logo-1440.webp 1440w
                "
              />
              <img src="/alpha-vision-logo.png" alt="" width={1517} height={452} />
            </picture>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="button button-small header-appointment" href="#contact">
            Book an appointment
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') closeMenu()
              }}
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
                >
                  {item.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
              <a className="button mobile-booking" href="#contact" onClick={closeMenu}>
                Book an appointment
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

function HeroSection() {
  return (
    <section className="hero section-shell" id="home" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true">
        <span className="ambient-orbit ambient-orbit--outer">
          <span />
        </span>
        <span className="ambient-orbit ambient-orbit--inner" />
        <span className="ambient-glow" />
      </div>
      <div className="hero-grid page-width">
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
          }}
        >
          <motion.p className="eyebrow" variants={reveal}>
            <span className="eyebrow-rule" />
            Thoughtful eye care in Sri Lanka
          </motion.p>
          <motion.h1 variants={reveal} id="hero-title">
            A clearer view
            <br />
            <span>of what matters.</span>
          </motion.h1>
          <motion.p className="hero-description" variants={reveal}>
            Comprehensive vision assessments, personalized care, and optical
            services for every stage of life.
          </motion.p>
          <motion.div className="hero-actions" variants={reveal}>
            <a className="button" href="#contact">
              Book an appointment
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="text-link" href="#services">
              Explore our services
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </motion.div>
          <motion.div className="hero-professional" variants={reveal}>
            <ResponsiveImage
              image={images.optometrist}
              className="hero-professional-photo"
              loading="eager"
            />
            <span>
              <strong>{business.professional.name}</strong>
              <span>Optometrist · Vision Therapist</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <ResponsiveImage
            image={images.hero}
            className="hero-photo"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-photo-shade" aria-hidden="true" />
          <div className="hero-image-caption">
            <span className="caption-copy">
              <strong>See with confidence</strong>
              <span>Care shaped around your vision</span>
            </span>
            <span className="caption-icon" aria-hidden="true">
              <Eye size={19} />
            </span>
          </div>
        </motion.div>
      </div>

      <div className="hero-bottom page-width" aria-label="Care areas">
        <span>Adult &amp; pediatric care</span>
        <span>Vision therapy</span>
        <span>Low vision support</span>
        <a href="#about" aria-label="Learn more about Alpha Vision">
          Discover Alpha Vision <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  headingId,
}: {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
  headingId?: string
}) {
  return (
    <motion.div
      className={`section-heading${centered ? ' is-centered' : ''}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <p className="eyebrow">
        <span className="eyebrow-rule" />
        {eyebrow}
      </p>
      <h2 id={headingId}>{title}</h2>
      <p className="section-description">{description}</p>
    </motion.div>
  )
}

function AboutSection() {
  return (
    <section className="about-section section-shell" id="about" aria-labelledby="about-title">
      <div className="about-grid page-width">
        <motion.div
          className="about-brand-card"
          initial="hidden"
          whileInView="visible"
          variants={reveal}
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="about-card-label">OUR APPROACH</span>
          <div className="eyewear-gallery">
            <ResponsiveImage image={images.eyewear} className="provided-logo" />
            <div className="sunglasses-inset">
              <ResponsiveImage image={images.sunglasses} className="sunglasses-photo" />
              <span>Everyday eyewear</span>
            </div>
          </div>
          <p>See the details. Feel the difference.</p>
          <span className="about-card-orbit orbit-one" aria-hidden="true" />
          <span className="about-card-orbit orbit-two" aria-hidden="true" />
        </motion.div>

        <div className="about-copy">
          <SectionHeading
            eyebrow="About Alpha Vision"
            title="Care that sees the whole picture."
            description="At Alpha Vision, vision care begins with listening. We offer personalized optometry and optical services for adults, children, and people with specialized visual needs."
            headingId="about-title"
          />
          <p className="about-detail">
            From routine vision assessments to pediatric and functional vision
            care, vision therapy, and low vision rehabilitation, we take time
            to understand each person’s needs and explain the options clearly.
          </p>
          <div className="professional-card">
            <ResponsiveImage image={images.optometrist} className="professional-photo" />
            <div className="professional-details">
              <p className="professional-label">YOUR OPTOMETRIST</p>
              <h3>{business.professional.name}</h3>
              <p className="professional-focus">
                Optometrist <span>·</span> Vision Therapist
              </p>
              <ul>
                {business.professional.designations.map((designation) => (
                  <li key={designation}>
                    <Check size={15} aria-hidden="true" />
                    {designation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a className="text-link about-link" href="#contact">
            Speak with your Optometrist <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ServicesSection({ onEnquire }: { onEnquire: (serviceName: string) => void }) {
  return (
    <section
      className="services-section section-shell"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="page-width">
        <SectionHeading
          eyebrow="Our services"
          title="Comprehensive vision care."
          description="Personalized vision assessments, specialized care, and optical services for every stage of life."
          centered
          headingId="services-title"
        />
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                className="service-card"
                key={service.name}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                viewport={{ once: true, amount: 0.14 }}
                transition={{ delay: (index % 4) * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <span className="service-icon" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.65} />
                </span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <a
                  className="service-enquire"
                  href="#contact"
                  onClick={() => onEnquire(service.name)}
                  aria-label={`Enquire about ${service.name}`}
                >
                  Enquire <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </motion.article>
            )
          })}
        </div>
        <p className="services-note">
          Have a question about a service? Get in touch to discuss your needs
          before arranging a visit.
        </p>
      </div>
    </section>
  )
}

function LocationsSection() {
  return (
    <section
      className="locations-section section-shell"
      id="locations"
      aria-labelledby="locations-title"
    >
      <div className="page-width">
        <SectionHeading
          eyebrow="Visit us"
          title="Our Locations"
          description="Visit Alpha Vision at one of our convenient locations."
          centered
          headingId="locations-title"
        />
        <div className="locations-grid">
          {locations.map((location, index) => (
            <motion.article
              className="location-card"
              key={location.name}
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="location-card-top">
                <span className="location-icon" aria-hidden="true">
                  <MapPin size={20} />
                </span>
                <span className="location-number">0{index + 1}</span>
              </div>
              <h3>{location.name}</h3>
              <p className="location-address">{location.address}</p>
              <a
                className="location-phone"
                href={`tel:${location.telephoneLink}`}
                aria-label={`Call ${location.name}, ${location.telephone}`}
              >
                <Phone size={15} aria-hidden="true" />
                {location.telephone}
              </a>
              <a
                className="location-directions"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                target="_blank"
                rel="noreferrer"
              >
                Get directions <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

type FormErrors = {
  name?: string
  phone?: string
  message?: string
}

function ContactSection({ selectedService }: { selectedService: string | null }) {
  const hasVerifiedWhatsApp = Boolean(business.whatsappNumber.trim())
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredLocation, setPreferredLocation] = useState('')
  const [messageDraft, setMessageDraft] = useState<{
    service: string | null
    text: string
  } | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [preparedLink, setPreparedLink] = useState('')
  const message =
    messageDraft?.service === selectedService
      ? messageDraft.text
      : selectedService
        ? `I’d like to enquire about ${selectedService}.`
        : ''

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: FormErrors = {}
    if (!name.trim()) nextErrors.name = 'Please enter your name.'
    if (!isValidSriLankanPhone(phone)) {
      nextErrors.phone = 'Enter a valid Sri Lankan phone number, including its area or mobile prefix.'
    }
    if (!message.trim()) nextErrors.message = 'Please tell us briefly what you would like to enquire about.'
    setErrors(nextErrors)
    setPreparedLink('')

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0]
      document.getElementById(`contact-${firstInvalidField}`)?.focus()
      return
    }

    const branch = locations.find((location) => location.name === preferredLocation)
    const inquiry = [
      `Hello Alpha Vision, I’d like to make an appointment enquiry.`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      branch ? `Preferred location: ${branch.name}` : '',
      `Enquiry: ${message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n')

    setPreparedLink(getWhatsAppLink(inquiry))
  }

  return (
    <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid page-width">
        <div className="contact-copy">
          <SectionHeading
            eyebrow="Let’s talk"
            title="Your next step starts here."
            description="For appointment enquiries or questions about our services, call a location or prepare a message for WhatsApp."
            headingId="contact-title"
          />
          <div className="contact-branches">
            {locations.map((location) => (
              <a
                className="contact-branch"
                href={`tel:${location.telephoneLink}`}
                key={location.name}
              >
                <span>
                  <Phone size={17} aria-hidden="true" />
                </span>
                <span>
                  <strong>{location.name}</strong>
                  <span>{location.telephone}</span>
                </span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="contact-privacy">
            We do not collect or transmit form data on this website.
          </p>
        </div>

        <div className="contact-form-card">
          <div className="form-heading">
            <span className="form-heading-icon" aria-hidden="true">
              <MessageCircle size={20} strokeWidth={1.6} />
            </span>
            <div>
              <h3>Appointment enquiry</h3>
              <p>Share a few details to prepare your message.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                    setErrors((current) => ({ ...current, name: undefined }))
                    setPreparedLink('')
                  }}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  required
                />
                {errors.name && (
                  <span className="field-error" id="contact-name-error">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="contact-phone">Phone number</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="07X XXX XXXX"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value)
                    setErrors((current) => ({ ...current, phone: undefined }))
                    setPreparedLink('')
                  }}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  required
                />
                {errors.phone && (
                  <span className="field-error" id="contact-phone-error">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-location">Preferred location <span>(optional)</span></label>
              <div className="select-wrap">
                <select
                  id="contact-location"
                  name="location"
                  value={preferredLocation}
                  onChange={(event) => {
                    setPreferredLocation(event.target.value)
                    setPreparedLink('')
                  }}
                >
                  <option value="">Choose a location</option>
                  {locations.map((location) => (
                    <option key={location.name} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={17} aria-hidden="true" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-message">How can we help?</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={message}
                onChange={(event) => {
                  setMessageDraft({ service: selectedService, text: event.target.value })
                  setErrors((current) => ({ ...current, message: undefined }))
                  setPreparedLink('')
                }}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                required
              />
              {errors.message && (
                <span className="field-error" id="contact-message-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button className="button form-submit" type="submit">
              Prepare WhatsApp message
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <p className="form-disclaimer">
              {hasVerifiedWhatsApp
                ? 'This form does not send automatically. Review the message in WhatsApp before sending it to Alpha Vision.'
                : 'This form does not send automatically. WhatsApp has no verified Alpha Vision number configured; choose a verified Alpha Vision contact before sending.'}
            </p>
            {preparedLink && (
              <div className="form-result" role="status">
                <p>
                  {hasVerifiedWhatsApp
                    ? 'Your message is ready but has not been sent. Continue in WhatsApp to review and send it, or call one of the locations.'
                    : 'Your message is ready but has not been sent. Continue in WhatsApp and select a verified Alpha Vision contact, or call one of the locations.'}
                </p>
                <a href={preparedLink} target="_blank" rel="noreferrer">
                  Continue in WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-width">
        <div className="footer-brand">
          <a className="brand brand-inverted" href="#home" aria-label="Alpha Vision home">
            <picture className="brand-logo">
              <source
                type="image/webp"
                sizes="215px"
                srcSet="
                  /images/alpha-vision-logo-480.webp 480w,
                  /images/alpha-vision-logo-960.webp 960w,
                  /images/alpha-vision-logo-1440.webp 1440w
                "
              />
              <img src="/alpha-vision-logo.png" alt="" width={1517} height={452} />
            </picture>
          </a>
          <p>Expert care, Excellent Vision.</p>
          <p className="footer-professional">
            {business.professional.name}
            <br />
            {business.professional.designations.join(' · ')}
          </p>
        </div>

        <div className="footer-links">
          <h2>Explore</h2>
          {navigation.slice(1, 4).map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="footer-links footer-branches">
          <h2>Find us</h2>
          {locations.map((location) => (
            <a key={location.name} href="#locations">
              {location.name}
            </a>
          ))}
          <h2 className="footer-contact-heading">Call us</h2>
          <a href={`tel:${locations[0].telephoneLink}`}>
            Colombo-10 · {locations[0].telephone}
          </a>
          <a href={`tel:${locations[1].telephoneLink}`}>
            Neligama &amp; Ragama · {locations[1].telephone}
          </a>
        </div>

        <div className="footer-cta">
          <p>Here to help you see clearly.</p>
          <a className="button button-light" href="#contact">
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>© {copyrightYear} Alpha Vision. All rights reserved.</span>
        <a href="#home">Back to top <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </footer>
  )
}

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection onEnquire={setSelectedService} />
        <LocationsSection />
        <ContactSection selectedService={selectedService} />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export default App
