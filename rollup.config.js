import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: 'src/index.js',
  external: ['react', 'js-cookie', 'next-cookies'],
  output: [
    {
      file: 'dist/next-authentication.js',
      format: 'cjs',
      exports: 'named',
      globals: {
        react: 'React',
        'next-cookies': 'nextCookie',
        'js-cookie': 'cookie'
      }
    },
    {
      file: 'dist/next-authentication.umd.js',
      format: 'umd',
      name: 'nextAuthorization',
      exports: 'named',
      globals: {
        react: 'React',
        'next-cookies': 'nextCookie',
        'js-cookie': 'cookie'
      }
    },
    {
      file: 'dist/next-authentication.mjs',
      format: 'esm',
      name: 'nextAuthorization'
    }
  ],
  plugins: [
    builtins(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs()
  ]
}
