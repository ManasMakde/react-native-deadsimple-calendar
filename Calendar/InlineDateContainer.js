import React, { memo, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { isEqual } from "lodash";
import { DefaultStyles, marker_width } from './Common';

const InlineDayItem = memo(({ isToday, isSelected, day, DayName, DayStyle, WeekendStyle, TodayStyle, SelectedStyle, SelectedWrapperStyle, isWeekend, DayWrapperStyle, setSelectedDate, markings, MarkerWrapperStyle, MarkerStyle }) => {

    return (<Pressable style={[Styles.DayWrapper, DayWrapperStyle]} onPress={() => setSelectedDate(day)}>
        <Text style={{ marginVertical: 4, color: "gray", fontWeight: (isWeekend ? "bold" : "normal") }}>{DayName}</Text>

        <View style={[...isSelected ? [DefaultStyles.SelectedWrapper, SelectedWrapperStyle] : [], { justifyContent: 'center', alignItems: "center", marginHorizontal: 5 }]}>
            <Text
                style={[Styles.DayStyle, DayStyle,
                ...isWeekend ? [Styles.Weekend, WeekendStyle] : [],
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

const InlineDateContainer = ({
    DaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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
    MarkerStyle
}) => {

    const ContainerRef = useRef()
    const OneTimeView = useRef(true) // When Calendar is first opened it is scrolled to current date
    const todays_date = new Date()
    const TodaysDate = todays_date.setHours(0, 0, 0, 0)
    const SelectDate = new Date(selectedMonthYear.year, selectedMonthYear.month, selectedDate).setHours(0, 0, 0, 0)
    const days_in_month = new Date(selectedMonthYear.year, selectedMonthYear.month + 1, 0).getDate()

    useEffect(() => {
        ContainerRef.current.scrollTo({ x: 0, y: 0, animated: false })
    }, [selectedMonthYear])

    return (<ScrollView style={[Styles.DateContainer, DayContainerStyle]} horizontal={true} ref={ContainerRef} showsHorizontalScrollIndicator={false}
        onContentSizeChange={OneTimeView.current ? (width, height) => {
            if (selectedMonthYear.year == todays_date.getFullYear() && selectedMonthYear.month == todays_date.getMonth())
                ContainerRef.current.scrollTo({ x: ((todays_date.getDate() - 1) * width / days_in_month), y: 0, animated: false })

            OneTimeView.current = false
        } : null}>
        {

            [...Array(days_in_month)].map((val, day) => {
                day += 1

                const current_date = new Date(selectedMonthYear.year, selectedMonthYear.month, day)
                const iterate_date = current_date.setHours(0, 0, 0, 0)
                const day_number = current_date.getDay()


                let marked_dates = MarkedDates[`${selectedMonthYear.year}-${String(selectedMonthYear.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`]

                return (<InlineDayItem
                    isToday={TodaysDate == iterate_date}
                    markings={marked_dates}
                    isSelected={SelectDate == iterate_date}
                    DayName={DaysList[day_number]}
                    isWeekend={day_number == 0 || day_number == 6}
                    key={day}

                    {...{
                        DayStyle,
                        WeekendStyle,
                        SelectedStyle,
                        SelectedWrapperStyle,
                        TodayStyle,
                        DayWrapperStyle,
                        setSelectedDate,
                        MarkerWrapperStyle,
                        MarkerStyle,
                        day
                    }}
                />)
            })
        }
    </ScrollView >)

}

export default memo(InlineDateContainer, isEqual)

const Styles = StyleSheet.create({
    DateContainer: {
    },
    DayWrapper: {
        alignItems: "center"
    },
    DayStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 40,
        aspectRatio: 1,
        fontWeight: 'bold',
    },
    Weekend: {
    }
});