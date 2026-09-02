'use client';

import ReadinessTest from '@/components/ReadinessTest';
import { GRADE3_READINESS } from '@/lib/readiness/grade3';

export default function Grade3ReadinessPage() {
  return <ReadinessTest config={GRADE3_READINESS} />;
}
