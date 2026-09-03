import Link from "next/link";

type SectionCtaLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function SectionCtaLink({ href, children }: SectionCtaLinkProps) {
  return (
    <div className="mt-5 flex justify-center sm:mt-6">
      <Link
        href={href}
        className="group inline-flex items-center gap-3 rounded-[14px] border border-[#dfe2e8] bg-white px-7 py-3.5 text-[14px] font-semibold text-[#28303d] shadow-[0_2px_12px_rgba(40,48,61,0.06)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-px hover:border-[rgba(40,48,61,0.2)] hover:shadow-[0_8px_28px_rgba(40,48,61,0.1)]"
      >
        <span>{children}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}
