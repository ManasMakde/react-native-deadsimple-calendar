// Make sure to `npm i react-native-element-dropdown`

import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, Modal, Text, TextInput, TouchableOpacity, } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Calendar from './Calendar';


const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT_MONTH_PICKER = MONTH_NAMES.map((val, index) => {
  return ({
    value: index,
    label: val.substring(0, 3)
  })

})

const DateSelectorPopup = ({ setSelectedMonthYear, selectedMonthYear, setSelectedDate, setSelectorVisible }) => {

  const selectorYearRef = useRef(selectedMonthYear.year)
  const [selectorMonth, setSelectorMonth] = useState(selectedMonthYear.month)
  const inputRef = useRef(null);

  const closeSelector = useCallback(() => {
    setSelectedMonthYear(val => ({
      ...val,
      month: selectorMonth,
      year: selectorYearRef.current,
    }))

    setSelectedDate(1)

    setSelectorVisible(false)
  }, [selectorMonth])

  return (<Modal
    transparent={true}
    animationType="slide"
    onRequestClose={closeSelector}>
    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)" }}>

      <View style={{ height: "95%", width: "100%", backgroundColor: "white", bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

        <Text style={{ width: "100%", textAlign: "center", paddingVertical: 25, fontWeight: "bold", fontSize: 18, borderColor: "lightgray", borderBottomWidth: 2 }}>Select Month & Year</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flex: 1, overflow: 'hidden' }}>
          <Dropdown
            style={{ width: 150, height: 50, backgroundColor: "gainsboro", borderRadius: 5, paddingRight: 5 }}
            itemTextStyle={{ textAlign: 'center' }}
            selectedTextStyle={{ textAlign: 'center' }}
            data={SHORT_MONTH_PICKER}
            labelField="label"
            valueField="value"
            maxHeight={200}
            onChange={({ value }) => { setSelectorMonth(value) }}
            value={selectorMonth}
          />

          <TextInput style={{
            width: 150,
            height: 50,
            backgroundColor: 'gainsboro',
            paddingHorizontal: 3,
            borderRadius: 5,
            borderBottomColor: "rgba(0,0,0,0.3)",
            borderBottomWidth: 1.5,
            color: "black",
            textAlign: "center",
            fontSize: 18,
          }}

            defaultValue={String(selectedMonthYear.year)}
            ref={inputRef}

            onChangeText={(val) => {

              selectorYearRef.current = parseInt(val)
              selectorYearRef.current = selectorYearRef.current ? selectorYearRef.current : 2000
            }}

            placeholderTextColor="white"
            placeholder="Enter Year"
            keyboardType='number-pad'
          />


        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

          <TouchableOpacity style={[Styles.selectDateBtn, { backgroundColor: "dodgerblue" }]} activeOpacity={0.6} onPress={closeSelector}>
            <Text style={{ paddingVertical: 15, paddingHorizontal: 25, fontSize: 20, fontWeight: "bold", color: 'white' }}>Select</Text>
          </TouchableOpacity>

          <TouchableOpacity style={Styles.selectDateBtn} activeOpacity={0.6} onPress={() => {
            const currentDate = new Date()
            selectorYearRef.current = currentDate.getFullYear()
            inputRef.current.setNativeProps({ text: String(selectorYearRef.current) })
            setSelectorMonth(currentDate.getMonth())
          }}>
            <Text style={{ paddingVertical: 15, paddingHorizontal: 25, fontSize: 20, fontWeight: "bold", color: 'white' }}>Reset</Text>
          </TouchableOpacity>

        </View>
      </View>

    </View>
  </Modal>)
}

export default function App() {

  const currentDate = new Date()

  const [selectedMonthYear, setSelectedMonthYear] = useState({ "month": currentDate.getMonth(), "year": currentDate.getFullYear() })
  const [selectedDate, setSelectedDate] = useState(currentDate.getDate())
  const [selectorVisible, setSelectorVisible] = useState(false)


  return (<>
    <Calendar

      OnTitlePress={() => {
        setSelectorVisible(true)
      }}

      {...{
        selectedDate, setSelectedDate,
        selectedMonthYear, setSelectedMonthYear
      }}
    />

    {/* Date Selector Popup */
      selectorVisible && <DateSelectorPopup {...{ setSelectedMonthYear, selectedMonthYear, setSelectedDate, setSelectorVisible }} />
    }
  </>);
}

const Styles = StyleSheet.create({
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
  },
  selectDateBtn: {
    alignSelf: 'center',
    marginBottom: "20%",
    backgroundColor: 'gray',
    elevation: 5,
    borderRadius: 5

  }
});