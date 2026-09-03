"use client";

import type { SiteContent } from "@/lib/content/types";
import { ServicesPanelGlass } from "@/components/ui/ServicesPanelGlass";
import { LogoImage } from "@/components/ui/LogoImage";

type ClientItem = SiteContent["homeSections"]["clients"]["items"][number];

export function ClientPartnerCard({
  client,
  index,
}: {
  client: ClientItem;
  index: number;
}) {
  return (
    <ServicesPanelGlass
      id={`client-card-${index}`}
      className="h-full [--panel-radius:18px] max-lg:[--panel-radius:16px]"
    >
      <div className="flex aspect-[4/3] items-center justify-center p-4 sm:p-5">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-[#eceef2] bg-white px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-4">
          <div className="relative h-14 w-full max-w-[82%] sm:h-16">
            <LogoImage
              src={client.src}
              alt={client.name}
              fill
              sizes="(max-width: 640px) 42vw, 160px"
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </ServicesPanelGlass>
  );
}
