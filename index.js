import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/Header';
import WeekItems from './src/WeekItems';
import DateContainer from './src/DateContainer';
import { isEqual } from "lodash";


const Calendar = ({
    MarkedDates = {},
    DaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    MonthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

    OnTitlePress = () => { },
    OnMonthYearChange = () => { },
    OnDateChange = () => { },

    selectedMonthYear, setSelectedMonthYear,
    selectedDate, setSelectedDate,

    style,
    HeaderStyle,
    TitleStyle,
    RightArrowWrapperStyle,
    RightArrowStyle,
    LeftArrowWrapperStyle,
    LeftArrowStyle,
    WeekItemsWrapperStyle,
    WeekItemstyle,
    DayContainerStyle,
    DayStyle,
    WeekendStyle,
    WeekStyle,
    DayWrapperStyle,
    SelectedWrapperStyle,
    MarkerWrapperStyle,
    MarkerStyle,

    CustomTitle,
    CustomRightArrow,
    CustomLeftArrow,
    CustomHeader = Header,
}) => {

    const currentDate = new Date()

    if (selectedMonthYear == undefined || setSelectedMonthYear == undefined)
        [selectedMonthYear, setSelectedMonthYear] = useState({ "month": currentDate.getMonth(), "year": currentDate.getFullYear() })

    if (selectedDate == undefined || setSelectedDate == undefined)
        [selectedDate, setSelectedDate] = useState(1)

    useEffect(() => {
        OnMonthYearChange(selectedMonthYear)
    }, [selectedMonthYear])

    useEffect(() => {
        OnDateChange({
            date: selectedDate,
            month: selectedMonthYear.month,
            year: selectedMonthYear.year,
        })
    }, [selectedDate])


    return (<View style={[DefaultStyles.Style, style]}>
        <CustomHeader
            CustomTitle={CustomTitle}

            CustomRightArrow={CustomRightArrow}
            RightArrowWrapperStyle={RightArrowWrapperStyle}
            RightArrowStyle={RightArrowStyle}

            CustomLeftArrow={CustomLeftArrow}
            LeftArrowWrapperStyle={LeftArrowWrapperStyle}
            LeftArrowStyle={LeftArrowStyle}

            selectedMonthYear={selectedMonthYear}
            setSelectedMonthYear={setSelectedMonthYear}

            setSelectedDate={setSelectedDate}

            MonthsList={MonthsList}
            OnTitlePress={OnTitlePress}

            HeaderStyle={HeaderStyle}
            TitleStyle={TitleStyle}

        />

        <WeekItems
            {...{
                DaysList,
                WeekItemsWrapperStyle,
                WeekItemstyle
            }} />

        <DateContainer {...{ selectedMonthYear, DayContainerStyle, DayStyle, WeekendStyle, selectedDate, setSelectedDate, WeekStyle, DayWrapperStyle, SelectedWrapperStyle, MarkedDates, MarkerWrapperStyle, MarkerStyle }} />

    </View>);

}

export default memo(Calendar, isEqual)


const DefaultStyles = StyleSheet.create({
    Style: {
        width: "100%",
        backgroundColor: 'white',
        paddingBottom: 5
    },
    dateBox: {
        flex: 1
    },
    dateBoxText: {
        fontWeight: 'bold'
    }
});