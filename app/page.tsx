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
              <span className="text-muted-foreground">November 13, 2025</span>
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
      <EventDetails />
      <AgendaTimeline />
    </main>
  )
}
