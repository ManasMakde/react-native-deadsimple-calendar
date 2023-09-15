import React, { memo } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { isEqual } from "lodash";

const WeekItems = ({
    DaysList,
    WeekdaysWrapperStyle,
    WeekdayStyle
}) => {

    return (<View style={[DefaultStyles.WeekdaysWrapper, WeekdaysWrapperStyle]}>
        {
            DaysList.map((day, index) => {
                return (
                    <Text key={index} style={[DefaultStyles.Weekday, WeekdayStyle]}>{day}</Text>
                )
            })
        }
    </View>)
}

export default memo(WeekItems, isEqual)


const DefaultStyles = StyleSheet.create({
    WeekdaysWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 5,
        backgroundColor: 'ghostwhite'
    },
    Weekday: {
        flex: 1,
        textAlign: 'center',
        color: 'gray'
        // borderWidth: 2, borderColor: "black"
    }
});