import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import SimplePage from '@/components/ui/SimplePage';
import { getServiceContent, serviceContent } from '@/lib/serviceContent';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceContent.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) return {};

  return { title: service.title, description: service.intro };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getServiceContent(slug);
  if (!service) notFound();

  return (
    <SimplePage
      title={service.title}
      intro={service.intro}
      body={service.body}
      imageAlt={`${service.title} at Savannah Age Management Medicine`}
    />
  );
}
