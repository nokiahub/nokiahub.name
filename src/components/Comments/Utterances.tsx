import * as React from 'react';

import { useEffect, useRef, useState } from 'react';

type Status = 'loading' | 'success' | 'failed';

const Utterances = () => {
  const [scriptStatus, setScriptStatus] = useState<Status>('loading');
  const commentsRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://utteranc.es/client.js';
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => setScriptStatus('success');
    script.onerror = () => setScriptStatus('failed');

    script.setAttribute('repo', 'nokiahub/gatsby-blog');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-light');

    commentsRef.current?.appendChild(script);
  }, []);

  return <div ref={commentsRef}></div>;
};

export default Utterances;
