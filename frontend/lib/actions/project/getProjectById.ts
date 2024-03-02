'use server';

export interface project {
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
  province?: string;
  locality?: string;
  address?: string;
}

export async function getProjectById(id: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result: project = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
