const React = require('react');
const moment = require('moment');
const keycode = require('keycode');
const PropTypes = require('prop-types');
const FocusTrap = require('focus-trap-react');

const Icon = require('../Icon');
const Button = require('../Button');

const MonthTable = require('./MonthTable');
const { MonthSelector, YearSelector } = require('./Selector');
const SelectionPane = require('./SelectionPane');

class CalendarOptions extends React.Component {
  static propTypes = {
    showCalendar: PropTypes.bool
  };

  render () {
    const { showCalendar, showDefaultRanges, defaultRanges, selectedBox, selectedEndDate, selectedStartDate, theme, styles, onDateBoxClick,
    handleDefaultRangeSelection, isLargeOrMediumWindowSize, currentDate, setCurrentDate, activeSelectDate, focusedDay, getDateRangePosition, handleDateHover, handleDateSelect,
  handleDayKeyDown, isInActiveRange, minimumDate, handleApplyClick} = this.props
    return (
      <FocusTrap>
        <div style={styles.optionsWrapper}>
          {!showCalendar && (
            <div>
              {this.props.showDefaultRanges &&
                <SelectionPane
                  defaultRanges={defaultRanges}
                  handleDefaultRangeSelection={handleDefaultRangeSelection}
                  onDateBoxClick={onDateBoxClick}
                  selectedBox={selectedBox}
                  selectedEndDate={selectedEndDate}
                  selectedStartDate={selectedStartDate}
                  styles={styles}
                  theme={theme}
                />
              }
            </div>
          )}

          {(showCalendar || isLargeOrMediumWindowSize) && (
            <div>
              <div style={styles.calendarWrapper}>
                <div style={styles.calendarHeader}>
                  <MonthSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />
                  <YearSelector currentDate={currentDate} setCurrentDate={setCurrentDate} />

                </div>
                <div style={styles.calendarWeek}>
                  {[{ label: 'S', value: 'Sunday' },
                    { label: 'M', value: 'Monday' },
                    { label: 'T', value: 'Tuesday' },
                    { label: 'W', value: 'Wednesday' },
                    { label: 'T', value: 'Thursday' },
                    { label: 'F', value: 'Friday' },
                    { label: 'S', value: 'Saturday' }].map((day) => {
                      return (
                        <div key={day.value} style={styles.calendarWeekDay}>
                          {day.label}
                        </div>
                      );
                    })}
                </div>
                <MonthTable
                  activeSelectDate={activeSelectDate}
                  currentDate={currentDate}
                  focusedDay={focusedDay || currentDate}
                  getDateRangePosition={getDateRangePosition}
                  handleDateHover={handleDateHover}
                  handleDateSelect={handleDateSelect}
                  handleKeyDown={handleDayKeyDown}
                  isInActiveRange={isInActiveRange}
                  minimumDate={minimumDate}
                  selectedEndDate={selectedEndDate}
                  selectedStartDate={selectedStartDate}
                  styles={styles}
                />
                {!isLargeOrMediumWindowSize && (
                  <div style={styles.applyButton}>
                    <Button
                      onClick={handleApplyClick}
                      theme={theme}
                      type='primary'
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </FocusTrap>
    );
  }
}


module.exports = {
  CalendarOptions
};
