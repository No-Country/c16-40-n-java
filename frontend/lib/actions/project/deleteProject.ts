'use server';

import { revalidateTag } from 'next/cache';

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
    console.log(result);
    if (result.status === 204) {
      revalidateTag('allProjects');
    }
    return result.status === 204;
  } catch (error) {
    console.log(error);
  }
}
