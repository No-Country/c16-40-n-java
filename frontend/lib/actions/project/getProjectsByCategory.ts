'use server';

interface projects {
  id: number;
  creator: {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
  };
  category: string;
  title: string;
  status: string;
  image: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  address: {
    province: string;
    city: string;
    street?: string;
    number?: number;
  };
  donors?: [];
  volunteers?: [];
}

export async function getProjectsByCategory(categoryValue?: string) {
  const url = categoryValue !== 'ALL' ? `?category=${categoryValue}` : '';
  try {
    const response = await fetch(`${process.env.API_URL}/projects${url}`, {
      next: { tags: ['allProjects'] },
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText}`
      );
    }

    const result: projects[] = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
