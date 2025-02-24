import CreditRiskForm from "@/components/shared/CreditRiskForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-3 min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-slate-700 to-slate-400">
      <CreditRiskForm />
    </div>
  );
}
