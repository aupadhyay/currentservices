import clsx from "clsx"

export default function Layout({
  color = "none",
  top,
  bottom,
  children,
}: {
  color?: string
  top?: React.ReactNode
  bottom?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx("w-full px-24 py-20 h-screen relative", `bg-${color}`)}
    >
      <div className="absolute top-16">{top}</div>
      <div className="w-full h-full">{children}</div>

      <div className="absolute bottom-20">{bottom}</div>
    </div>
  )
}