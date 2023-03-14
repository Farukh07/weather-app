import React from 'react';

const DayDataItem = (props) => {
    return (
        <div>
            <div class="card bg-info" style={{ width: "8.5rem", height: "25rem" }}>
                <div class="card-header"><p>{props.day.weatherTime.split(" ")[0].split("-").reverse().join("-")}</p>
                <p>{props.day.weatherTime.split(" ")[1]}</p></div>
                <div class="card-body" >
                    <img src={props.day.weatherImage} alt="this is weather image" />
                    <p>{props.day.weatherDesc}</p>
                    <p>Min-temp: {props.day.minTemp}</p>
                    <p>Max-temp: {props.day.maxTemp}</p>
                </div>
            </div>
        </div>
    );
}

export default DayDataItem;
