import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { exec } from 'child_process';

import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import replace from '@rollup/plugin-replace';

const outputOptions = {
  sourcemap: false,
  preserveModules: true,
  preserveModulesRoot: 'src',
};

const tscAlias = () => {
  return {
    name: 'tsAlias',
    writeBundle: () => {
      return new Promise((resolve, reject) => {
        exec('tsc-alias', function callback(error, stdout, stderr) {
          if (stderr || error) {
            reject(stderr || error);
          } else {
            resolve(stdout);
          }
        });
      });
    },
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        exports: 'named',
        ...outputOptions,
      },
      {
        dir: 'dist',
        format: 'esm',
        exports: 'named', // Added this line
        ...outputOptions,
      },
    ],
    external: [
      'react',
      'react-dom',
      '@babel/runtime',
      '@floating-ui/react',
      '@floating-ui/react-dom',
      'tailwind-merge',
      'tslib',
      'react-focus-lock',
      'class-variance-authority',
      '@azuga-bms/azuga-design-system'
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      replace({
                preventAssignment: true,
                values: {
                  'this && this.__extends': 'window && window.__extends',
                  'this && this.__assign': 'window && window.__assign',
                  'this && this.__rest': 'window && window.__rest',
                  'this && this.__decorate': 'window && window.__decorate',
                  'this && this.__param': 'window && window.__param',
                  'this && this.__metadata': 'window && window.__metadata',
                },
              }),

      commonjs({
        include: 'node_modules/**',
        ignoreGlobal: true,
        sourceMap: false,
        transformMixedEsModules: true,
        esmExternals: true, // Ensure CommonJS modules are treated correctly
      }),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/stories/**', '**/tests/**', './styles.css'],
      }),
      typescriptPaths(),
      preserveDirectives(),
      terser({ compress: { directives: false } }),
      copy({
        targets: [{ src: './../../README.md', dest: 'dist' }],
      }),
      tscAlias(),
    ],
    onwarn(warning, warn) {
      if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
        warn(warning);
      }
    },
  },
];

// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// import typescript from '@rollup/plugin-typescript';
// import terser from '@rollup/plugin-terser';
// import { exec } from 'child_process';
// import copy from 'rollup-plugin-copy';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import { typescriptPaths } from 'rollup-plugin-typescript-paths';
// import preserveDirectives from 'rollup-plugin-preserve-directives';
// import replace from '@rollup/plugin-replace';

// const outputOptions = {
//   sourcemap: false,
//   preserveModules: true,
//   preserveModulesRoot: 'src',
// };

// const tscAlias = () => {
//   return {
//     name: 'tsAlias',
//     writeBundle: () => {
//       return new Promise((resolve, reject) => {
//         exec('tsc-alias', function callback(error, stdout, stderr) {
//           if (stderr || error) {
//             reject(stderr || error);
//           } else {
//             resolve(stdout);
//           }
//         });
//       });
//     },
//   };
// };

// // eslint-disable-next-line import/no-anonymous-default-export
// export default [
//   {
//     input: 'src/index.ts',
//     output: [
//       {
//         dir: 'dist',
//         format: 'cjs',
//         entryFileNames: '[name].cjs',
//         exports: 'named', // Ensure all exports are named
//         ...outputOptions,
//       },
//       {
//         dir: 'dist',
//         format: 'esm',
//         exports: 'named', // Ensure all exports are named
//         ...outputOptions,
//       },
//     ],
//     external: [
//       'react',
//       'react-dom',
//       '@babel/runtime',
//       '@floating-ui/react',
//       '@floating-ui/react-dom',
//       'tailwind-merge',
//       'tslib',
//       'react-focus-lock',
//       'class-variance-authority',
//       '@azuga-bms/azuga-design-system',
//     ],
//     plugins: [
//       peerDepsExternal(),
//       resolve(),
//       commonjs({
//         include: /node_modules/,
//         ignoreGlobal: false,
//         sourceMap: false,
//         transformMixedEsModules: true,
//       }),
//       replace({
//         preventAssignment: true,
//         values: {
//           'this': 'undefined',
//         },
//       }),
//       typescript({
//         tsconfig: './tsconfig.json',
//         exclude: ['**/stories/**', '**/tests/**', './styles.css'],
//       }),
//       typescriptPaths(),
//       preserveDirectives(),
//       terser({ compress: { directives: false } }),
//       copy({
//         targets: [{ src: './../../README.md', dest: 'dist' }],
//       }),
//       tscAlias(),
//     ],
//     onwarn(warning, warn) {
//       if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
//         warn(warning);
//       }
//     },
//     context: 'window', // Setting the context for the bundle
//   },
// ];
