import React, { Component } from 'react';
import DayDataItem from './DayDataItem/DayDataItem';

class DayDataList extends Component {
    render() {
        let dayItems = this.props.days.map(day => {
            return (
            <DayDataItem day={day} key = {day.id} />)
        })
        return (
            <div className="row">
                {dayItems}
            </div>
        );
    }
}

export default DayDataList;
