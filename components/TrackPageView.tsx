'use client';

import { useEffect } from 'react';
import { trackUsage } from '@/lib/track';

export default function TrackPageView({ type }: { type: string }) {
  useEffect(() => {
    trackUsage(type);
  }, [type]);

  return null;
}
