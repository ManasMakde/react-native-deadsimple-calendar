# 📅💀 react-native-deadsimple-calendar 

[![Version](https://img.shields.io/npm/v/react-native-deadsimple-calendar.svg)](https://www.npmjs.com/package/react-native-deadsimple-calendar )

Need a simple calendar without having to waste time setting up / optimizing?  
Then this package is just for you!

![Example](images/Example.gif)

or if you prefer the inline strip version:

![Alt text](<images/InlineStripExample.gif>)

<br>

> ***Don't like adding dependencies to your project?***  
> Feel free to copy paste the code from my github & leave a ⭐
 

## Advantages ✨
1. Ready to go out of the box 🚀
2. Highly customizable 🔧
3. Externally changeable date 🪄 
4. Memoized to improve performance ⚡

## Examples

Minimal:
```js
import React from 'react';
import { View } from 'react-native';
import Calendar from 'react-native-deadsimple-calendar';

export default function App() {
  return (<View>

      <Calendar/>

    </View>);
}

```

Minimal Inline Strip:
```js
import React from 'react';
import { View } from 'react-native';
import Calendar from 'react-native-deadsimple-calendar';

export default function App() {
  return (<View>

      <Calendar
        InlineStrip={true}
      />

    </View>);
}

```

Customizing:

```js
const MyHeader=()=>(<View>...</View>)


export default function App() {

  const calendarRef = useRef()

  return (<>

    <Button title='Change the date' onPress={() => {
      calendarRef.current.setDate(13, 2, 2003)
    }} />

    <Calendar

      ref={calendarRef}

      style={{
        borderWidth: 3,
        borderColor: 'black',
      }}

      // CustomHeader={MyHeader}
      MarkedDates={{ "2023-00-13": [{ color: "red" }] }}

      OnMonthYearChange={(newMonthYear) => {
        console.log(newMonthYear)
      }}

      OnDateChange={(newDate) => {
        console.log(newDate)
      }}
    />
  </>);
}
```

> **Hint 💡**  
> You can use `OnTitlePress` to create a custom popup to change the month & year.  
>
> ( Check out [this](https://github.com/ManasMakde/react-native-deadsimple-calendar/blob/main/example/popup.js) example )

## API

| **Props**              | **Type**  | **Example**                                                                                                                           |
|------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------|
| MarkedDates            | Object    | `{ "2023-00-13": [{ color: "red" }, { color: "green" }] }`                                                                            |
| DaysList               | Array     | Default: `["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]`                                                                          |
| MonthsList             | Array     | Default: `["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]` |
| InlineStrip            | Boolean   | Default: `false`                                                                                                                      |
| OnTitlePress           | Function  | `()=>{}`                                                                                                                              |
| OnMonthYearChange      | Function  | `(newMonthYear) => {}`                                                                                                                |
| OnDateChange           | Function  | `(newDate) => {}`                                                                                                                     |
| ref                    | useRef    | `ref.current.setDate(date, month, year)` <br><br> `ref.current.getDate()`                                                                              |
| CustomTitle            | Component |                                                                                                                                       |
| CustomRightArrow       | Component |                                                                                                                                       |
| CustomLeftArrow        | Component |                                                                                                                                       |
| CustomHeader           | Component |                                                                                                                                       |
| style                  | Object    |                                                                                                                                       |
| HeaderStyle            | Object    |                                                                                                                                       |
| TitleStyle             | Object    |                                                                                                                                       |
| RightArrowWrapperStyle | Object    |                                                                                                                                       |
| RightArrowStyle        | Object    |                                                                                                                                       |
| LeftArrowWrapperStyle  | Object    |                                                                                                                                       |
| LeftArrowStyle         | Object    |                                                                                                                                       |
| WeekItemsWrapperStyle  | Object    |                                                                                                                                       |
| WeekItemstyle          | Object    |                                                                                                                                       |
| DayContainerStyle      | Object    |                                                                                                                                       |
| DayStyle               | Object    |                                                                                                                                       |
| TodayStyle             | Object    |                                                                                                                                       |
| SelectedStyle          | Object    |                                                                                                                                       |
| WeekendStyle           | Object    |                                                                                                                                       |
| WeekStyle              | Object    |                                                                                                                                       |
| DayWrapperStyle        | Object    |                                                                                                                                       |
| SelectedWrapperStyle   | Object    |                                                                                                                                       |
| MarkerWrapperStyle     | Object    |                                                                                                                                       |
| MarkerStyle            | Object    |                                                                                                                                       |



## Feedback / Bug report
If you find any bugs or want to leave a feedback, my email is on my github bio  
Always open to constructive criticism 😁