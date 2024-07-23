import React from 'react';
import PropTypes from 'prop-types';
import '../Semicircular/semicircular.css';


const SemicircularProgressBar = ({ value, color }) => {
    const radius = 50;
    const circumference = Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <svg
            className="semicircular-progress-bar"
            width="300"
            height="140"
            viewBox="0 0 120 60"
        >
            <path
                className="semicircular-progress-bar-bg"
                d="M 10 60 A 50 50 0 0 1 110 60"
                strokeWidth="20"
            />
            <path
                className="semicircular-progress-bar-fg"
                d="M 10 60 A 50 50 0 0 1 110 60"
                strokeWidth="20"
                stroke={color}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
            />
            <text x="50%" y="90%" textAnchor="middle" fill="#000" fontSize="12" dy=".3em">
                {value}%
            </text>
        </svg>
    );
};

SemicircularProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
};

export default SemicircularProgressBar;
