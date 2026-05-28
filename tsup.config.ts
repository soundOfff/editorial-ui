import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    // React components
    'react/index': 'src/react/index.ts',
    'react/icons/index': 'src/react/icons/index.ts',
    // CSS
    'styles/fonts': 'src/styles/fonts.css',
    'styles/tokens': 'src/styles/tokens.css',
    'styles/index': 'src/styles/index.css',
  },
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  // CSS is passed through without processing
  loader: {
    '.css': 'copy',
  },
  external: ['react', 'react-dom'],
});
