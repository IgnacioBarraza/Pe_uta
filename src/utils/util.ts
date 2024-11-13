import { Project } from './interface'

export function getMembersArray(
  members: string,
  selectedProject: Project
): string[] {
  return members.trim().length
    ? members.split(',').map((member) => member.trim())
    : selectedProject.members
}
