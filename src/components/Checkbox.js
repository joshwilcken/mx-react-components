const React = require('react');

const StyleConstants = require('../constants/Style');

const Checkbox = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool,
    handleToggle: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      disabled: false,
      selected: false
    };
  },

  _handleToggle (event) {
    this.props.handleToggle(event.target.checked);
    console.log(event.target.checked);
  },

  render () {
    const styles = this.styles();

    return (
      <div style={styles.checkboxWrapper}>
        <input
          defaultChecked={this.props.selected}
          disabled={this.props.disabled}
          onClick={this._handleToggle}
          style={styles.inputCheckbox}
          type='checkbox'
        />
      </div>
    );
  },

  styles () {
    return {
      inputCheckbox: {
        opacity: 0
      },
      checkboxWrapper: {
        height: 15,
        width: 15,
        border: `1px solid ${StyleConstants.Colors.ASH}`,
        borderRadius: 2
      }
    };
  }
});


module.exports = Checkbox;
