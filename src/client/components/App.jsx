import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Output from './output/output';
import Input from './input/input';
import Alert from './alert/alert';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor() {
    super();

    this.state = {
      n: null,
      k: null,
      averagePrices: null,
      errorMessage: null,
      alert: false
    }

    this.onDrop = this.onDrop.bind(this);
    this.parseFile = this.parseFile.bind(this);
    this.handleConstraints = this.handleConstraints.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    injectTapEventPlugin();
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let file = acceptedFiles[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = e => {
        this.parseFile(e);
      };
      reader.readAsText(file);
    } else {
      this.handleConstraints("Failed to load file");
    }
  }

  parseFile(input) {
    let data = input.target.result.split(/[\n ]+/).filter(v => v !== "").map(v => parseInt(v, 10));
    let n = data[0];
    let k = data[1];
    let averagePrices = data.slice(2);

    if (200000 < n || n < 1) {
      this.handleConstraints("n must be an integer between 1 and 200000");
    } else if (n < k || k < 1) {
      this.handleConstraints("k must be an integer between 1 and n");
    } else if (averagePrices.length !== n) {
      this.handleConstraints("Number of average prices must match n");
    } else { 
      this.setState({ n, k, averagePrices })
    }
  }

  handleConstraints(message) {
    this.setState({
      fileContent: null,
      n: null,
      k: null,
      averagePrices: null,
      errorMessage: message,
      alert: !this.state.alert
    })
  }

  toggleAlert() {
    this.setState({
      alert: !this.state.alert
    })
  }

  render() {
    return (
      <div className="container">
        <div className="dropzoneContainer">
          <Dropzone className="dropzoneStyle"  onDrop={ files => this.onDrop(files) }>
            <div><i style={{ fontSize: "5em" }} className="fa fa-cloud-upload" aria-hidden="true"></i></div>
            <div className="days">{ this.state.n || "_" } Days</div>
            <div className="window">Window size of { this.state.k || "_" }</div>
          </Dropzone>
          <MuiThemeProvider>
            { this.state.alert ? 
              <Alert errorMessage={ this.state.errorMessage } toggleAlert={ () => this.toggleAlert } alert={ this.state.alert } />
              : null
            }
          </MuiThemeProvider>
        </div>
        {
          this.state.n !== null ?
          <Input n={ this.state.n } averagePrices={ this.state.averagePrices }/>
          : <div className="react-scrollable-list"><i className="fa fa-arrow-circle-o-down" aria-hidden="true"></i></div>
        }
        {
          this.state.n !== null ? 
          <Output n={ this.state.n } k={ this.state.k } averagePrices={ this.state.averagePrices } handleConstraints={ this.handleConstraints }/>
          : <div className="react-scrollable-list"><i className="fa fa-arrow-circle-o-up" aria-hidden="true"></i></div>
        }
      </div>
    );
  }
}

export default App;
