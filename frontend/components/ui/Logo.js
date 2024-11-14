import Image from 'next/image'

export default function Logo({ width = 100, height = 100 }) {
  return (
    <Image src="/fona.png" alt="Logo" width={width} height={height} priority />
  )
}
