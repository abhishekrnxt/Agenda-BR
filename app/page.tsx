"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, Sparkles, PartyPopper } from "lucide-react"
import confetti from "canvas-confetti"

function EventHero() {
  return (
    <header className="relative w-full overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-12">
        <div className="animate-fade-in">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-border/50 glow-on-hover">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer"
                 style={{ backgroundSize: '1000px 100%' }} />

            <Image
              src="/images/event-hero-banner.png"
              alt="Event banner for H-1B Shock & The GCC Advantage"
              width={1280}
              height={480}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function CountdownTimer() {
  const targetDate = new Date("2025-11-13T08:30:00+05:30") // November 13, 2025, 8:30 AM IST (Bengaluru timezone)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [prevTimeLeft, setPrevTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [animatingKeys, setAnimatingKeys] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const [eventEnded, setEventEnded] = useState(false)
  const [confettiTriggered, setConfettiTriggered] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }

        // Detect changes and trigger animation
        const changedKeys = new Set<string>()
        Object.keys(newTimeLeft).forEach((key) => {
          const k = key as keyof typeof newTimeLeft
          if (newTimeLeft[k] !== timeLeft[k]) {
            changedKeys.add(key)
          }
        })

        if (changedKeys.size > 0) {
          setAnimatingKeys(changedKeys)
          setPrevTimeLeft(timeLeft)
          setTimeout(() => setAnimatingKeys(new Set()), 600)
        }

        setTimeLeft(newTimeLeft)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setEventEnded(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Trigger confetti when event ends
  useEffect(() => {
    if (eventEnded && !confettiTriggered) {
      setConfettiTriggered(true)

      // Fire confetti from multiple angles
      const duration = 5000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Fire from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })

        // Fire from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      }, 250)
    }
  }, [eventEnded, confettiTriggered])

  if (!mounted) {
    return null
  }

  // Show Event Ended UI
  if (eventEnded) {
    return (
      <section className="relative w-full overflow-hidden py-16 md:py-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background to-purple-500/10 animate-pulse-slow" />

        {/* Multiple radial glow effects for celebration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-center space-y-8">
            {/* Celebration Icon */}
            <div className="flex justify-center animate-bounce">
              <div className="relative">
                <PartyPopper className="w-24 h-24 md:w-32 md:h-32 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-ping" />
              </div>
            </div>

            {/* Event Ended Title */}
            <div className="space-y-4 animate-slide-up">
              <h2 className="text-4xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-green-500 via-primary to-purple-500 bg-clip-text text-transparent animate-pulse">
                Event Has Ended!
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Thanks for being part of this amazing experience
              </p>
            </div>

            {/* Thank you message */}
            <div className="mt-12 inline-flex items-center gap-2 px-8 py-4 glass-effect-light rounded-full animate-float border border-primary/20">
              <Sparkles className="w-5 h-5 text-primary" />
              <p className="text-lg font-semibold gradient-text">
                We hope to see you at our next event!
              </p>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Show Countdown UI
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 animate-pulse-slow" />

      {/* Radial glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center space-y-8 animate-slide-up">
          {/* Title with sparkle icon */}
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight gradient-text">
              Event Starts In
            </h2>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          </div>

          {/* Countdown grid with glass effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              { value: timeLeft.days, label: 'Days', key: 'days', delay: '0ms' },
              { value: timeLeft.hours, label: 'Hours', key: 'hours', delay: '100ms' },
              { value: timeLeft.minutes, label: 'Minutes', key: 'minutes', delay: '200ms' },
              { value: timeLeft.seconds, label: 'Seconds', key: 'seconds', delay: '300ms' }
            ].map((item, index) => {
              const isAnimating = animatingKeys.has(item.key)
              return (
                <div
                  key={item.label}
                  className="relative group animate-scale-in"
                  style={{ animationDelay: item.delay }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative glass-effect-light rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-primary/20">
                    <div
                      className={`text-4xl md:text-6xl font-bold gradient-text transition-all duration-300 ${
                        isAnimating ? 'number-change' : ''
                      }`}
                      style={{
                        display: 'inline-block',
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-3 font-semibold uppercase tracking-wider">
                      {item.label}
                    </div>

                    {/* Decorative corner accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Date info with animated background */}
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-effect-light rounded-full animate-float">
            <Calendar className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium">
              November 13, 2025 at 8:30 AM IST
            </p>
          </div>

          {/* View Agenda CTA Button */}
          <div className="animate-scale-in" style={{ animationDelay: '400ms' }}>
            <a
              href="#agenda"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-primary/90 hover:to-secondary/90 group"
            >
              <span>View Agenda</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

type AgendaItem = {
  time: string
  title: string
  description: string
}

const agenda: AgendaItem[] = [
  {
    time: "8:30 AM – 9:30 AM",
    title: "Meet and Greet with Breakfast",
    description: "Arrive early, enjoy a hot breakfast, and connect with fellow marketing and strategy leaders before the session kicks off.",
  },
  {
    time: "9:30 AM – 10:00 AM",
    title: "Executive Networking",
    description:
      "Informal networking and introductions with attendees and speakers — build early connections and align on the day's core theme.",
  },
  {
    time: "10:00 AM – 11:00 AM",
    title: "Session 1: H-1B Shock and the GCC Advantage",
    description:
      "A focused discussion on how the H-1B policy shift is accelerating GCC expansion, shifting decision-making to India, and changing how SaaS and tech companies approach GTM.",
  },
  {
    time: "11:00 AM – 11:15 AM",
    title: "Coffee Break",
    description:
      "A short break to refresh and continue conversations in an informal setting.",
  },
  {
    time: "11:15 AM – 12:30 PM",
    title: "Session 2: Targeting, Personas & GCC Playbooks",
    description:
      "Deep dive into GCC targeting frameworks, stakeholder mapping, and marketing strategies — with Bamboo Reports intelligence powering precision GTM.",
  },
  {
    time: "12:30 PM Onwards",
    title: "Networking Lunch",
    description:
      "Unwind over lunch with fellow leaders and speakers. A great opportunity to deepen conversations, exchange playbooks, and explore collaborations.",
  },
]

function AgendaTimeline() {
  return (
    <section id="agenda" aria-labelledby="agenda-title" className="relative w-full overflow-hidden py-16 md:py-20 scroll-mt-8">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mb-12 md:mb-16 text-center animate-slide-up">
          <h2 id="agenda-title" className="text-balance text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text mb-4">
            A Morning Packed With Actionable Insights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join us for an immersive experience filled with networking, insights, and strategic discussions
          </p>
        </div>

        <ol className="relative ml-6 md:ml-8">
          {/* Vertical line with gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

          {agenda.map((item, idx) => (
            <li
              key={idx}
              className="relative mb-12 pl-8 md:pl-12 last:mb-0 group animate-slide-in-left"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Timeline dot with pulse effect */}
              <div
                className="absolute -left-[11px] top-3 size-6 rounded-full border-4 border-primary bg-background shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl group-hover:border-secondary"
                aria-hidden="true"
              >
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              </div>

              {/* Content card */}
              <div className="relative glass-effect-light rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 border border-primary/10">
                {/* Decorative corner gradient */}
                <div className="absolute -top-1 -right-1 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-tr-2xl rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex flex-col gap-3">
                  {/* Time badge */}
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {item.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated gradient orbs in background */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow -z-10" style={{ animationDelay: '1s' }} />

      <EventHero />
      <CountdownTimer />
      <AgendaTimeline />

      {/* Scroll to top button effect area */}
      <div className="h-20" />
    </main>
  )
}
