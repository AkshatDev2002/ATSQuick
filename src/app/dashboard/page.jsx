import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Resume Analysis Dashboard",
  description:
    "View your AI-generated resume score, skills breakdown, ATS compatibility, and job match insights.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
