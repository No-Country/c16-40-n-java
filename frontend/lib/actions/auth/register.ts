'use server';

interface registerForm {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export async function register(formData: registerForm) {
  try {
    const response = await fetch(`${process.env.API_URL}/users/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData }),
    });
    const result = response.status === 201 ? 'created' : null;
    return result;
  } catch (error) {
    console.log(error);
  }
}
