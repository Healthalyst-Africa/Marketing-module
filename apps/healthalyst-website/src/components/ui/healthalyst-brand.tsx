import Image from "next/image";
import Link from "next/link";
import { BrandLockup } from "@healthalyst/ui/components/marketing-section";

export function LogoMark() {
  return (
    <BrandLockup
      mark={
        <Image
          src="/logo.jpg"
          alt=""
          width={1024}
          height={1023}
          sizes="96px"
          className="absolute left-[-47%] top-[-22%] h-auto w-[195%] max-w-none"
        />
      }
      name="Healthalyst"
    />
  );
}

export function LogoLink() {
  return (
    <Link
      href="/"
      aria-label="Healthalyst Africa home"
      className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <LogoMark />
    </Link>
  );
}
