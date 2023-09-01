import React from "react";
import uuid from "uuid/v4";
import { View } from "react-native";
import Day from "./Day";
import EmptyDay from "./EmptyDay";
import { Utils } from "./Utils";
import moment from "moment";

export default function DaysGridView(props) {
  const {
    month,
    year,
    styles,
    onPressDay,
    startFromMonday,
    selectedStartDate,
    selectedEndDate,
    allowRangeSelection,
    textStyle,
    todayTextStyle,
    selectedDayStyle,
    selectedRangeStartStyle,
    selectedRangeStyle,
    selectedRangeEndStyle,
    customDatesStyles,
    minDate,
    maxDate,
    disabledDates,
    disabledDatesTextStyle,
    minRangeDuration,
    maxRangeDuration,
    enableDateChange,
  } = props;

  const today = moment();

  // let's get the total of days in this month, we need the year as well, since
  // leap years have different amount of days in February
  const totalDays = Utils.getDaysInMonth(month, year);

  // Let's create a date for day one of the current given month and year
  const firstDayOfMonth = moment({ year, month, day: 1 });

  // isoWeekday() gets the ISO day of the week with 1 being Monday and 7 being Sunday.
  // We will need this to know what day of the week to show day 1
  // See https://github.com/stephy/CalendarPicker/issues/49
  const firstWeekDay = firstDayOfMonth.isoWeekday();

  // fill up an array of days with the amount of days in the current month
  const days = Array.apply(null, { length: totalDays }).map(
    Number.call,
    Number
  );

  // 7 days in a week.
  const dayArray = [0, 1, 2, 3, 4, 5, 6];

  // There can be 4 to 6 rows of weeks in a month.
  const weekArray = [0, 1, 2, 3, 4, 5];

  // Get the starting index, based upon whether we are using monday or sunday as first day.
  const startIndex = (startFromMonday ? firstWeekDay - 1 : firstWeekDay) % 7;

  function generateDatesForWeek(i) {
    return dayArray.map((dayIndex) => {
      if (i === 0) {
        // for first row, let's start showing the days on the correct weekday
        if (dayIndex >= startIndex) {
          if (days.length > 0) {
            const day = days.shift() + 1;
            return (
              <Day
                key={day}
                day={day}
                month={month}
                year={year}
                styles={styles}
                onPressDay={onPressDay}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                allowRangeSelection={allowRangeSelection}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
                disabledDatesTextStyle={disabledDatesTextStyle}
                minRangeDuration={minRangeDuration}
                maxRangeDuration={maxRangeDuration}
                textStyle={textStyle}
                todayTextStyle={todayTextStyle}
                selectedDayStyle={selectedDayStyle}
                selectedRangeStartStyle={selectedRangeStartStyle}
                selectedRangeStyle={selectedRangeStyle}
                selectedRangeEndStyle={selectedRangeEndStyle}
                customDatesStyles={customDatesStyles}
                enableDateChange={enableDateChange}
              />
            );
          }
        } else {
          return <EmptyDay key={uuid()} styles={styles} />;
        }
      } else {
        if (days.length > 0) {
          const day = days.shift() + 1;
          return (
            <Day
              key={day}
              day={day}
              month={month}
              year={year}
              styles={styles}
              onPressDay={onPressDay}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              allowRangeSelection={allowRangeSelection}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              disabledDatesTextStyle={disabledDatesTextStyle}
              minRangeDuration={minRangeDuration}
              maxRangeDuration={maxRangeDuration}
              textStyle={textStyle}
              todayTextStyle={todayTextStyle}
              selectedDayStyle={selectedDayStyle}
              selectedRangeStartStyle={selectedRangeStartStyle}
              selectedRangeStyle={selectedRangeStyle}
              selectedRangeEndStyle={selectedRangeEndStyle}
              customDatesStyles={customDatesStyles}
              enableDateChange={enableDateChange}
            />
          );
        }
      }
    });
  }

  return (
    <View style={styles.daysWrapper}>
      {weekArray.map((weekIndexOfMonth) => (
        <View key={weekIndexOfMonth} style={styles.weekRow}>
          {generateDatesForWeek(weekIndexOfMonth)}
        </View>
      ))}
    </View>
  );
}
