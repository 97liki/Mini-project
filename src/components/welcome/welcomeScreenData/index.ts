import { Zap, Target, TrendingUp } from "lucide-react";
import { version } from '../../../../package.json';

export const welcomeScreenData = {
  title: {
    gradient1: "Transform",
    textgradient1: "Your Business With",
    gradient2: "GroSight",
  },
  features: [
    {
      icon: Target,
      title: "Smart Insights",
      description:
        "Groq powered analytics to understand customer sentiment and trends",
    },
    {
      icon: TrendingUp,
      title: "Performance Trend",
      description: "Shows recent vs historical performance trend for your business.",
    },
    {
      icon: Zap,
      title: "Deep Analytics",
      description: "Deep insights to help you make informed decisions",
    },
  ] as const,
  heroContent:
    "Unlock powerful insights from your customer reviews. Make informed decisions that drive growth and customer satisfaction.",
  welcomeSectionBottom: "Join to make data-driven decisions",
  welcomeSectionVersionBottom: `v ${version}`,
  getStartedSection:{
    topText: "Get Started",
    middleTitle: "Transform Your Business Today",
    bottomText: "Join to make data-driven decisions",
    buttonText: "Get Started Now",
  }
};
