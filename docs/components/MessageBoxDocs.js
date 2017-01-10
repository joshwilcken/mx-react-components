const React = require('react');

const { Icon, MessageBox, Button, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

const MessageBoxDocs = React.createClass({
  render () {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Message Box
          <label>A component used to display a message to a user.</label>
        </h1>

        <h3>Demo</h3>
        <MessageBox
          color={Styles.Colors.PRIMARY}
          expandable={true}
          icon='attention-solid'
          title='This is a Message'
        >
          <div style={styles.messageBoxContents}>
            <div style={styles.messageBoxText}>This is some message box text.</div>
            <Button style={styles.button}>Its Button Time</Button>
          </div>
        </MessageBox>
        <h3>Usage</h3>
        {/*
          <h5>children <label>Node</label></h5>
          <p>An element that you wish to spin.</p>

          <h5>direction <label>String</label></h5>
          <p>The direction of the spin. Available Options: counterclockwise, clockwise. Default: 'counterclockwise'</p>

          <h5>speed <label>Number</label></h5>
          <p>The time it takes the element to make 1 full rotation in milliseconds. Default: 1000</p>
        */}

        <h3>Example</h3>
        <Markdown>
          {`
            <MessageBox
              color={Styles.Colors.PRIMARY}
              expandable={true}
              icon='attention-solid'
              title='This is a Message'
            >
              <div>
                <div>This is some message box text.</div>
                <Button>Its Button Time</Button>
              </div>
            </MessageBox>
          `}
        </Markdown>
      </div>
    );
  },

  styles () {
    return {
      messageBoxContents: {
        color: Styles.Colors.CHARCOAL,
        display: 'flex'
      },
      messageBoxText: {
        flex: 1
      }
    }
  }
});

module.exports = MessageBoxDocs;
