import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';


const options = [
  { value: 'bloomberg', label: 'Bloomberg' },
  { value: 'business-insider', label: 'Business Insider'},
  { value: 'financial-times', label: 'Financial Times' },
  { value: 'the-economist', label: 'The Economist' },
  { value: 'the-new-york-times', label: 'The New York Times' },
  { value: 'the-wall-street-journal', label: 'The Wall Street Journal' },
];

const data = {
  labels: [],
  datasets: [
    {
      label: 'Media Interest Over Time',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};


class App extends Component {
  constructor () {
    super()
    this.state = {
      allNews:[],
      filteredNews: [],
      filterview: false,
      search: '',
      selectedOption: null,
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

  // async handleSearchSubmit (evt) {
  //   evt.preventDefault();
  //   let options = [];
  //   this.state.selectedOption && this.state.selectedOption.map(option => options.push(option.value));
  //   let sources = options.join(', ');
  //   try {
  //     let response = await axios.get(`http://localhost:3000/api/search?q=${this.state.search}&sources=${sources}`);
  //     let filteredNews = response.data.articles;
  //     this.setState({
  //       filteredNews,
  //       filterView: true,
  //       // search: '',
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  async handleSearchSubmit (evt) {
    evt.preventDefault();
    let options = [];
    this.state.selectedOption && this.state.selectedOption.map(option => options.push(option.value));
    let sources = options.join(', ');

    let now0 = new Date();
    let t0 = now0.toISOString().slice(0, 10)
   
    let now1 = new Date();
    now1.setDate(now1.getDate() - 7)
    let t1 = now1.toISOString().slice(0, 10)

    let now2 = new Date();
    now2.setDate(now2.getDate() - 14)
    let t2 = now2.toISOString().slice(0, 10)
    
    let now3 = new Date();
    now3.setDate(now3.getDate() - 21)
    let t3 = now3.toISOString().slice(0, 10)

    let now4 = new Date();
    now4.setDate(now4.getDate() - 28)
    let t4 = now4.toISOString().slice(0, 10)

    try {
      let response = await axios.get(`http://localhost:3000/api/search?q=${this.state.search}&sources=${sources}`);
      let filteredNews = response.data.articles;

      let response0 = await axios.get(`http://localhost:3000/api/search?q=${this.state.search}&sources=${sources}&from=${t1}&to=${t0}`);
      let totalResults0 = response0.data.totalResults;

      let response1 = await axios.get(`http://localhost:3000/api/search?q=${this.state.search}&sources=${sources}&from=${t2}&to=${t1}`);
      let totalResults1 = response1.data.totalResults;

      let response2 = await axios.get(`http://localhost:3000/api/search?q=${this.state.search}&sources=${sources}&from=${t3}&to=${t2}`);
      let totalResults2 = response2.data.totalResults;

      let response3 = await axios.get(`http://localhost:3000/api/search?q=${this.state.search}&sources=${sources}&from=${t4}&to=${t3}`);
      let totalResults3 = response3.data.totalResults;

      data.labels = [t3, t2, t1, t0];
      data.datasets[0].data = [totalResults3, totalResults2, totalResults1, totalResults0]

      this.setState({
        filteredNews,
        filterView: true
      })
    } catch (err) {
      console.log(err)
    }

  }

  render() {
    let { allNews, filteredNews, filterView, selectedOption} = this.state;

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
          <Line data={data} />
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
