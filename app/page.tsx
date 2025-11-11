"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock } from "lucide-react"

function EventHero() {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto max-w-4xl px-6 py-0">
        <Image
          src="/images/event-hero-banner.png"
          alt="Event banner for H-1B Shock & The GCC Advantage"
          width={1280}
          height={480}
          className="w-full h-auto rounded-md border object-cover"
          priority
        />
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="w-full bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Event Starts In
          </h2>
          <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-5xl font-bold text-primary">
                {timeLeft.days}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
                Days
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-5xl font-bold text-primary">
                {timeLeft.hours}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
                Hours
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-5xl font-bold text-primary">
                {timeLeft.minutes}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
                Minutes
              </div>
            </div>
            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-5xl font-bold text-primary">
                {timeLeft.seconds}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
                Seconds
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            November 13, 2025 at 8:30 AM
          </p>
        </div>
      </div>
    </section>
  )
}

function EventDetails() {
  return (
    <section aria-labelledby="event-details-title" className="w-full border-b bg-background">
      <h2 id="event-details-title" className="sr-only">
        Event details
      </h2>
      <div className="mx-auto max-w-4xl px-6 py-5">
        <ul className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
          <li className="flex items-center gap-3 rounded-md border bg-card px-4 py-3">
            <Calendar className="size-4 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium">Date</span>
              <span className="text-muted-foreground">Thursday, November 13, 2025</span>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-md border bg-card px-4 py-3">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium">Location</span>
              <span className="text-muted-foreground">Hilton, Embassy Golflinks, Bengaluru</span>
            </div>
          </li>
          <li className="flex items-center gap-3 rounded-md border bg-card px-4 py-3">
            <Clock className="size-4 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-medium">Time</span>
              <span className="text-muted-foreground">8:30 AM – 13:00 PM+</span>
            </div>
          </li>
        </ul>
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
    <section aria-labelledby="agenda-title" className="w-full">
      <div className="mx-auto max-w-4xl px-6 py-10 md:py-12">
        <div className="mb-6">
          <h2 id="agenda-title" className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            A Morning Packed With Actionable Insights
          </h2>
        </div>

        <ol className="ml-3">
          {agenda.map((item, idx) => (
            <li key={idx} className="relative mb-8 border-l border-border pl-6 last:mb-0 group">
              <div
                className="absolute -left-[8px] top-2 size-3 rounded-full border-2 border-primary bg-background transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  {item.time}
                </span>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
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
    <main>
      <EventHero />
      <CountdownTimer />
      <EventDetails />
      <AgendaTimeline />
    </main>
  )
}
