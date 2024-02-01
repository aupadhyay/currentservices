export default function Layout( { top, bottom, children} : {
    top: React.ReactNode,
    bottom: React.ReactNode,
    children: React.ReactNode
} ) {
  return (
    <div className="w-full px-24 py-20 bg-[#FF242F] h-screen relative">
      <div className="absolute top-16">{top}</div>
      <div className="w-full h-full">
        {children}
      </div>

      <div className="absolute bottom-20">{bottom}</div>
    </div>
  )
}