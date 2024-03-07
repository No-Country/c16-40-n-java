'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { project } from './getProjectById';

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

export async function createProject(
  formData: createProjectForm,
  token: string
) {
  try {
    const response = await fetch(`${process.env.API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ ...formData }),
    });
    const result: project = await response.json();
    if (result) {
      revalidatePath('/(pages)/(main)/project/[id]', 'layout');
      revalidateTag('allProjects');
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}
