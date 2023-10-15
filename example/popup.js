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

const DateSelectorPopup = ({ calendarRef, setSelectorVisible }) => {

  const calendarDate = calendarRef.current.getDate()
  const [selectorMonth, setSelectorMonth] = useState(calendarDate.month)
  const inputRef = useRef(null);
  const selectorYearRef = useRef(calendarDate.year)

  const closeSelector = useCallback(() => {
    calendarRef.current.setDate(1, selectorMonth, selectorYearRef.current)
    setSelectorVisible(false)
  }, [selectorMonth])

  return (<Modal
    transparent={true}
    animationType="slide"
    onRequestClose={closeSelector}>

    <View style={Styles.selector_wrapper}>

      <Text style={Styles.selector_title}>Select Month & Year</Text>

      <View style={Styles.input_wrapper}>
        <Dropdown
          style={Styles.dropdown}
          itemTextStyle={{ textAlign: 'center' }}
          selectedTextStyle={{ textAlign: 'center' }}
          data={SHORT_MONTH_PICKER}
          labelField="label"
          valueField="value"
          maxHeight={200}
          onChange={({ value }) => { setSelectorMonth(value) }}
          value={selectorMonth}
        />

        <TextInput style={Styles.input}

          defaultValue={String(calendarDate.year)}
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

      <View style={Styles.btn_wrapper}>

        <TouchableOpacity style={[Styles.selectDateBtn, { backgroundColor: "dodgerblue" }]} activeOpacity={0.6} onPress={closeSelector}>
          <Text style={Styles.btn_text}>Select</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.selectDateBtn} activeOpacity={0.6} onPress={() => {
          const currentDate = new Date()
          selectorYearRef.current = currentDate.getFullYear()
          inputRef.current.setNativeProps({ text: String(selectorYearRef.current) })
          setSelectorMonth(currentDate.getMonth())
        }}>
          <Text style={Styles.btn_text}>Reset</Text>
        </TouchableOpacity>

      </View>
    </View>

  </Modal>)
}

export default function App() {

  const calendarRef = useRef()
  const [selectorVisible, setSelectorVisible] = useState(false)

  return (<>
    <Calendar

      ref={calendarRef}

      OnTitlePress={() => {
        setSelectorVisible(true)
      }}
    />

    {/* Date Selector Popup */
      selectorVisible && <DateSelectorPopup {...{ setSelectorVisible, calendarRef }} />
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

  },
  selector_wrapper: {

    height: "95%",
    width: "100%",
    backgroundColor: "white",
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20

  },
  selector_title: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 25,
    fontWeight: "bold",
    fontSize: 18,
    borderColor: "lightgray",
    borderBottomWidth: 2
  },
  input_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden'
  },
  dropdown: {
    width: 150,
    height: 50,
    backgroundColor: "gainsboro",
    borderRadius: 5,
    paddingRight: 5
  },
  input: {
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
  },
  btn_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  btn_text: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    fontSize: 20,
    fontWeight: "bold",
    color: 'white'

  }
});