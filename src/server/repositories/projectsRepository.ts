import type { Project, ProjectStatus, ProjectVisibility } from '@prisma/client';

import { prisma } from '@/server/db';

export type CreateProjectInput = {
  name: string;
  slug: string;
  summary: string;
  ownerId?: string;
  status?: ProjectStatus;
  visibility?: ProjectVisibility;
  isStarterExample?: boolean;
};

export type ProjectsRepository = {
  create(input: CreateProjectInput): Promise<Project>;
  listByOwnerId(ownerId: string): Promise<Project[]>;
  countByOwnerId(ownerId: string): Promise<number>;
  listStarterExamples(): Promise<Project[]>;
  slugExists(slug: string): Promise<boolean>;
};

export const projectsRepository: ProjectsRepository = {
  create(input) {
    return prisma.project.create({
      data: {
        name: input.name,
        slug: input.slug,
        summary: input.summary,
        ownerId: input.ownerId,
        status: input.status ?? 'DRAFT',
        visibility: input.visibility ?? 'PRIVATE',
        isStarterExample: input.isStarterExample ?? false,
      },
    });
  },
  listByOwnerId(ownerId) {
    return prisma.project.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
    });
  },
  countByOwnerId(ownerId) {
    return prisma.project.count({
      where: { ownerId },
    });
  },
  listStarterExamples() {
    return prisma.project.findMany({
      where: {
        isStarterExample: true,
        visibility: 'PUBLIC',
      },
      orderBy: { createdAt: 'asc' },
    });
  },
  async slugExists(slug) {
    const existingProject = await prisma.project.findUnique({
      where: { slug },
      select: { id: true },
    });

    return Boolean(existingProject);
  },
};
