
import { motion } from "framer-motion";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline = ({ events }: TimelineProps) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="timeline-item"
        >
          <div className="rounded-lg border bg-card p-4">
            <h3 className="sf-pro-display text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.date}</p>
            <p className="mt-2 sf-pro-text">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
