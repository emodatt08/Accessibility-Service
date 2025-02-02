export const uploadAccessibilityFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
  
    let apiUrl = import.meta.env.VITE_ACCESSIBILITY_API_URL;
    if (!apiUrl) {
      throw new Error('No APIURL in .env file')
    }
    const response = await fetch(apiUrl as string, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
    return response.json();
  };
  