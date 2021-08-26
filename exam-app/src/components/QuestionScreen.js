import './QuestionScreen.css'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react';

function QuestionScreen() {

    const [questions, setQuestions] = useState([]);
    const [remainingQue, setRemainingQue] = useState(11);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);


    const [radioButton, setRadioButton] = useState(false)
    const [selectedAns, setSelectedAns] = useState([]);
    const [answers, setAnswers] = useState([])
    const [correctAns, setCorrectAns] = useState([]);
    const [score, setScore] = useState(0)

    // const [error, setError] = useState('');

    const [checkboxAns, setCheckboxAns] = useState([])


    // console.log('error is', error)
    console.log("Checkbox answers are", checkboxAns)
    console.log("All answers are", answers)
    console.log("selected Answer is:", selectedAns);
    console.log("score is:", score)

    // const [index,setIndex]=useState(0)

    // const [options,setOptions] = useState([])
    // console.log("all options",options);
    // const [displayQuestion,setDisplayQuestion]=useState();
    // const [answers,setAnswers]= useState([]);
    // const [error,setError] = useState('');

    const getQuestions = async () => {
        await axios.get("https://glacial-waters-01424.herokuapp.com/api/exam")
            .then((res) => {
                setQuestions(res?.data?.data[0]?.question);
                setCorrectAns(res?.data?.data[0]?.correctAns);
                // console.log('response from the api is', res?.data?.data[0]);
                // setOptions(questions[currQuestion].option)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getQuestions();
    }, [])


    useEffect(() => {
        var checkbox = document.querySelector(
            "input[type=checkbox][name=option]:checked"
        );
        var radio = document.querySelector(
            "input[type=radio][name=option]:checked"
        );
        if (checkbox) {
            checkbox.checked = false;
        }
        else if (radio) {
            radio.checked = false;
        }
    }, [currQuestion])

    const handleClearResponse = () => {
        var checkbox = document.querySelector(
            "input[type=checkbox][name=option]:checked"
        );
        var radio = document.querySelector(
            "input[type=radio][name=option]:checked"
        );
        if (checkbox) {
            checkbox.checked = false;
            setCheckboxAns([])
        }
        else if (radio) {
            radio.checked = false;
            setSelectedAns([])
        }
    }

    const disabled = (e) => {
        e.preventDefault()
    }

    const handleSkip = () => {
        if (currQuestion < questions.length - 1) {
            setCurrQuestion(currQuestion + 1);
            setQuestionNumber(questionNumber + 1);
            setRemainingQue(remainingQue - 1);
            setSelectedAns('');
            setCheckboxAns('');
        }
    }

    const handleNext = () => {

        // if (currQuestion < questions.length) {
        //     if ( selectedAns == '') {
        //         return setError('Please Select an option!')
        //     }

        //     else if ( checkboxAns == '') {
        //         return setError('Please select the options! ')
        //     }
        var checkbox = document.querySelector(
            "input[type=checkbox][name=option]:checked"
        );
        var radio = document.querySelector(
            "input[type=radio][name=option]:checked"
        );

        if (radio && selectedAns) {
            // setError('')
            setAnswers([...answers, selectedAns]);
            setSelectedAns([]);
        }

        else if (checkbox && checkboxAns) {
            // setError('')
            setAnswers([...answers, checkboxAns]);
            setCheckboxAns([]);
        }
        // }
        if (currQuestion < questions.length - 1) {
            setCurrQuestion(currQuestion + 1);
            setQuestionNumber(questionNumber + 1);
            setRemainingQue(remainingQue - 1);

            if (correctAns[currQuestion] == selectedAns) {
                setScore(score + 10);
            }
            else {
                setScore(score - 5);
            }
        }
        else {
            return
        }
    }

    return (
        <div className="questionScreen">
            {/* {error && alert(error)} */}
            <div className="questionScreen__left">
                <div className="questionScreen__header">
                    <div className="header__left">
                        {questions[currQuestion]?.questionType === "singe Ans" ? (
                            <h3>Que type : Single Answer</h3>
                        ) : (
                            <h3>Que type : Multiple Answer</h3>
                        )}
                    </div>

                    <div className="header__center">
                        <h3>Time remaining : 14.57</h3>
                    </div>

                    <div className="header__right">
                        <h3>END TEST</h3>
                    </div>
                </div>

                <div className="questionScreen__body1">
                    <div>
                        <h4>Completed : 0</h4>
                        <h4>{`Remaining : ${questions ? (remainingQue) : ('')}`}</h4>

                    </div>

                    <div>
                        <h4>Marked : 0</h4>
                        <h4>Question time : 15</h4>
                    </div>
                </div>

                <div className="questionScreen__body2">
                    <h4 className="text__white">{`Que. ${questionNumber}`}</h4>
                    <h4 className="text__blue">Mark for Review</h4>
                    <h4 className="text__white">Correct Marks : +10 ; Negative Marks : -5</h4>
                </div>

                <div className="questionScreen__body3">
                    <div className="question">
                        {questions ? (
                            // questions.map((question,i)=> (
                            <h4 >{questions[currQuestion]?.question}</h4>
                            // ))
                        ) : (<h3>Loading...</h3>)
                        }
                    </div>

                    <div className="options">
                        {
                            questions[currQuestion]?.questionType === "singe Ans" ? (
                                questions[currQuestion]?.option?.map((option, i) => {
                                    return (
                                        <div className="option__names" key={i}>
                                            <input
                                                type="radio"
                                                key={i}
                                                id="option"
                                                name="option"
                                                value={selectedAns[i]}
                                                checked={radioButton[i]}
                                                onClick={() => setRadioButton(true)}
                                                onChange={(e) => { setSelectedAns(i + 1) }}
                                            >
                                            </input>
                                            <label >{option}</label>
                                        </div>
                                    )
                                })) : (
                                questions[currQuestion]?.option?.map((option, i) => (
                                    <div className="option__names" key={i}>
                                        <input type="checkbox" key={i} name="option" value={checkboxAns[i]} onChange={() => { setCheckboxAns([...checkboxAns, i + 1]) }}></input>
                                        <label>{option}</label>
                                    </div>
                                )))
                        }


                        {/*                         
                                // <>
                                //     <div className="option__names"><input type="radio" onClick={() => { setSelectedAns(1)}}></input><label>{questions[currQuestion]?.option[0]}</label></div>
                                //     <div className="option__names"><input type="radio" onClick={() => { setSelectedAns(2)}}></input><label>{questions[currQuestion]?.option[1]}</label></div>
                                //     <div className="option__names"><input type="radio" onClick={() => { setSelectedAns(3)}}></input><label>{questions[currQuestion]?.option[2]}</label></div>
                                //     <div className="option__names"><input type="radio" onClick={() => { setSelectedAns(4)}}></input><label>{questions[currQuestion]?.option[3]}</label></div>
                                // </>

                                // <div className="option__names" key={id}><input type="radio"></input><label>{option.option}</label></div>
                                //     )
                                // })
                        //     ) : (
                        //         <>
                        //             <div className="option__names"><input type="checkbox"></input><label>{questions[currQuestion]?.option[0]}</label></div>
                        //             <div className="option__names"><input type="checkbox"></input><label>{questions[currQuestion]?.option[1]}</label></div>
                        //             <div className="option__names"><input type="checkbox"></input><label>{questions[currQuestion]?.option[2]}</label></div>
                        //             <div className="option__names"><input type="checkbox"></input><label>{questions[currQuestion]?.option[3]}</label></div>
                        //         </>
                        //     )
                        // } */}
                        {/* <div className="option__names"><input type="radio"></input><label>Front end</label></div>
                        <div className="option__names"><input type="radio"></input><label>Back end</label></div>
                        <div className="option__names"><input type="radio"></input><label>Database</label></div>
                        <div className="option__names"><input type="radio"></input><label>None of these</label></div> */}
                    </div>
                </div>

                {questions[currQuestion]?.questionType === "singe Ans" ? (
                    <div className="questionScreen__body4">
                        <div>
                            <h3 className={`${(selectedAns == '') ? 'disabled__button' : 'next__button'} `} onClick={handleClearResponse}>Clear Response</h3>
                        </div>
                        <div>
                            <h3 className="next__button" onClick={handleSkip}>Skip</h3>
                        </div>
                        <div onClick={selectedAns == '' ? disabled : handleNext} className={`${(selectedAns == '') ? 'disabled__button' : 'next__button'} `}>
                            <h3>Save and Next</h3>
                        </div>
                    </div>
                ) : (
                    <div className="questionScreen__body4">
                        
                            <div>
                                <h3 className={`${(checkboxAns == '') ? 'disabled__button' : 'next__button'} `} onClick={handleClearResponse}>Clear Response</h3>
                            </div>
                            <div>
                                <h3 className="next__button" onClick={handleSkip}>Skip</h3>
                            </div>
                            <div onClick={checkboxAns == '' ? disabled : handleNext} className={`${(checkboxAns == '') ? 'disabled__button' : 'next__button'} `}>
                                <h3>Save and Next</h3>
                            </div>
                        
                    </div>
                )}



            </div>

            <div className="questionScreen__right">
                <div className="right__body1">
                    <h3>Name- Current Electricity</h3>
                </div>

                <div className="right__body2">
                    <h3>Question Pallet</h3>
                </div>

                <div className="right__body3">
                    <div className="button__flex">
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                    </div>

                    <div className="button__flex">
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                    </div>

                    <div className="button__flex">
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                    </div>

                    <div className="button__flex">
                        <button>10</button>
                        <button>11</button>
                        <button>12</button>
                    </div>
                </div>

                <div className="right__body4">
                    <div className="rightFooter__content">
                        <div className="green__color" />
                        <h4>Answered Questions</h4>
                    </div>
                    <div className="rightFooter__content">
                        <div className="yellow__color" />
                        <h4>Marked Questions</h4>
                    </div>
                    <div className="rightFooter__content">
                        <div className="white__color" />
                        <h4>Not-answered Questions Questions</h4>
                    </div>
                    <div className="rightFooter__content">
                        <div className="red__color" />
                        <h4>Marked and Answered Questions</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionScreen
