import React, { memo } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { isEqual } from "lodash";

const marker_width = 5

const DayItem = memo(({
    isToday,
    isSelected,
    day,
    DayStyle,
    WeekendStyle,
    TodayStyle,
    SelectedStyle,
    SelectedWrapperStyle,
    weekend,
    DayWrapperStyle,
    setSelectedDate,
    markings,
    MarkerWrapperStyle,
    MarkerStyle
}) => {

    return (<Pressable style={[DefaultStyles.DayWrapper, DayWrapperStyle]} onPress={() => setSelectedDate(day)}>

        <View style={[...isSelected ? [DefaultStyles.SelectedWrapper, SelectedWrapperStyle] : [], { justifyContent: 'center', alignItems: "center" }]}>
            <Text
                style={[DefaultStyles.DayStyle, DayStyle, ,
                ...weekend ? [DefaultStyles.Weekend, WeekendStyle] : [],
                ...isToday ? [DefaultStyles.Today, TodayStyle] : [],
                ...isSelected ? [DefaultStyles.Selected, SelectedStyle] : []
                ]}>{day}</Text>


            {
                markings &&
                <View style={[DefaultStyles.MarkerWrapper, MarkerWrapperStyle, { width: marker_width * (markings.length + 1) }]}>
                    {
                        markings.map((val, index) => {
                            return (<View key={index} style={[DefaultStyles.Marker, MarkerStyle, { backgroundColor: val.color }, val.style]}></View>)
                        })
                    }
                </View>
            }

        </View>

    </Pressable >)
}, isEqual)

const DateContainer = ({
    selectedMonthYear,
    selectedDate,
    setSelectedDate,
    DayContainerStyle,
    DayStyle,
    WeekendStyle,
    TodayStyle,
    SelectedStyle,
    SelectedWrapperStyle,
    WeekStyle,
    DayWrapperStyle,
    MarkedDates,
    MarkerWrapperStyle,
    MarkerStyle
}) => {

    const TodaysDate = new Date().setHours(0, 0, 0, 0)
    const SelectDate = new Date(selectedMonthYear.year, selectedMonthYear.month, selectedDate).setHours(0, 0, 0, 0)
    const empty_days = new Date(selectedMonthYear.year, selectedMonthYear.month, 1).getDay()
    const days_in_month = new Date(selectedMonthYear.year, selectedMonthYear.month + 1, 0).getDate()

    const weeks_arr = []

    let days_arr = []
    let week = 0
    let day = 1

    for (; week < 6 && day <= days_in_month; week++) {

        days_arr = []

        if (!week)  // first week
            days_arr.push(<View key={0} style={{ flex: empty_days }} />)

        const sunday = 7 * (week) - empty_days + 1
        const saturday = 7 * (week + 1) - empty_days

        for (; day <= saturday && day <= days_in_month; day++) {

            const currentDate = (new Date(selectedMonthYear.year, selectedMonthYear.month, day)).setHours(0, 0, 0, 0)

            days_arr.push(<DayItem
                isToday={TodaysDate == currentDate}
                markings={MarkedDates[`${selectedMonthYear.year}-${String(selectedMonthYear.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`]}
                isSelected={SelectDate == currentDate}
                weekend={day == saturday || day == sunday}
                DayStyle={DayStyle}
                WeekendStyle={WeekendStyle}
                SelectedStyle={SelectedStyle}
                SelectedWrapperStyle={SelectedWrapperStyle}
                TodayStyle={TodayStyle}
                DayWrapperStyle={DayWrapperStyle}
                setSelectedDate={setSelectedDate}
                MarkerWrapperStyle={MarkerWrapperStyle}
                MarkerStyle={MarkerStyle}
                day={day}
                key={day}
            />)

        }

        weeks_arr.push(<View key={week} style={[WeekStyle, DefaultStyles.Week]}>{days_arr}</View>)
    }

    days_arr.push(<View key={day} style={{ flex: week * 7 - day - empty_days + 1 }} />)


    return (<View style={[DefaultStyles.DateContainer, DayContainerStyle]}>
        {weeks_arr}
    </View >)

}

export default memo(DateContainer, isEqual)

const DefaultStyles = StyleSheet.create({
    DateContainer: {
    },
    Week: {
        width: "100%",
        flexDirection: 'row',
    },
    DayWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",

        // borderColor: 'black',
        // borderWidth: 2
    },
    DayStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: "80%",
        aspectRatio: 1,
        fontWeight: 'bold',
    },
    MarkerWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 5,
    },
    Marker: {
        height: marker_width,
        width: marker_width,
        borderRadius: 50
    },
    Weekend: {
        color: "darkgray"
    },
    Today: {
        color: 'dodgerblue'
    },
    Selected: {
        color: 'white',
    },
    SelectedWrapper: {
        backgroundColor: 'dodgerblue',
        borderRadius: 50,
    }
});