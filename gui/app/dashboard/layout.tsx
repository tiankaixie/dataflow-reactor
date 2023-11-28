import { DashboardSetting } from "@/components/dashboard-setting"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <DashboardSetting />

      {children}
    </section>
  )
}
