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
}

export async function getAllProjects() {
  try {
    const response = await fetch(`${process.env.API_URL}/projects/actives`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
