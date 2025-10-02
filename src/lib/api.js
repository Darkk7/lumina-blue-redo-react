const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export async function getPracticeByCustomerCode(customerCode) {
  try {
    const response = await fetch(`${API_BASE_URL}/practice/by-code/${customerCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure we don't get cached responses
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Practice not found
      }
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching practice by customer code:', error);
    throw error;
  }
}

export async function getPracticeById(practiceId) {
  try {
    const response = await fetch(`${API_BASE_URL}/practice/${practiceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching practice by ID:', error);
    throw error;
  }
}
