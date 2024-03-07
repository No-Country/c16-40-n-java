'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

interface volunteerForm {
  volunteerPhoneNumber: string;
}

export async function beVolunteerToProject(
  projectId: number,
  formData: volunteerForm,
  token: string
) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/projects/users/volunteer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, projectId: projectId }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText}`
      );
    }

    const result = response;
    if (result.status === 201) {
      revalidatePath('/(pages)/(main)/project/[id]', 'layout');
      revalidateTag('allProjects');
    }
    return result.status === 201;
  } catch (error) {
    console.log(error);
  }
}
