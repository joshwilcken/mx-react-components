const React = require('react');
const moment = require('moment');



const Icon = require('./Icon');
const DateSelectorPopup = require('./DateRangePicker/DateSelectorPopup');

const StyleConstants = require('../constants/Style');

class DateRangePicker2 extends React.Component {

  static defaultProps = {
    format: 'MMM D, YYYY'
  }
  state = {
    currentDate: this.props.selectedEndDate || moment().unix(),
    showCalendar: false
  };

  _getDateFormat = () => {
    return this._isLargeOrMediumWindowSize() ? this.props.format : 'MMM D';
  };

  _isLargeOrMediumWindowSize = () => {
    const windowSize = StyleConstants.getWindowSize();

    return windowSize === 'large' || windowSize === 'medium';
  };

  render () {
    const styles = this.styles();

    return (
      <div style={styles.component}>
        <div onClick={() => this.setState({ showCalendar: !this.state.showCalendar })} style={styles.selectedDateWrapper}>
          <div style={styles.selectedDateText}>
            {this.props.selectedStartDate && this.props.selectedEndDate ? (
              <div>
                <span>{moment.unix(this.props.selectedStartDate).format(this._getDateFormat())}</span>
                <span> - </span>
                <span>{moment.unix(this.props.selectedEndDate).format(this._getDateFormat())}</span>
              </div>
            ) : this.props.placeholderText}
          </div>
          <Icon
            size={20}
            style={styles.selectedDateCaret}
            type={this.state.showCalendar ? 'caret-up' : 'caret-down'}
          />
        </div>

        {this.state.showCalendar && (
          <DateSelectorPopup
            isLargeOrMediumWindowSize={this._isLargeOrMediumWindowSize()}
            selectedStartDate={this.props.selectedStartDate}
            selectedEndDate={this.props.selectedEndDate}
            showCalendar={this.state.showCalendar}
          />
        )}
      </div>
    )
  };

  styles = () => {
    const isLargeOrMediumWindowSize = this._isLargeOrMediumWindowSize();

    return {
      component: Object.assign({
        backgroundColor: StyleConstants.Colors.WHITE,
        borderColor: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.FOG,
        borderRadius: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        boxSizing: 'border-box',
        color: StyleConstants.Colors.BLACK,
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: StyleConstants.FontFamily,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        padding: '10px 15px',
        position: this.props.isRelative && window.innerWidth > 450 ? 'relative' : 'static',
        width: '100%'
      }, this.props.style),

      // Selected Date styles
      selectedDateWrapper: {
        alignItems: 'center',
        display: 'flex',
        height: 20,
        justifyContent: 'space-between'
      },
      selectedDateIcon: {
        fill: this.props.primaryColor,
        marginRight: 5
      },
      selectedDateText: {
        color: (this.props.selectedStartDate && this.props.selectedEndDate) ? StyleConstants.Colors.CHARCOAL : StyleConstants.Colors.ASH
      },
      selectedDateCaret: {
        fill: this.state.showCalendar ? this.props.primaryColor : StyleConstants.Colors.ASH
      }


    };
  };
}

module.exports = DateRangePicker2;
