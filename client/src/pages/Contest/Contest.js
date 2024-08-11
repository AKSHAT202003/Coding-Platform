

import React, { useState } from "react";


const Contest = () => {
    // create a contest page for the user to participate in the contest in which the user can see the questions and submit the answers and based on solving question there would be leaderboard
   
        const [duration, setDuration] = useState(""); // State to store the duration of the contest
        const [numberOfQuestions, setNumberOfQuestions] = useState(""); // State to store the number of questions in the contest

        const handleChange = (event) => {
            setDuration(event.target.value); // Update the duration state when the input value changes
        };

        return (
            <div>
                
                 <p className="bg-slate-600 font-bold">Contest Duration: {duration}</p>
                <input type="text" value={duration} onChange={handleChange} placeholder="Enter the duration of the contest" />
                
               
            </div>
        );
    };




export default Contest;