'use client';

import ReadinessTest from '@/components/ReadinessTest';
import { GRADE2_READINESS } from '@/lib/readiness/grade2';

export default function Grade2ReadinessPage() {
  return <ReadinessTest config={GRADE2_READINESS} />;
}
