'use client';

import ReadinessTest from '@/components/ReadinessTest';
import { GRADE4_READINESS } from '@/lib/readiness/grade4';

export default function Grade4ReadinessPage() {
  return <ReadinessTest config={GRADE4_READINESS} />;
}
