export const calculateCarbonEmission = async (inputData) => {
    const response = await fetch('/api/calculate/carbon-emission/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    return response.json();
  };
  