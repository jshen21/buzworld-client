import React, { Component } from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
// import { Select, Trigger, OptionList, Option, utils } from 'Selectly'
// const { getToggledValues } = utils

class App extends Component {
  constructor () {
    super()
    this.state = {
      allNews:[],
      filteredNews: [],
      filterview: false,
      search: '',
      // defaultSelectedSource: 'Select the ones you trust',
      // selectedSources: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleSelect = this.handleSelect.bind(this)
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

  handleChange (evt) {
    this.setState({search: evt.target.value})
  }

  async handleSubmit (evt) {
    evt.preventDefault();
    try {
      let response = await axios.get(`http://localhost:3000/api/search?q=${this.state.search}`);
      let filteredNews = response.data.articles;
      this.setState({
        filteredNews,
        filterView: true,
        search: ''
      })
    } catch (err) {
      console.log(err)
    }
  }

  // handleSelect(value) {
  //   this.setState({
  //     selectedSources: getToggledValues(this.state.selectedSources, value)
  //   })
  // }

  render() {
    let { allNews, filteredNews, filterView, } = this.state;
    // defaultSelectedSource, selectedSources
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>BuzWorld</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="search" placeholder="Search for topics" value={this.state.search} onChange={this.handleChange} />
            <button type='submit'>Go</button>
          </form>       
        </header>



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

        {/* <Select
        multiple
        onChange={value => this.handleSelect(value)}
      >
        <Trigger>
          { selectedSources.length > 0
            ? selectedSources.join(', ')
            : defaultSelectedSource
          }
        </Trigger>
        <OptionList tag="ul" className="select-menu">
          <Option value="blp">Bloomberg</Option>
          <Option value="wsj">The Wall Street Journal</Option>
          <Option value="ft">Finantial Times</Option>
        </OptionList>
      </Select> */}
    </div>
    );
  }
}

export default App;
