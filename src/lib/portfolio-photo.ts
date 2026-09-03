type ProjectWithPhoto = {
  cover: string;
  gallery: string[];
};

/** One display photo per project — cover first, then legacy gallery entries. */
export function getProjectPhotos(project: ProjectWithPhoto): string[] {
  if (project.cover) return [project.cover];
  return project.gallery.filter(Boolean);
}
