import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import inject from '@rollup/plugin-inject'

export default defineConfig({
    // ...other config settings
      plugins: [
    react(),
    tailwindcss(), 
   ],
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                    process:true
                })
            ]
        }
    }
})


// export default defineConfig({
//   base: "./",
//   plugins: [
//     react(),
//     tailwindcss(), 
//    ],
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'globalThis'  // Correct polyfill for 'global'
//       },
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           buffer: true,
//           process: true
//         }),
//         NodeModulesPolyfillPlugin()  // Required for `stream`, `crypto`, etc.
//       ]
//     }
//   },
//   resolve: {
//     alias: {
//       stream: 'stream-browserify',
//       crypto: 'crypto-browserify',
//       events: 'events/'
//     }
//   },
//   define: {
//     global: "window" // Critical fix for `global is not defined`
//   }
// });


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from 'tailwindcss';
// import inject from '@rollup/plugin-inject';
// // import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// // import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// export default defineConfig(({ mode }) => {
//   const isProduction = mode === 'production';
//   const isDevelopment = mode === 'development';

//   return {
//     plugins: [
//       react(),
//       tailwindcss()
//     ],
//     build: isProduction
//       ? {
//           rollupOptions: {
//             plugins: [
//               inject({ Buffer: ['buffer', 'Buffer'] })
//             ]
//           }
//         }
//       : undefined,
//     optimizeDeps: {
//       esbuildOptions: {
//         define: {
//           global: 'globalThis' // For polyfills to work properly
//         },
        
//         // plugins: [
//         //   NodeGlobalsPolyfillPlugin({
//         //     buffer: true,
//         //     process: true
//         //   }),
//         //   NodeModulesPolyfillPlugin()
//         // ]
//       }
//     },
//     resolve: {
//       alias: {
//         stream: 'stream-browserify',
//         crypto: 'crypto-browserify',
//         events: 'events/'
//       }
//     },
//     define: {
//       global: isDevelopment ? '{}' : 'window' // Development: avoid "global is not defined"; Production: real global polyfill
//     }
//   };
// });
// export default defineConfig(({ mode }) => {
//   return {
//     plugins: [react()],
//     build:
//       mode === 'production'
//         ? {
//             rollupOptions: {
//               plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
//             },
//           }
//         : undefined,

//     define:
//       mode === 'development'
//         ? {
//             global: {},
//           }
//         : undefined,
//   };
// });