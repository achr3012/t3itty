'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTransition } from 'react';
import { revalidatePage } from '@/lib/actions';
import { VscArrowLeft } from "react-icons/vsc";
import IconHoverEffect from "./IconHeverEffect";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition();

  const revalidateHandler = () => {
    if (!isPending) {
      startTransition(() => {
        revalidatePage(pathname)
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      })
    }
  }

  var page = "T3itty"
  if (pathname.includes('/profile')) page = "Profile"

  return (
    <div className="sticky top-0 mb-3 border-b shadow bg-white z-10 flex items-center gap-1 p-3">
      {page !== "T3itty" && (
        <Link href="/">
          <IconHoverEffect classes="p-2 rounded-full text-xl">
            <VscArrowLeft />
          </IconHoverEffect>
        </Link>
      )}
      <button onClick={revalidateHandler} className="text-2xl font-bold flex gap-2">
        {page === "T3itty" && (
          <IconHoverEffect classes="rounded-full">
            <Image
              priority
              width={35}
              height={35}
              src="/logo.png"
              alt="T3itty logo" />
          </IconHoverEffect>
        )}
        {page}
      </button>
    </div>
  )
}

export default Header