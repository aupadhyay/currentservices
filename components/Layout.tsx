import { ICursor } from "@/api";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Header({
  color = "white",
  showIndex = true,
  showColophon = false,
}: {
  color?: string;
  showIndex?: boolean;
  showColophon?: boolean;
}) {
  return (
    <div className="flex justify-between w-full">
      <div>
        <h1
          className={clsx(
            "font-favorit font-regular text-[16px] transition-colors ease-in-out duration-500",
            `text-${color}`,
          )}
        >
          <Link href="/about" className="tracking-[-0.01em] cursor-[inherit]">
            Current Services
          </Link>
        </h1>
      </div>
      {showIndex && (
        <div>
          <h1
            className={clsx(
              "font-favorit font-regular text-[16px] transition-colors ease-in-out duration-500",
              `text-${color}`,
            )}
          >
            <Link className="cursor-[inherit]" href="/">
              Index
            </Link>
          </h1>
        </div>
      )}
      {showColophon && (
        <div>
          <h1
            className={clsx(
              "font-favorit font-regular text-[16px] transition-colors ease-in-out duration-500",
              `text-${color}`,
            )}
          >
            <Link href="/colophon" className="cursor-[inherit]">
              Colophon
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
}

function getCursor(
  cursor: "vertical" | "angled" | "normal",
  direction: "down" | "up",
  color: "white" | "black",
) {
  const cursors: {
    [key: string]: string;
  } = {
    "angled-white": `url(/cursors/angled-white.svg)`,
    "angled-black": `url(/cursors/angled-black.svg)`,
    "vertical-down-white": `url(/cursors/vertical-down-white.svg)`,
    "vertical-down-black": `url(/cursors/vertical-down-black.svg)`,
    "vertical-up-white": `url(/cursors/vertical-up-white.svg)`,
    "vertical-up-black": `url(/cursors/vertical-up-black.svg)`,
    normal: "normal",
  };

  const cursorPath =
    cursors[`${cursor}-${direction}-${color}`] ||
    cursors[`${cursor}-${direction}`] ||
    cursors[`${cursor}-${color}`] ||
    cursors[cursor];
  return cursorPath;
}

export default function Layout({
  color = "None",
  textColor = "white",
  top,
  bottom,
  cursor = "normal",
  scrollRef,
  className = "",
  children,
  colophon = false,
  about = false,
}: {
  color?: string;
  textColor?: "white" | "black";
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  className?: string;
  cursor?: ICursor;
  children?: React.ReactNode;
  scrollRef?: React.RefObject<HTMLDivElement>;
  colophon?: Boolean;
  about?: Boolean;
}) {
  const mouseRef = useRef<HTMLDivElement>(null);
  const [mouseY, setMouseY] = useState<number>(0);
  const [cursorUrl, setCursorUrl] = useState<string>(
    getCursor(cursor, "down", textColor),
  );

  useEffect(() => {
    const direction = mouseY > window.innerHeight / 2 ? "down" : "up";
    setCursorUrl(getCursor(cursor, direction, textColor));
  }, [cursor, textColor, mouseY]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    mouseRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      mouseRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={clsx(
        "w-full relative",
        color && `bg-${color}`,
        colophon || about ? "h-full sm:h-screen" : "h-screen",
        className,
      )}
      style={{
        cursor: `${cursorUrl}, auto`,
      }}
      ref={mouseRef}
    >
      <div
        className={clsx(
          "z-20 w-full sm:px-20 px-10 sm:top-20 top-10",
          colophon || about ? "relative sm:fixed" : "fixed",
        )}
      >
        {top}
      </div>
      <div
        className="w-full h-full snap-y snap-mandatory overflow-y-scroll"
        ref={scrollRef}
      >
        {children}
      </div>

      <div
        className={clsx(
          "sm:bottom-20 z-20 w-full sm:px-20 px-10 bottom-10",
          colophon || about ? "relative sm:fixed" : "fixed",
        )}
      >
        {bottom}
      </div>
    </div>
  );
}
