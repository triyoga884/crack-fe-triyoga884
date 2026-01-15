import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Link from 'next/link';
import { WorkspaceTab } from '@/lib/type';

function Service() {
  const data: WorkspaceTab[] = require('@/assets/data/WorkspaceTab.json');
  return (
    <div className="container mx-auto my-10 min-h-[400px] rounded-2xl bg-card p-6 shadow-sm">
      <Tabs defaultValue={data[0].value} className="space-y-6">
        {/* Tabs Header */}
        <TabsList className="flex justify-center gap-2 sm:justify-start">
          {data.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-lg p-2 md:px-4 md:py-2 text-sm font-medium"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        {data.map((tab) => (
          <TabsContent
            value={tab.value}
            key={tab.value}
            className="focus-visible:outline-none"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              {/* Image */}
              <Image
                className="mx-auto h-[280px] w-full max-w-sm rounded-xl object-cover shadow-sm md:h-[360px]"
                src={tab.image}
                alt={tab.name}
                unoptimized
                width={400}
                height={400}
              />

              {/* Content */}
              <div className="flex flex-1 flex-col gap-5">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {tab.name}
                  </h1>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tab.desc}
                  </p>
                </div>

                <div className="space-y-2">
                  <h2 className="text-base font-semibold">Key Benefits</h2>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {tab.key_benefit.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                <Link href={`/workspaces?type=${tab.value}`}>
                  <Button className="mt-2 w-full sm:w-fit px-8">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default Service;
