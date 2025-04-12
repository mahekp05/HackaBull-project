import React, { useState, ChangeEvent, FormEvent } from "react";
import Loading from "../components/Loading";

function HealthcareAIAssistant() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Show loading state
    setIsLoading(true);
    
    // Log the input for now (would be sent to backend API in a real app)
    console.log(userInput);
    
    // Simulate AI processing with a timeout
    setTimeout(() => {
      // Example AI response
      setAiResponse(
        "Based on your information, I recommend considering a PPO plan with a moderate deductible. " +
        "This type of plan would provide flexibility in choosing healthcare providers while maintaining reasonable costs. " +
        "For more specific recommendations, please provide additional details about your healthcare needs and budget."
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Loading isLoading={isLoading} />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-3 text-blue-600">Healthcare AI Assistant</h1>
        <p className="text-gray-600 mb-6 text-center">
          Describe your healthcare needs, demographic information, and preferences. Our AI will provide personalized plan recommendations.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userInput" className="block text-sm font-medium text-gray-700 mb-2">
              Your Healthcare Information
            </label>
            <textarea
              id="userInput"
              name="userInput"
              rows={6}
              value={userInput}
              onChange={handleInputChange}
              placeholder="Example: I'm a 35-year-old software developer living in California with my spouse and two children. I exercise regularly and have no major health issues, but my spouse has asthma. We're looking for a family plan with good coverage for specialists and prescription medications. Our budget is around $800/month."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Get AI Recommendations'}
            </button>
          </div>
        </form>

        {aiResponse && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">AI Recommendation</h2>
            <p className="text-gray-800">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthcareAIAssistant;
