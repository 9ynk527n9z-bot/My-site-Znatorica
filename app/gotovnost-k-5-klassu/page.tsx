'use client';

import ReadinessTest from '@/components/ReadinessTest';
import { GRADE5_READINESS } from '@/lib/readiness/grade5';

export default function Grade5ReadinessPage() {
  return <ReadinessTest config={GRADE5_READINESS} />;
}
