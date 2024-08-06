// vite.config.js
export default {
  server: {
    hmr: {
      overlay: false,
    },
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
};

