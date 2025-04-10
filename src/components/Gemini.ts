export const Gemini = async (prompt: string) => {
  // try {
  //   const model = genAI.getGenerativeModel({model: 'gemini-pro'});
  //   const result = await model.generateContent(prompt);
  //   const response = result.response;
  //   const text = response.text();
  //   return text;
  // } catch (e: any) {
  //   console.error('Gemini API error:', e);
  //   return 'Failed to generate response. Please check the console for errors.';
  // }

  // Mock Gemini
  await new Promise((resolve) => setTimeout(resolve, 500));
  return `Mock response for: ${prompt}`;
};
