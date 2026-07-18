import ArticleDetailClient from './ArticleDetailClient';

export async function generateStaticParams() {
  const mockIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  try {
    const res = await fetch('https://destinosincriveis.vps-kinghost.net/api/blog');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const dynamicIds = data.map((item: any) => String(item.id));
        const allIds = Array.from(new Set([...mockIds, ...dynamicIds]));
        return allIds.map((id) => ({ id }));
      }
    }
  } catch (err) {
    console.error("Failed to fetch blog post IDs for static params:", err);
  }
  return mockIds.map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ArticleDetailClient id={resolvedParams.id} />;
}
