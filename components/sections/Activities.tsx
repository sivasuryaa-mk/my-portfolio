"use client";

import { motion } from "framer-motion";
import { Users, Mic, Heart, Calendar, MapPin, ExternalLink } from "lucide-react";
import { activities, personalInfo } from "@/data/portfolio-content";
import { SplitText } from "@/components/ui/SplitText";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-6 w-6" />,
  Mic: <Mic className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
};

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  Leadership: {
    bg: "bg-accent-primary/15",
    text: "text-accent-primary",
    border: "border-accent-primary/30",
  },
  Development: {
    bg: "bg-accent-secondary/15",
    text: "text-accent-secondary",
    border: "border-accent-secondary/30",
  },
  Volunteering: {
    bg: "bg-accent-tertiary/15",
    text: "text-accent-tertiary",
    border: "border-accent-tertiary/30",
  },
};

export function Activities() {
  return (
    <section id="activities" className="relative min-h-screen px-6 py-24">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-accent-tertiary/5 blur-[150px]" />
        <div className="absolute -right-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-accent-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="mb-4 text-sm uppercase tracking-[0.2em] text-accent-tertiary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Beyond Work
          </motion.p>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            <SplitText
              text="Activities & Volunteering"
              type="words"
              animation="slideUp"
              staggerDelay={0.05}
            />
          </h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-text-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Leadership roles, community involvement, and extracurricular
            activities that shaped my personal growth.
          </motion.p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, index) => (
            <ActivityCard key={`${activity.organization}-${activity.role}`} activity={activity} index={index} />
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-accent-tertiary/30 px-8 py-3 font-medium text-text-secondary transition-all hover:border-accent-tertiary hover:text-accent-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          >
            View Full Profile on LinkedIn
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface ActivityCardProps {
  activity: (typeof activities)[0];
  index: number;
}

function ActivityCard({ activity, index }: ActivityCardProps) {
  const colors = typeColors[activity.type] || typeColors.Development;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div
        className={`relative h-full min-h-[320px] overflow-hidden rounded-2xl border ${colors.border} bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary`}
      >
        {/* Gradient glow on hover */}
        <div
          className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${colors.bg} blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Header */}
        <div className="relative mb-4 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
          >
            {iconMap[activity.icon]}
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
          >
            {activity.type}
          </span>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="mb-1 font-display text-lg font-bold text-text-primary">
            {activity.role}
          </h3>
          <p className="mb-3 text-sm font-medium text-text-secondary">
            {activity.organization}
          </p>

          {/* Meta */}
          <div className="mb-4 flex flex-wrap gap-3 text-xs text-text-secondary/70">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {activity.duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {activity.location.split(",")[0]}
            </span>
          </div>

          {/* Description */}
          <ul className="mb-4 space-y-1.5">
            {activity.description.slice(0, 2).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.bg.replace("/15", "")}`}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {activity.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-text-secondary"
              >
                {skill}
              </span>
            ))}
            {activity.skills.length > 3 && (
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-text-secondary/70">
                +{activity.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
