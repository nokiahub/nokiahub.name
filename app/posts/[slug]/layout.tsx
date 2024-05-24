import { ReactNode } from 'react';

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}