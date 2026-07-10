'use client';

import { useEffect, useState } from 'react';

interface TrainerEmbedProps {
  title: string;
  description: string;
  htmlContent: string;
}

export default function TrainerEmbed({ title, description, htmlContent }: TrainerEmbedProps) {
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setIframeKey(prev => prev + 1);
  }, [htmlContent]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden">
        <iframe
          key={iframeKey}
          srcDoc={htmlContent}
          className="w-full h-screen"
          sandbox="allow-same-origin allow-scripts allow-popups"
          title={title}
        />
      </div>
    </div>
  );
}
