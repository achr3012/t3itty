import Link from "next/link"

const Avatar = (
  {
    href, src, alt
  }: {
    href: string,
    src: string,
    alt: string
  }) => {

  return (
    <Link href={`profile/${href}`}>
      <img src={src} alt={alt} className="rounded-full" />
    </Link>
  )
}

export default Avatar