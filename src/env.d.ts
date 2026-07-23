/// <reference types="astro/client" />
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolparamdescription?: string;
  }
}