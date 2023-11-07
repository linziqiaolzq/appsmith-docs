import React, { useState, useImperativeHandle, forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './css/AISearch.css';
import { FaUser, FaComment } from 'react-icons/fa';

const AISearch = forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showExamples, setShowExamples] = useState(true);
    const [isModalOpen, setModalState] = useState(true);
    let eventSource;
    const commonSearchQueries = [
        "How to get started with Appsmith?",
        "How to install Appsmith on Docker?",
        "How to display, filter and search data in a Table?",
        "How to submit form data?"
    ];

    const resetState = () => {
        setInputValue('');
        setSearchTerm('');
        setAnswer('');
        setIsLoading(false);
        setShowExamples(true);
        setModalState(false);
    };

    const closeModal = () => {
        if (props.closeModal) {
            props.closeModal();
        }
        setModalState(false);
    };

    useImperativeHandle(ref, () => ({
        resetModal: () => {
            resetState();
            closeModal();
        },
        closeModal,
    }));

    const fetchData = async (query) => {
        setIsLoading(true);
        setAnswer('');
        setSearchTerm(query);
        setShowExamples(false);

        const projectURL = 'https://zxtoyfvpdjilxmpezgde.supabase.co/functions/v1/vector-search';
        const queryURL = `${projectURL}/stream?query=${query}`;

        eventSource = new EventSource(queryURL);

        eventSource.addEventListener('error', (err) => {
            setIsLoading(false);
            console.error(err);
        });

        eventSource.addEventListener('message', (e) => {
            setIsLoading(false);

            if (e.data === "[DONE]") {
                eventSource.close();
                setInputValue('');
                return;
            }

            const completionResponse = JSON.parse(e.data);
            const text = completionResponse.choices[0].text;

            setAnswer((prevAnswer) => prevAnswer + text);

        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchData(inputValue);
        }
    };

    const handleCommonQueryClick = (query) => {
        fetchData(query);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className='ai-search-result-wrapper'>
            <div className='ai-result-container'>
                {showExamples && (
                    <div className='ai-query-wrapper'>
                        <span className='ai-query-heading'>Examples</span>
                        {showExamples && commonSearchQueries.map((query, index) => (
                            <span
                                key={index}
                                className='ai-search-term'
                                onClick={() => handleCommonQueryClick(query)}
                            >
                                {query}
                            </span>
                        ))}
                    </div>
                )}
                <input
                    id="question-input"
                    name="question-input"
                    placeholder="Ask Appsmith AI a question..."
                    type="text"
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
                {isLoading && <div></div>}
                {searchTerm && (
                    <div className='user-search-term'>
                        <FaUser className='user-icon' /> {searchTerm}
                    </div>
                )}
                {answer && (
                    <div className='search-term-answer'>
                        <FaComment className='comment-icon' /> <ReactMarkdown>{answer}</ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
});

export default AISearch;