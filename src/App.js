import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';

import Select from 'react-select';

const options = [
  { value: 'bloomberg', label: 'Bloomberg' },
  { value: 'business-insider', label: 'Business Insider'},
  { value: 'financial-times', label: 'Financial Times' },
  { value: 'the-economist', label: 'The Economist' },
  { value: 'the-new-york-times', label: 'The New York Times' },
  { value: 'the-wall-street-journal', label: 'The Wall Street Journal' },
];


class App extends Component {
  constructor () {
    super()
    this.state = {
      allNews:[],
      filteredNews: [],
      filterview: false,
      search: '',
      // selectedSources: [],
      selectedOption: null  //select menu
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  async componentDidMount(){
    try {
      let response = await axios.get('http://localhost:3000/');
      let allNews = response.data.articles;
      this.setState({
        allNews
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleSearchChange (evt) {
    this.setState({search: evt.target.value})
  }

  async handleSelectChange (selectedOption) {
    await this.setState({ selectedOption });
  }

  async handleSearchSubmit (evt) {
    evt.preventDefault();
    let options = [];
    this.state.selectedOption && this.state.selectedOption.map(option => options.push(option.value));
    let sources = options.join(', ');
    try {
      let response = await axios.get(`http://localhost:3000/api/search?q=${this.state.search}&sources=${sources}`);
      let filteredNews = response.data.articles;
      this.setState({
        filteredNews,
        filterView: true,
        // search: '',
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    let { allNews, filteredNews, filterView, selectedOption } = this.state;
 
    
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>BuzWorld</h1>
        </header>
        <form onSubmit={this.handleSearchSubmit}>
          <label>Search: </label>
          <input type="text" name="search" placeholder="Search for topics" value={this.state.search} onChange={this.handleSearchChange} />
          <button type='submit'>Go</button>
          <br />

          <Select
            value={selectedOption}
            onChange={this.handleSelectChange}
            options={options}
            isMulti={true}
          />
          <br />

        </form>       



        {!filterView && <div className='listAll'>
          {
            allNews.map((news,i) => (
              <div key={i} className='listOne'>
                <li>
                  <p>{news.title}</p>
                  <small>{news.source.name}</small>
                  <small>{news.publishedAt}</small>
                </li>
              </div>
            ))
          }
          </div>}
        {filterView && <div className='listAll'>
          {
            filteredNews.map((news,i) => (
              <div key={i} className='listOne'>
                <li>
                  <p>{news.title}</p>
                  <small>{news.source.name}</small>
                  <small>{news.publishedAt}</small>
                </li>
              </div>
            ))
          }
          </div>}

        
    </div>
    );
  }
}

export default App;
