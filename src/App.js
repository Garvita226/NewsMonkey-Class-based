import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 10
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  pageSize = 12
  apiKey = process.env.REACT_APP_NEWS_API

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} pageSize={this.pageSize} apiKey={this.apiKey}  />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress} key='business' pageSize={this.pageSize} apiKey={this.apiKey}  country='in' category='business' />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key='entertainment' pageSize={this.pageSize} apiKey={this.apiKey}  country='in' category='entertainment' />} />
            <Route exact path='/general' element={<News setProgress={this.setProgress} key='general' pageSize={this.pageSize} apiKey={this.apiKey}  country='in' category='general' />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} key='health' pageSize={this.pageSize} apiKey={this.apiKey}  country='in' category='health' />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} key='science' pageSize={this.pageSize} apiKey={this.apiKey}  country='in' category='science' />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key='sports' pageSize={this.pageSize} apiKey={this.apiKey}  country='in' category='sports' />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key='technology' pageSize={this.pageSize} apiKey={this.apiKey}  country='in' category='technology' />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

