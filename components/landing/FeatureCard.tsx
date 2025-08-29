import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="feature-card rounded-2xl bg-gray-900 backdrop-blur-xl p-8 border border-white/20 shadow-xl hover:border-green-500/40 hover:shadow-green-500/20 transition duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
};

export default FeatureCard;
