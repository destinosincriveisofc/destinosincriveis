'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function BlogArtigoRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const vip = searchParams.get('vip');

  useEffect(() => {
    const params = new URLSearchParams();
    if (id) params.set('id', id);
    if (vip) params.set('vip', vip);
    const qs = params.toString();
    router.replace(`/guias/artigo${qs ? '?' + qs : ''}`);
  }, [router, id, vip]);

  return null;
}

export default function BlogArtigoPage() {
  return (
    <Suspense fallback={null}>
      <BlogArtigoRedirect />
    </Suspense>
  );
}
