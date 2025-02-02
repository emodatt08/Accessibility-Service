import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface OpenAIResult {
  fixedHtml: string;
  recommendations: string;
}

interface AnalysisData {
  complianceScore: number;
  issues: Array<{
    ruleName: string;
    description: string;
    suggestedFix: string;
  }>;
  id: number;
  createdAt: string;
  openAI: OpenAIResult;
}

const AnalysisResult: React.FC = () => {
  const location = useLocation();
  const data = location.state as AnalysisData;

  if (!data) {
    return (
      <div className="text-center">
        <h2>No Analysis Data Found</h2>
        <Link to="/upload" className="text-blue-500 underline">
          Upload a file again.
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
      <p>
        <strong>Compliance Score:</strong> {data.complianceScore}
      </p>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Issues Found:</h3>
        <ul className="list-disc pl-6">
          {data.issues.map((issue, index) => (
            <li key={index}>
              <strong>{issue.ruleName}:</strong> {issue.description} <br />
              <em>Suggested Fix:</em> {issue.suggestedFix}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">OpenAI Enhancements:</h3>
        <div className="mt-2 p-4 border rounded">
          <h4 className="font-bold">Fixed HTML:</h4>
          <pre className="bg-gray-100 p-2 overflow-auto whitespace-pre-wrap">
            {data.openAI.fixedHtml}
          </pre>
          <h4 className="font-bold mt-2">Recommendations:</h4>
          <p>{data.openAI.recommendations}</p>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AnalysisResult;
