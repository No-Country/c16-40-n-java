'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

interface createProjectForm {
  title: string;
  description: string;
  image: string;
  goalAmount: number;
  categoryType: string;
  endDate: string;
}

export async function updateProject(
  formData: createProjectForm,
  token: string,
  projectId: number
) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/projects/${projectId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ ...formData }),
      }
    );
    const result = await response.json();
    if (result) {
      revalidatePath(`/project/${projectId}`);
      revalidateTag('allProjects');
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}
