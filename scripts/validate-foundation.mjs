import { access } from 'node:fs/promises';
import { join } from 'node:path';

const requiredPaths = [
  'apps/web/package.json',
  'apps/api/package.json',
  'apps/ai/pyproject.toml',
  'packages/config/package.json',
  'packages/eslint-config/package.json',
  'packages/prettier-config/package.json',
  'packages/sdk/package.json',
  'packages/tsconfig/package.json',
  'packages/types/package.json',
  'packages/ui/package.json',
  'packages/utils/package.json',
  'infrastructure/docker/README.md',
  'infrastructure/kubernetes/README.md',
  'infrastructure/terraform/README.md',
  'infrastructure/monitoring/README.md',
  '.github/workflows/ci.yml',
];

await Promise.all(requiredPaths.map((path) => access(join(process.cwd(), path))));
