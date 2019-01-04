import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/next-authentication.js',
      format: 'cjs'
    },
    {
      file: 'dist/next-authentication.umd.js',
      format: 'umd',
      name: 'nextAuthorization',
      globals: { react: 'React', 'next/router': 'Router' }
    },
    {
      file: 'dist/next-authentication.mjs',
      format: 'esm',
      name: 'nextAuthorization',
      globals: { react: 'React', 'next/router': 'Router' }
    }
  ],
  external: ['react', 'next/router'],
  plugins: [
    builtins(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
}
