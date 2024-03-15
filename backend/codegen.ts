import type { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: 'http://localhost:4000',
  generates: {
    './src/types/resolvers-types.ts': {
      config: {
        useIndexSignature: true,
        // maybeValue: "T | undefined",
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  }
};
export default config;