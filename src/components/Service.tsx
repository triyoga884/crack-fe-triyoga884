import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import React from 'react';
import Link from 'next/link';
import { WorkspaceTab } from '@/lib/type';

function Service() {
  const data: WorkspaceTab[] = require('@/assets/data/WorkspaceTab.json');
  console.log(data[0]);
  return (
    <div className="tab-workspace container mx-auto bg-card p-6 rounded-xl my-8 min-h-[400px]">
      <Tabs defaultValue={data[0].value}>
        <TabsList>
          {data.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map((tab) => (
          <TabsContent value={tab.value} key={tab.value}>
            <div className="wrapper md:flex md:gap-8">
              <Image
                className="mx-auto rounded-xl object-cover"
                src={tab.image}
                alt={tab.name}
                unoptimized
                width={400}
                height={400}
              ></Image>
              <div className="content p-2 flex flex-col gap-4">
                <div className="desc">
                  <h1 className="text-2xl font-bold">{tab.name}</h1>
                  <p className="text-justify">{tab.desc}</p>
                </div>
                <div className="benefit">
                  <h2 className="text-lg font-medium">Key Benefit</h2>
                  <ul>
                    {tab.key_benefit.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <Link href={`/workspaces?type=${tab.value}`}>
                  <Button className="w-full md:w-fit">Book Now</Button>
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
