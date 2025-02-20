
import { motion } from "framer-motion";

interface EntityCardProps {
  title: string;
  type: string;
  description: string;
  relationships: string[];
}

export const EntityCard = ({ title, type, description, relationships }: EntityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="entity-card"
    >
      <div className="mb-2">
        <span className="inline-block rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
          {type}
        </span>
      </div>
      <h3 className="sf-pro-display mb-2 text-xl font-semibold">{title}</h3>
      <p className="sf-pro-text mb-4 text-sm text-muted-foreground">{description}</p>
      {relationships.length > 0 && (
        <div className="mt-4">
          <h4 className="sf-pro-display mb-2 text-sm font-semibold">Related to:</h4>
          <div className="flex flex-wrap gap-2">
            {relationships.map((rel, index) => (
              <span
                key={index}
                className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
              >
                {rel}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
