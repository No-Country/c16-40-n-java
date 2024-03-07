'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

interface createProjectForm {
  categoryType: string;
  title: string;
  description: string;
  image: string;
  goalAmount: number;
  endDate: string;
  address: {
    province: string;
    city: string;
    street?: string;
    number?: number;
  };
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
      revalidatePath('/(pages)/(main)/project/[id]', 'layout');
      revalidateTag('allProjects');
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}
