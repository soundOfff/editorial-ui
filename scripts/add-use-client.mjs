#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';

const files = [
  'dist/react/index.js',
  'dist/react/icons/index.js',
];

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  if (!content.startsWith('"use client"')) {
    writeFileSync(file, `"use client";\n${content}`, 'utf-8');
    console.log(`✓ Added "use client" to ${file}`);
  }
}
