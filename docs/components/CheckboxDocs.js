const React = require('react');

const { Checkbox, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

const CheckboxDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          Checkbox
          <label>A standard checkbox</label>
        </h1>

        <h3>Demo</h3>
        <Checkbox />

        <h3>Usage</h3>
        <h5> <label></label></h5>
        <p></p>

        <h5> <label></label></h5>
        <p></p>

        <h5> <label></label></h5>
        <p></p>

        <h5> <label></label></h5>
        <p></p>


        <h3>Example</h3>
        <Markdown>
          {`
            <Checkbox />
          `}
        </Markdown>
      </div>
    );
  }
});

module.exports = CheckboxDocs;
