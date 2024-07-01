"use client";
import { useState, useEffect, useRef } from 'react';

const InterviewPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRipple, setIsRipple] = useState(false);
  const [questions, setQuestions] = useState([
    "Can you tell me what is the difference between REST and SOAP? And which one would you prefer?",
    "What are the seven assumptions of the Linear Regression?",
    "Why are we concerned with normality of Residuals? In other words, why do the residuals have to be normally distributed?",
    "If the residuals are increasing for increasing values of independent variables, but are constant, do they conform to the rule of Homoscedasticity?",
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSpeechLoaded, setIsSpeechLoaded] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);

  //speech recognition setting
  const currentTranscriptTextarea = document.getElementById('current-transcript');
  const totalTranscriptTextarea = document.getElementById('total-transcript');
  let recognition;
  let recording = false;
  let silenceTimeoutId;
  let recognitionTimeoutId;
  let nextQuestion = 0;

  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
  } else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
  } else {
    alert('Your browser does not support Speech Recognition API');
  }

  const handleSpeechEnd = () => {
    console.log("Speech has ended.");
    //startRecognition();
    // Add any additional functionality you want to execute when the speech ends
    if (!recording) {
      console.log("am i recording");
      recording = true;
      totalTranscriptTextarea.value = '';
      currentTranscriptTextarea.value = '';
      startRecognition();
    }
  };

  recognition.continuous = true;
  recognition.interimResults = true; // Enable interim results
  recognition.maxAlternatives = 1;
  recognition.lang = 'en-IN';


  const speakQuestion = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.onstart = () => setIsRipple(true);
    speech.onend = () => {
      setIsRipple(false);
      handleSpeechEnd(); // Call the function when the speech ends
    };
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    const handleVoicesChanged = () => {
      if (window.speechSynthesis.getVoices().length > 0) {
        setIsSpeechLoaded(true);
      }
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }

    // Trigger voiceschanged manually in case the voices are already loaded
    handleVoicesChanged();

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing webcam: ", err);
        });
    }
  }, [videoRef]);

  const features = [
    { name: 'Touching Nose', counter: 8 },
    { name: 'Touching Ear', counter: 2 },
    { name: 'Hands touching head', counter: 2 },
    { name: 'Eyes looking left', counter: 30 },
    { name: 'Eyes looking right', counter: 53 },
    { name: 'Eyes looking up', counter: 85 },
    { name: 'Head tilt', counter: 18 },
    { name: 'Head Looking Up', counter: 3 },
    { name: 'Head Looking Down', counter: 2 },
    { name: 'Fidgeting', counter: 1 },
    { name: 'Hands movement', counter: 105 },
  ];

  const toggleQuestion = () => {
    
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    //const nextQuestionIndex = (prev + 1) % questions.length;
    //speakQuestion(questions[(currentQuestion + 1) % questions.length]);
    nextQuestion = nextQuestion + 1;
    if(nextQuestion < questions.length)
      speakQuestion(questions[nextQuestion]);
    else
      console.log("Interview over");
  };

  const startInterview = () => {
    setInterviewStarted(true);
    speakQuestion(questions[currentQuestion]);
  };

  //speech recognition code 
  const startRecognition = () => {
    recognition.start();
    recognitionTimeoutId = setTimeout(() => {
      recognition.stop();
    }, 60 * 1000); // Stop after 1 minute
    resetSilenceTimeout();
  }

  const resetSilenceTimeout = () => {
    clearTimeout(silenceTimeoutId);
    silenceTimeoutId = setTimeout(() => {
      console.log('Prolonged silence detected for 5 seconds.');

      recording = false;
      clearTimeout(recognitionTimeoutId);
      clearTimeout(silenceTimeoutId);
      recognition.stop();
      totalTranscriptTextarea.value += currentTranscriptTextarea.value;
      currentTranscriptTextarea.value = '';

      
      toggleQuestion();

    }, 5000);
  }

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      let transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    currentTranscriptTextarea.value = interimTranscript;
    totalTranscriptTextarea.value += finalTranscript;

    // Reset the timeout to ensure we stop 1 minute after the last speech
    clearTimeout(recognitionTimeoutId);
    recognitionTimeoutId = setTimeout(() => {
      recognition.stop();
    }, 60 * 1000);

    // Reset the silence detection timer
    resetSilenceTimeout();
  };

  recognition.onerror = (event) => {
    alert('Error occurred in speech recognition: ' + event.error);
  };

  recognition.onend = () => {
    if (recording) {
      totalTranscriptTextarea.value += currentTranscriptTextarea.value;
      currentTranscriptTextarea.value = '';
      startRecognition();
    }
  };

  

  return (
    <>
      <style jsx>{`
        .ripple-bg {
          animation: ripple 2s infinite;
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
      <div className="min-h-screen flex p-4 gap-4">
        {isSpeechLoaded ? (
          interviewStarted ? (
            <>
              <div className="flex-1 flex flex-col items-center justify-center p-4 border-dashed border-2 border-gray-400 rounded-lg" style={{ height: '60vh' }}>
                <div className="relative flex items-center justify-center">
                  {isRipple && <div className="ripple-bg absolute w-32 h-32 bg-blue-500 rounded-full"></div>}
                  <div className="relative w-24 h-24 rounded-full border-4 border-gray-300 overflow-hidden">
                    <img
                      src="/media/1653823505444.jpeg"
                      alt="Interviewee"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-center mt-4">{questions[currentQuestion]}</div>
                <button onClick={toggleQuestion} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                  Next Question
                </button>
              </div>
              <div className="w-1/4 p-4 flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-lg" style={{ height: '60vh' }}>
                <div className="p-4 h-full w-full overflow-y-auto">
                  <table className="w-full">
                    <tbody>
                      {features.map((feature, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{feature.name}</td>
                          <td className="py-2 text-right">{feature.counter}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <button onClick={startInterview} className="px-4 py-2 bg-blue-500 text-white rounded">
                Begin Interview
              </button>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p>Loading...</p>
          </div>


        )}
        <div className="fixed bottom-4 right-4">
          {/* Video */}
          <video ref={videoRef} id="webcam" className="w-40 h-30 object-cover" autoPlay playsInline></video>
          <canvas ref={canvasRef} className="absolute left-0 top-0 w-full h-full"></canvas>
        </div>

        
      </div>
      <div>

            <textarea id="current-transcript" rows="10" cols="100" placeholder="Current session speech will appear here..."></textarea>
            <textarea id="total-transcript" rows="10" cols="100" placeholder="All transcribed speech will appear here..."></textarea>
      </div>
      
    </>
  );
};

export default InterviewPage;