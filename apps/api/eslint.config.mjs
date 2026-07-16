import { baseConfig } from '@stadiumsphere/eslint-config';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
      },
    },
  },
  { ignores: ['dist/**', 'coverage/**'] },
];
