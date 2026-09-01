/**
 * Vercel Configuration
 * @see https://vercel.com/docs/projects/project-configuration
 */

export interface VercelConfig {
  framework?: string;
  buildCommand?: string;
  installCommand?: string;
  outputDirectory?: string;
  cleanUrls?: boolean;
  trailingSlash?: boolean;
  rewrites?: Array<{ source: string; destination: string }>;
  redirects?: Array<{ source: string; destination: string; permanent?: boolean }>;
  headers?: Array<{ source: string; headers: Array<{ key: string; value: string }> }>;
  [key: string]: unknown;
}

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'next build',
  cleanUrls: true,
};

export default config;
