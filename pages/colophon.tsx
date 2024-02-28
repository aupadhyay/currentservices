import clsx from "clsx"
import Link from "next/link"
import Layout, { Header } from "../components/Layout"

export default function About() {
  return (
    <Layout
      color="[#FF242F]"
      top={
        <Header showIndex={false} showColophon={true} />
      }
      bottom={
        <div>
          <h1
            className={clsx(
              "font-favorit font-regular text-[32px] text-white transition-colors ease-in-out duration-500",
            )}
          >
            <Link href="/">Index</Link>
          </h1>
        </div>
      }
    >
    </Layout>
  )
}
