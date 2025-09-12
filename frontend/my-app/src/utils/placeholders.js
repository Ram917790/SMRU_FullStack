// A tiny inline SVG so we never hit the network for placeholders.
export const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='480'>
       <rect width='100%' height='100%' fill='#eef2f7'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
         fill='#6b7280' font-family='Arial, Helvetica, sans-serif' font-size='22'>
         Image coming soon
       </text>
     </svg>`
  );
