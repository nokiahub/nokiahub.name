import { ReactNode } from 'react';

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto px-4">
      {children}
    </div>
  )
}