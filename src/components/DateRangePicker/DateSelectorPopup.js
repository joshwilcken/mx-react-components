const React = require('react');
const moment = require('moment');

const StyleConstants = require('../../constants/Style');

const DefaultRanges = require('./DefaultRanges');

const Icon = require('../Icon');
const Column = require('../../components/grid/Column');
const Container = require('../../components/grid/Container');
const Row = require('../../components/grid/Row');

class DateSelectorPopup extends React.Component {
  state = {
    currentDate: this.props.selectedEndDate || moment().unix(),
    showCalendar: false
  };

  render () {
    const styles = this.styles();
    const spans = this.spans();

    return (
      <div>
        <Container>
          <Row>
            <div style={styles.optionsWrapper}>
              {this.props.isLargeOrMediumWindowSize && (
                <Column span={spans.defaultRanges}>
                  {this.props.showDefaultRanges &&
                    <DefaultRanges
                      defaultRanges={this.props.defaultRanges}
                      handleDefaultRangeSelection={this._handleDefaultRangeSelection}
                      primaryColor={this.props.primaryColor}
                      selectedEndDate={this.props.selectedEndDate}
                      selectedStartDate={this.props.selectedStartDate}
                      styles={styles}
                    />
                  }
                </Column>
              )}
              <Column span={spans.calendar}>
                <div style={styles.calendarWrapper}>
                  <div style={styles.calendarHeader}>
                    <Icon
                      elementProps={{
                        onClick: this._handlePreviousClick
                      }}
                      size={20}
                      style={styles.calendarHeaderNav}
                      type='caret-left'
                    />
                    <div>
                      {moment(this.state.currentDate, 'X').format('MMMM YYYY')}
                    </div>
                    <Icon
                      elementProps={{
                        onClick: this._handleNextClick
                      }}
                      size={20}
                      style={styles.calendarHeaderNav}
                      type='caret-right'
                    />
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
                    activeSelectDate={this.state.activeSelectDate}
                    currentDate={this.state.currentDate}
                    getDateRangePosition={this._getDateRangePosition}
                    handleDateHover={this._handleDateHover}
                    handleDateSelect={this._handleDateSelect}
                    isInActiveRange={this._isInActiveRange}
                    minimumDate={this.props.minimumDate}
                    selectedEndDate={this.props.selectedEndDate}
                    selectedStartDate={this.props.selectedStartDate}
                    styles={styles}
                  />
                </div>
              </Column>
              {!this.props.isLargeOrMediumWindowSize && (
                <Column span={spans.defaultRanges}>
                  {this.props.showDefaultRanges &&
                    <DefaultRanges
                      defaultRanges={this.props.defaultRanges}
                      handleDefaultRangeSelection={this._handleDefaultRangeSelection}
                      primaryColor={this.props.primaryColor}
                      styles={styles}
                    />
                  }
                </Column>
              )}
            </div>
          </Row>
        </Container>
        {(this.props.showCalendar) ? (
          <div onClick={this._handleScrimClick} style={styles.scrim} />
        ) : null }
      </div>
    )
  };

  spans = () => {
    return {
      calendar: {
        large: this.props.showDefaultRanges ? 8 : 12,
        medium: this.props.showDefaultRanges ? 8 : 12,
        small: 12
      },
      defaultRanges: {
        large: this.props.showDefaultRanges ? 4 : 0,
        medium: this.props.showDefaultRanges ? 4 : 0,
        small: this.props.showDefaultRanges ? 12 : 0
      }
    };
  };

  styles = () => {
    return {
      //Calendar Styles
      optionsWrapper: {
        backgroundColor: StyleConstants.Colors.WHITE,
        border: '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        boxShadow: StyleConstants.ShadowHigh,
        boxSizing: 'border-box',
        display: this.props.showCalendar ? 'flex' : 'none',
        flexDirection: this.props.isLargeOrMediumWindowSize ? 'row' : 'column',
        justifyContent: 'center',
        marginTop: this.props.isLargeOrMediumWindowSize ? 10 : 5,
        position: 'absolute',
        left: this.props.isRelative && window.innerWidth > 450 ? 'auto' : 0,
        right: 0,
        maxWidth: 450,
        width: window.innerWidth,
        zIndex: 10
      },
      calendarWrapper: {
        boxSizing: 'border-box',
        padding: this.props.isLargeOrMediumWindowSize ? 20 : 10,
        margin: 'auto',
        maxWidth: 250,
        width: this.props.isLargeOrMediumWindowSize ? 250 : '100%'
      },

      //Calendar Header
      calendarHeader: {
        alignItems: 'center',
        color: StyleConstants.Colors.CHARCOAL,
        display: 'flex',
        fontSize: StyleConstants.FontSizes.LARGE,
        height: 30,
        justifyContent: 'space-between',
        marginBottom: 15,
        position: 'relative',
        textAlign: 'center'
      },
      calendarHeaderNav: {
        width: 35,
        cursor: 'pointer'
      },

      //Calendar week
      calendarWeek: {
        alignItems: 'center',
        color: StyleConstants.Colors.ASH,
        display: 'flex',
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.SMALL,
        height: 30,
        justifyContent: 'center',
        marginBottom: 2
      },
      calendarWeekDay: {
        textAlign: 'center',
        width: 30
      },

      //Calendar table
      calendarTable: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
      calendarDay: {
        alignItems: 'center',
        boxSizing: 'border-box',
        color: StyleConstants.Colors.FOG,
        cursor: 'pointer',
        display: 'flex',
        height: 30,
        justifyContent: 'center',
        marginBottom: 2,
        width: 30,

        ':hover': {
          border: '1px solid' + this.props.primaryColor
        }
      },
      calendarDayDisabled: {
        color: StyleConstants.Colors.FOG,

        ':hover': {
          cursor: 'default',
          border: 'none'
        }
      },
      today: {
        backgroundColor: StyleConstants.Colors.FOG,
        color: StyleConstants.Colors.WHITE
      },
      currentMonth: {
        color: StyleConstants.Colors.CHARCOAL
      },
    }
  }
};

module.exports = DateSelectorPopup;
