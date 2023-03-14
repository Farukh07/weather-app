import React, { Component } from 'react';
import WeatherItem from './WeatherDay/WeatherDay'

class WeatherList extends Component {
    render() {
        let statItems = this.props.stats.map(stat => {
            return (
            <WeatherItem stat={stat} key = {stat.id} 
            selectedDay = {id => this.props.onSelectedDay(id)}/>)
        })
        return (
            <div className="row">
                {statItems}
            </div>
        );
    }
}

export default WeatherList;
