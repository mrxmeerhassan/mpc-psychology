import Image from "next/image";

export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <Image
        src="/web.png"
        alt="MPC Psychology Center Logo"
        width={400}
        height={200}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}
