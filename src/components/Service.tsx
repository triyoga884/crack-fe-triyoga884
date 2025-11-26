import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import React from 'react';

function Service() {
  return (
    <div className="tab-workspace container mx-auto bg-card">
      <Tabs defaultValue="private-office">
        <TabsList>
          <TabsTrigger value="private-office">Private Office</TabsTrigger>
          <TabsTrigger value="meeting-room">Meeting Room</TabsTrigger>
          <TabsTrigger value="podcast-studio">Podcast Studio</TabsTrigger>
        </TabsList>
        <TabsContent value="private-office">
          <div className="wrapper md:flex md:gap-4">
            <Image
              className="mx-auto rounded-xl"
              src="/images/private-office.jpg"
              alt="private office"
              width={400}
              height={400}
            ></Image>
            <div className="content p-2 flex flex-col gap-4">
              <div className="desc">
                <h1 className="text-lg font-medium">Private Office</h1>
                <p className="text-justify">
                  Secure your own dedicated, fully-furnished space built for
                  focus and confidentiality. Our Private Offices are perfect for
                  small teams or individuals who need a permanent, branded hub
                  where they can work without distraction.
                </p>
              </div>
              <div className="benefit">
                <h2 className="text-lg font-medium">Key Benefit</h2>
                <ul>
                  <li>🔒 Total Privacy</li>
                  <li>🔑 24/7 Access</li>
                  <li>🏢 Professional Branding</li>
                  <li>⚙️ Customizable Setup</li>
                </ul>
              </div>
              <Button className="w-full md:w-fit">Book Now</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="meeting-room">
          <div className="wrapper md:flex md:gap-4">
            <Image
              className="mx-auto rounded-xl"
              src="/images/meeting-room.jpg"
              alt="meeting room"
              width={400}
              height={400}
            ></Image>
            <div className="content p-2 flex flex-col gap-4">
              <div className="desc">
                <h1 className="text-lg font-medium">Meeting Room</h1>
                <p className="text-justify">
                  Professional, technology-equipped rooms designed for seamless
                  collaboration and client presentations. Choose the right size,
                  from intimate huddle rooms to large boardrooms, all with
                  plug-and-play simplicity.
                </p>
              </div>
              <div className="benefit">
                <h2 className="text-lg font-medium">Key Benefit</h2>
                <ul>
                  <li>💻 Seamless Tech</li>
                  <li>🤝 Client Ready</li>
                  <li>📅 Flexibility</li>
                  <li>🛠️ Supported</li>
                </ul>
              </div>
              <Button className="w-full md:w-fit">Book Now</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="podcast-studio">
          <div className="wrapper md:flex md:gap-4">
            <Image
              className="mx-auto rounded-xl"
              src="/images/podcast-studio.jpg"
              alt="podcast studio"
              width={400}
              height={400}
            ></Image>
            <div className="content p-2 flex flex-col gap-4">
              <div className="desc">
                <h1 className="text-lg font-medium">Podcast Studio</h1>
                <p className="text-justify">
                  Step into our acoustically-treated, soundproof studio, ready
                  with professional-grade microphones, mixers, and lighting.
                  This is the ultimate dedicated space to record high-quality
                  audio and video content without interference.
                </p>
              </div>
              <div className="benefit">
                <h2 className="text-lg font-medium">Key Benefit</h2>
                <ul>
                  <li>🎙️ Broadcast Quality</li>
                  <li>🔇 Soundproof Environment</li>
                  <li>✨ Ready-to-Go</li>
                  <li>🎯 Focus on Content</li>
                </ul>
              </div>
              <Button className="w-full md:w-fit">Book Now</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Service;
