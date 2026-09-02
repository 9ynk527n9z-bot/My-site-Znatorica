'use client';

import ReadinessTest from '@/components/ReadinessTest';
import { GRADE1_READINESS } from '@/lib/readiness/grade1';

export default function SchoolReadinessPage() {
  return <ReadinessTest config={GRADE1_READINESS} />;
}
