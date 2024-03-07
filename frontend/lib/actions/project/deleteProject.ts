'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function deleteProject(projectId: number, token: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/projects/${projectId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = response;
    if (result.status === 204) {
      revalidatePath('/(pages)/(main)/project/[id]', 'layout');
      revalidateTag('allProjects');
      return result;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}
