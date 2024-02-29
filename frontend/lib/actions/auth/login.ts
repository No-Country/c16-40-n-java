'use server';

interface loginForm {
  email: string;
  password: string;
}

export async function loginUser(formData: loginForm) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}
