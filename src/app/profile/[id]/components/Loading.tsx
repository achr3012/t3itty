import type { ReactNode } from "react"

const Loading = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div className="w-full h-44 bg-slate-500 rounded-b-2xl" />
      <div className="flex flex-col px-5 -mt-20">
        <div className="w-36 h-36 bg-slate-800 rounded-full mb-3 border-2 border-black" />
        {children}
      </div>
    </>
  )
}

export default Loading