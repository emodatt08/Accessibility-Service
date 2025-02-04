import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAccessibilityFile } from '../services/accessibilityAPI';

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // state for error messages

  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setErrorMessage(''); // Clear any previous error when a file is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select a file.');
      return;
    }
    setLoading(true);
    try {
      const data = await uploadAccessibilityFile(selectedFile);
      // Navigate to the result page with the data (using state)
      navigate('/result', { state: data });
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage('Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload HTML File</h2>
      {errorMessage && (
        <div className="mb-4 text-red-500" data-testid="error-message">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="file">File</label>
        <input
          id="file"
          name="file"
          type="file"
          accept=".html"
          data-testid="file-input"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Upload and Analyze'}
        </button>
      </form>
    </div>
  );
};

export default Upload;
