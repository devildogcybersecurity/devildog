import { describe, expect, it, vi } from 'vitest';

import type { Project } from '@prisma/client';

import type { ProjectsRepository } from '@/server/repositories/projectsRepository';
import { createStarterProjectForUser } from '@/server/services/projectsService';

function createProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 'project-1',
    name: 'My first MVP project',
    slug: 'my-first-mvp-project',
    summary: 'A starter project',
    status: 'DRAFT',
    visibility: 'PRIVATE',
    isStarterExample: false,
    ownerId: 'user-1',
    createdAt: new Date('2026-04-10T00:00:00.000Z'),
    updatedAt: new Date('2026-04-10T00:00:00.000Z'),
    ...overrides,
  };
}

describe('createStarterProjectForUser', () => {
  it('creates the first starter project with a predictable slug', async () => {
    const repository: ProjectsRepository = {
      countByOwnerId: vi.fn().mockResolvedValue(0),
      create: vi.fn().mockResolvedValue(createProject()),
      listByOwnerId: vi.fn(),
      listStarterExamples: vi.fn(),
      slugExists: vi.fn().mockResolvedValue(false),
    };

    const result = await createStarterProjectForUser('user-1', repository);

    expect(repository.countByOwnerId).toHaveBeenCalledWith('user-1');
    expect(repository.slugExists).toHaveBeenCalledWith('my-first-mvp-project');
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ownerId: 'user-1',
        name: 'My first MVP project',
        slug: 'my-first-mvp-project',
      }),
    );
    expect(result.slug).toBe('my-first-mvp-project');
  });

  it('adds a numeric suffix when the base slug already exists', async () => {
    const repository: ProjectsRepository = {
      countByOwnerId: vi.fn().mockResolvedValue(1),
      create: vi.fn().mockResolvedValue(
        createProject({
          name: 'MVP project 2',
          slug: 'mvp-project-2-1',
        }),
      ),
      listByOwnerId: vi.fn(),
      listStarterExamples: vi.fn(),
      slugExists: vi.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false),
    };

    const result = await createStarterProjectForUser('user-1', repository);

    expect(repository.slugExists).toHaveBeenNthCalledWith(1, 'mvp-project-2');
    expect(repository.slugExists).toHaveBeenNthCalledWith(2, 'mvp-project-2-1');
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        slug: 'mvp-project-2-1',
      }),
    );
    expect(result.slug).toBe('mvp-project-2-1');
  });
});
