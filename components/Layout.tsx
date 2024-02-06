import clsx from "clsx";

export default function Layout({
  color = "none",
  top = "Current Services",
  bottom,
  children,
}: {
  color?: string;
  top?: React.ReactNode;
  background?: string;
  bottom?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx("w-full h-screen relative", `bg-${color}`)}
    >
      <div className="fixed top-20 z-20 w-full px-20">{top}</div>
      <div className="w-full h-full">{children}</div>

      <div className="fixed bottom-0 z-20 w-full px-20">{bottom}</div>
    </div>
  );
}
