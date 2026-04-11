import { z } from 'zod';

import { toProjectSlug } from '@/features/projects/projectSlug';
import {
  projectsRepository,
  type ProjectsRepository,
} from '@/server/repositories/projectsRepository';

const ownerIdSchema = z.string().min(1);

async function createUniqueProjectSlug(name: string, repository: ProjectsRepository) {
  const baseSlug = toProjectSlug(name) || 'project';

  if (!(await repository.slugExists(baseSlug))) {
    return baseSlug;
  }

  let attempt = 1;

  while (attempt < 100) {
    const candidate = `${baseSlug}-${attempt}`;

    if (!(await repository.slugExists(candidate))) {
      return candidate;
    }

    attempt += 1;
  }

  throw new Error('Unable to generate a unique project slug.');
}

export async function listStarterProjects(repository: ProjectsRepository = projectsRepository) {
  return repository.listStarterExamples();
}

export async function listProjectsForUser(
  ownerId: string,
  repository: ProjectsRepository = projectsRepository,
) {
  const parsedOwnerId = ownerIdSchema.parse(ownerId);

  return repository.listByOwnerId(parsedOwnerId);
}

export async function createStarterProjectForUser(
  ownerId: string,
  repository: ProjectsRepository = projectsRepository,
) {
  const parsedOwnerId = ownerIdSchema.parse(ownerId);
  const projectCount = await repository.countByOwnerId(parsedOwnerId);
  const projectName =
    projectCount === 0 ? 'My first MVP project' : `MVP project ${projectCount + 1}`;
  const slug = await createUniqueProjectSlug(projectName, repository);

  return repository.create({
    ownerId: parsedOwnerId,
    name: projectName,
    slug,
    summary:
      'A starter project created from the MVP template so you can wire your own features into a clean service and repository boundary.',
  });
}
