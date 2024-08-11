import React, { useEffect, useState, useRef } from "react";
import CodeEditorv3 from "../Question/Editor/CodeEditorv3";
import useLocalStorage from "../../hooks/useLocalStorage";
import defaultCodes from "../Question/defaultCodes/defaultCodes";
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../compenents/LoadingSpinner/LoadingSpinner';

const useFetchProblems = id => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [question, setQuestion] = useState(undefined);

  const problems = useSelector(state => state.questions);

  useEffect(() => {
    setLoading(true);
    setError(undefined);
    setQuestion(undefined);

    if (!problems.isLoading) {
      const matchProblem = problems.questions.find(value => value._id === id);
      if (matchProblem) setQuestion(matchProblem);
      else setError(`No such problem found with id: ${id}`);

      setLoading(false);
    }
  }, [id, problems]);

  return { loading, error, question };
};

const Playground = () => {
  const [codeFontSize, setcodeFontSize] = useState(15);
  const [selectedLang, setSelectedLang] = useLocalStorage("cpp");
  const [code, setCode] = useState(defaultCodes[selectedLang]);
  const [codeSubmittingState, setCodeSubmittingState] = useState('not-initialized');
  const [response, setResponse] = useState([]);

  const { id } = useParams();
  const { loading, error, question } = useFetchProblems(id);
  const endRef = useRef(null);

  useEffect(() => {
    setCode(defaultCodes[selectedLang]);
  }, [setSelectedLang]);

  const submitHandler = async event => {
    event.preventDefault();

    if (codeSubmittingState === 'submitting') return;

    console.log('submitting code');
    setCodeSubmittingState('submitting');
   
    try {
      const query = await fetch(
        `http://localhost:5000/api/explore/codeExecutor`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({ code, language: selectedLang }),       
        }
      );
      const queryData = await query.json();
      setResponse(queryData);
      

      if (query.ok) {       
        const intervalID = setInterval(async () => {
          const response = await fetch(
            `http://localhost:5000/api/explore/status/${queryData.queryId}`,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'GET'
            }
          );
          const data = await response.json();
          console.log(data);
          
          if (!response.ok) {
            clearInterval(intervalID);
            setCodeSubmittingState('submitted');
            setResponse(data);
          } else if (data.status !== 'pending') {
            clearInterval(intervalID);
            setCodeSubmittingState('submitted');
            setResponse({ ...data.output, status: data.status });
          }
        }, 1000);
      } else {
        setCodeSubmittingState('submitted');
      }

      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      setResponse({ msg: 'caught errors while sending code to server for getting verdict', serverError: JSON.stringify(error) });
      setCodeSubmittingState('submitted');
    }
  };

  return (
    <div>
      <div>
        <FormControl>
          <InputLabel id="changeLang-select-label">Language</InputLabel>
          <Select
            labelId="changeLang-select-label"
            id="changeLang-select"
            value={selectedLang}
            label="Language"
            style={{ width: '8em', height: '2.8em' }}
            onChange={e => setSelectedLang(e.target.value)}
          >
            <MenuItem value={'c'}>C</MenuItem>
            <MenuItem value={'cpp'}>Cpp</MenuItem>
            <MenuItem value={'py'}>Python</MenuItem>
            <MenuItem value={'java'}>Java</MenuItem>
            <MenuItem value={'js'}>Js</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <CodeEditorv3
          selectedLang={selectedLang}
          code={code}
          setCode={setCode}
          language={selectedLang}
          fontSize={codeFontSize}
        />
      </div>

      <div>
        <div>
          {codeSubmittingState === 'submitting' ? 'wait for response' : (codeSubmittingState === 'not-initialized' ? 'click here to submit' : 'wanna submit again')}
        </div>
        <Button onClick={submitHandler} color='primary' variant="contained">
          {codeSubmittingState === 'submitting' ? 'Submitting' : 'Submit'}
          {codeSubmittingState === 'submitting' ? <div /> : <SendIcon style={{ marginLeft: '0.6em', fontSize: '1.2em' }} />}
        </Button>
        {codeSubmittingState !== 'not-initialized' && (
                            <div >
                                <div style={{ "--col": (response.status === 'success' ? 127 : 0) }} >
                                    {response.msg &&
                                        <div >
                                            <div >Msg: </div>
                                            <div>{response.msg}</div>
                                        </div>
                                    }
                                    {response.stdout &&
                                        <div >
                                            <div >STDOUT: </div>
                                            <div>{response.stdout}</div>
                                        </div>
                                    }
                                    {response.stderr &&
                                        <div >
                                            <div >STDERR: </div>
                                            <div>{response.stderr}</div>
                                        </div>
                                    }
                                    {response.error &&
                                        <div >
                                            <div >Error: </div>
                                            <div>{JSON.stringify(response.error)}</div>
                                        </div>
                                    }
                                    {response.serverError &&
                                        <div >
                                            <div >ServerError: </div>
                                            <div>{response.serverError.toString()}</div>
                                        </div>
                                    }
                                    {response.status === 'pending' &&
                                        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <LoadingSpinner />
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
      </div>
      <div aria-hidden ref={endRef}></div>
    </div>
  );
};

export default Playground;