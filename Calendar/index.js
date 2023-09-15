import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import WeekItems from './WeekItems';
import DateContainer from './DateContainer';
import { isEqual } from "lodash";
import InlineDateContainer from './InlineDateContainer';


export default Calendar = memo(({
    MarkedDates = {},
    DaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    MonthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

    InlineStrip = false,

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
    TodayStyle,
    SelectedStyle,
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
        [selectedDate, setSelectedDate] = useState(currentDate.getDate())

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

    const Container = InlineStrip ? InlineDateContainer : DateContainer

    return (<View style={[DefaultStyles.Style, style]}>
        <CustomHeader
            {...{
                selectedMonthYear,
                setSelectedMonthYear,
                setSelectedDate,

                CustomTitle,
                CustomRightArrow,
                CustomLeftArrow,

                RightArrowWrapperStyle,
                RightArrowStyle,
                LeftArrowWrapperStyle,
                LeftArrowStyle,
                HeaderStyle,
                TitleStyle,

                MonthsList,
                OnTitlePress
            }}
        />

        {
            !InlineStrip && <WeekItems {...{ DaysList, WeekItemsWrapperStyle, WeekItemstyle }} />
        }

        <Container {...{
            DaysList,
            selectedMonthYear,
            selectedDate,
            setSelectedDate,
            DayContainerStyle,
            DayStyle,
            WeekendStyle,
            TodayStyle,
            SelectedStyle,
            SelectedWrapperStyle,
            DayWrapperStyle,
            MarkedDates,
            MarkerWrapperStyle,
            MarkerStyle,
            WeekStyle,
        }} />


    </View>);

}, isEqual)

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