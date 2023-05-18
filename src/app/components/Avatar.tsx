import Image from "next/image"
import Link from "next/link"

const Avatar = (
  {
    href, src = "/avatar.png", alt = "Profile image", width = 60, height = 60, priority = false
  }: {
    href: string,
    width?: number,
    height?: number,
    src?: string | null,
    alt?: string | null
    priority?: boolean
  }) => {

  return (
    <Link className="w-16 h-16" href={`profile/${href}`}>
      {src && alt && (
        <Image
          width={width}
          height={height}
          src={src}
          alt={alt}
          priority={priority}
          className="rounded-full" />
      )}
    </Link>
  )
}

export default Avatar