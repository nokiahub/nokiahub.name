import * as React from 'react';

import { useEffect, useRef, useState } from 'react';

type Status = 'loading' | 'success' | 'failed';

const Utterances = () => {
  const [scriptStatus, setScriptStatus] = useState<Status>('loading');
  const scriptRef = useRef<null | HTMLScriptElement>(null);

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

    scriptRef.current = script;
  }, []);

  return <div>{scriptStatus === 'success' && <script ref={scriptRef}></script>}</div>;
};

export default Utterances;
