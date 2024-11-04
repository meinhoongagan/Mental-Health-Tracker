import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DailyMoodForm = () => {
    const userId = sessionStorage.getItem('userId');
    const [formData, setFormData] = useState({
    mood: '',
    description: '',
    notes: '',
    sleepHours: '',
    exercise: false,
    stressLevel: '',
    energyLevel: '',
    journalEntry: '',
    medicationTaken: false,
    copingMechanisms: [],  // Initialize as an empty array
    dietQuality: '',
    externalEvents: '',  // Initialize field
    tags: [],
    severity: '',
    triggers: '',  // Initialize field
    professionalSupport: false,
  });
  const [loading, setLoading] = useState(false);
  const [copingMechanismInput, setCopingMechanismInput] = useState('');  // Local state for new coping mechanism input
  const [copingMessage, setCopingMessage] = useState('');  // State for coping mechanism message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCopingMechanismChange = (e) => {
    setCopingMechanismInput(e.target.value);
  };

  const addCopingMechanism = () => {
    if (copingMechanismInput.trim() !== '') {
      setFormData((prevData) => ({
        ...prevData,
        copingMechanisms: [...prevData.copingMechanisms, copingMechanismInput],
      }));
      setCopingMessage(`Coping mechanism "${copingMechanismInput}" added!`); // Update message
      setCopingMechanismInput('');  // Clear input field after adding

      // Clear the message after a few seconds (optional)
      setTimeout(() => {
        setCopingMessage('');
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/dailyMood', { userId, ...formData });
      alert('Daily mood data submitted successfully!'); // Retain alert for form submission
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-8 bg-gray-900/70 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">Daily Mood Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mood */}
          <div className="relative group">
            <label className="block text-white">
              Mood
            </label>
            <select name="mood" onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white" required>
              <option value="">Select mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="excited">Excited</option>
              <option value="anxious">Anxious</option>
              <option value="neutral">Neutral</option>
              <option value="stressed">Stressed</option>
            </select>
          </div>

          {/* Description */}
          <div className="relative group">
            <label className="block text-white">
              Description
            </label>
            <textarea name="description" onChange={handleChange} maxLength={500} className="w-full p-2 rounded bg-gray-800 text-white" />
          </div>

          {/* Notes */}
          <div className="relative group">
            <label className="block text-white">
              Notes
            </label>
            <input type="text" name="notes" onChange={handleChange} maxLength={100} className="w-full p-2 rounded bg-gray-800 text-white" />
          </div>

          {/* Sleep Hours */}
          <div className="relative group">
            <label className="block text-white">
              Sleep Hours
            </label>
            <input type="number" name="sleepHours" min={0} max={24} onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white" />
          </div>

          {/* Exercise */}
          <div className="relative group">
            <label className="block text-white">
              Exercise
            </label>
            <input type="checkbox" name="exercise" onChange={handleChange} className="ml-2" />
          </div>

          {/* Stress Level */}
          <div className="relative group">
            <label className="block text-white">
              Stress Level
            </label>
            <select name="stressLevel" onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white">
              <option value="">Select stress level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="extreme">Extreme</option>
            </select>
          </div>

          {/* Energy Level */}
          <div className="relative group">
            <label className="block text-white">
              Energy Level
            </label>
            <select name="energyLevel" onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white">
              <option value="">Select energy level</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Journal Entry */}
          <div className="relative group">
            <label className="block text-white">
              Journal Entry
            </label>
            <textarea name="journalEntry" onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white" />
          </div>

          {/* Medication Taken */}
          <div className="relative group">
            <label className="block text-white">
              Medication Taken
            </label>
            <input type="checkbox" name="medicationTaken" onChange={handleChange} className="ml-2" />
          </div>

          {/* Coping Mechanisms */}
          <div className="relative group">
            <label className="block text-white">
              Coping Mechanisms
            </label>
            <input
              type="text"
              value={copingMechanismInput}
              onChange={handleCopingMechanismChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Add a coping mechanism"
            />
            <button type="button" onClick={addCopingMechanism} className="mt-2 py-1 px-3 bg-green-500 text-white rounded">
              Add
            </button>
            {/* Display coping mechanism added message */}
            {copingMessage && <p className="mt-2 text-green-400">{copingMessage}</p>}
          </div>

          {/* Diet Quality */}
          <div className="relative group">
            <label className="block text-white">
              Diet Quality
            </label>
            <select name="dietQuality" onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white">
              <option value="">Select diet quality</option>
              <option value="poor">Poor</option>
              <option value="moderate">Moderate</option>
              <option value="good">Good</option>
            </select>
          </div>

          {/* External Events */}
          <div className="relative group">
            <label className="block text-white">
              External Events
            </label>
            <input type="text" name="externalEvents" onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white" />
          </div>

          {/* Severity */}
          <div className="relative group">
            <label className="block text-white">
              Severity
            </label>
            <input type="number" name="severity" min={1} max={10} onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white" />
          </div>

          {/* Triggers */}
          <div className="relative group">
            <label className="block text-white">
              Triggers
            </label>
            <input type="text" name="triggers" onChange={handleChange} className="w-full p-2 rounded bg-gray-800 text-white" />
          </div>

          {/* Professional Support */}
          <div className="relative group">
            <label className="block text-white">
              Professional Support
            </label>
            <input type="checkbox" name="professionalSupport" onChange={handleChange} className="ml-2" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded bg-blue-500 text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyMoodForm;
