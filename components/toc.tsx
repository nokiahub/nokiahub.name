export const Toc = () => {
  return (
    <aside className="top-0 hidden h-screen w-64 border-r border-black p-6 md:block">
      <h2 className="mb-4 text-xl font-bold uppercase tracking-wider">
        Contents
      </h2>
      <ul className="space-y-3 text-sm leading-snug">
        <li>
          <a
            href="#intro"
            className="block border-l-4 border-black pl-2 hover:bg-black hover:text-white"
          >
            1. Introduction
          </a>
        </li>
        <li>
          <a
            href="#context"
            className="block border-l-4 border-black pl-2 hover:bg-black hover:text-white"
          >
            2. Context & Intent
          </a>
        </li>
        <li>
          <a
            href="#design"
            className="block border-l-4 border-black pl-2 hover:bg-black hover:text-white"
          >
            3. Design System
          </a>
        </li>
        <li>
          <a
            href="#code"
            className="block border-l-4 border-black pl-2 hover:bg-black hover:text-white"
          >
            4. Code Breakdown
          </a>
        </li>
        <li>
          <a
            href="#conclusion"
            className="block border-l-4 border-black pl-2 hover:bg-black hover:text-white"
          >
            5. Conclusion
          </a>
        </li>
      </ul>
    </aside>
  );
};
