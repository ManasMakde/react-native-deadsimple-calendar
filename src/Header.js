import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { isEqual } from "lodash";


function Arrow({ direction = 1, onPress = () => { } }) { // 1= right, -1 = left

    return (<TouchableOpacity onPress={onPress} style={{ backgroundColor: 'darkgray', padding: 15, borderRadius: 50 }}>
        <View style={[DefaultStyles.Triangle, { transform: [{ rotate: 90 * direction + "deg" }] }]} />
    </TouchableOpacity>)

}

function Title({ TitleStyle, TitleTextStyle, OnTitlePress, selectedMonthYear, MonthsList }) {
    return (<TouchableOpacity style={TitleStyle} onPress={OnTitlePress}>
        <Text style={TitleTextStyle}> {`${MonthsList[selectedMonthYear.month]} ${selectedMonthYear.year}`}</Text>
    </TouchableOpacity>)
}

const Header = ({ MonthsList,
    OnTitlePress = () => { },

    setSelectedDate,
    selectedMonthYear,
    setSelectedMonthYear,

    HeaderStyle,
    TitleStyle,
    TitleTextStyle,

    CustomLeftArrow = Arrow,
    CustomRightArrow = Arrow,

    CustomTitle = Title

}) => {

    return (<View style={[DefaultStyles.Header, HeaderStyle]}>
        <CustomLeftArrow
            direction={-1}
            onPress={() => {
                setSelectedMonthYear(val => {

                    const new_val = {
                        ...val,
                        year: val.year - (val.month ? 0 : 1),
                        month: val.month ? val.month - 1 : 11
                    }

                    setSelectedDate(1)

                    return new_val
                })
            }}
        />

        <CustomTitle
            TitleStyle={[DefaultStyles.Title, TitleStyle]}
            TitleTextStyle={[DefaultStyles.TitleText, TitleTextStyle]}
            OnTitlePress={OnTitlePress}
            selectedMonthYear={selectedMonthYear}
            MonthsList={MonthsList}
        />

        <CustomRightArrow
            onPress={() => {
                setSelectedMonthYear(val => {

                    const new_val = {
                        ...val,
                        year: val.year + (val.month == 11 ? 1 : 0),
                        month: (val.month + 1) % 12
                    }

                    setSelectedDate(1)

                    return new_val
                })
            }}
        />
    </View>)

}

export default memo(Header, isEqual)

const DefaultStyles = StyleSheet.create({
    Header: {
        width: "100%",
        backgroundColor: 'gray',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5
    },
    Title: {
        backgroundColor: 'darkgray',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        marginVertical: 5,
    },
    TitleText: {
        fontWeight: 'bold',
        color: "white"
    },
    Triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "white"
    }
});