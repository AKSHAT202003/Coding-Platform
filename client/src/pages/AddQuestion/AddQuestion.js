import React, { useState } from 'react';
import './AddQuestion.css';
import { saveAs } from 'file-saver';
import toast, { Toaster } from 'react-hot-toast';

const AddQuestion = () => {
  const [difficulty, setDifficulty] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [examples, setExamples] = useState([{ input: '', output: '', explanation: '' }]);
 
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');

  const handleExampleChange = (index, field, value) => {
    const newExamples = [...examples];
    newExamples[index][field] = value;
    setExamples(newExamples);
  };

  const addExample = () => {
    setExamples([...examples, { input: '', output: '', explanation: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      difficulty,
      name,
      description,
      examples,
      noOfSubm: 0,
      noOfSuccess: 0,
      testcase: name.replace(/\s+/g, '').toLowerCase() + '.js',
    };
    console.log(formData);

    try {
      fetch('http://localhost:5000/api/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error:', error);
    }
    
    
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();

    const inputArray = inputData.split('\n').map(line => `"${line.trim()}"`);
    const outputArray = outputData.split('\n').map(line => `"${line.trim()}"`);

    const fileContent = `
const input = [
    ${inputArray.join(',\n    ')}
];

const output = [
    ${outputArray.join(', ')}
];

module.exports = { input, output };
`;

fetch('http://localhost:5000/api/saveFile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ fileName: `${name.replace(/\s+/g, '').toLowerCase()}.js`, fileContent }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    toast.success('File saved successfully');
  })
  .catch(error => {
    console.error('Error:', error);
    toast.error('Error saving file');
  });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Examples:</label>
          {examples.map((example, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Input"
                value={example.input}
                onChange={(e) => handleExampleChange(index, 'input', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Output"
                value={example.output}
                onChange={(e) => handleExampleChange(index, 'output', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Explanation"
                value={example.explanation}
                onChange={(e) => handleExampleChange(index, 'explanation', e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={addExample}>Add Example</button>
        </div>
        {/* <div>
          <label>Test Case:</label>
          <input type="text" value={testcase} onChange={(e) => setTestcase(e.target.value)} required />
        </div> */}
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleFileSubmit}>
        <div>
          {/* <label htmlFor="fileName">File Name</label>
          <input
            type="text"
            id="fileName"
            value={testcase}
            onChange={(e) => setFileName(e.target.value)}
            required
          /> */}
        </div>
        <div>
          <label htmlFor="inputData">Input Data</label>
          <textarea
            id="inputData"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            rows="10"
            required
          />
        </div>
        <div>
          <label htmlFor="outputData">Output Data</label>
          <textarea
            id="outputData"
            value={outputData}
            onChange={(e) => setOutputData(e.target.value)}
            rows="5"
            required
          />
        </div>
        <button type="submit">Create JS File</button>
      </form>
    </div>
  );
};

export default AddQuestion;