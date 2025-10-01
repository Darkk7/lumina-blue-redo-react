"use client";

import { useParams } from 'next/navigation';
import InfoCentreListPage from '../../../pages/InfoCentreListPage';

export default function CategoryPage() {
  const params = useParams();
  return <InfoCentreListPage categoryPath={params.category} />;
}
