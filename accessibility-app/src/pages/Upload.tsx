import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAccessibilityFile } from '../services/accessibilityAPI';

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setLoading(true);
    try {
      const data = await uploadAccessibilityFile(selectedFile);
      // Navigate to the result page with the data (using state)
      navigate('/result', { state: data });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload HTML File</h2>
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Analyzing...' : 'Upload and Analyze'}
        </button>
      </form>
    </div>
  );
};

export default Upload;
