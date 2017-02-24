class BeerLister extends React.Component {
	constructor(props) {
  	super(props)
 		 this.state = { beers: [] }
  }
  //before that render 
  componentWillMount(){
  	fetch('https://api.brewerydb.com/v2/beers?key=b537449a62111b7f2bd949f8b95c696c&format=json')
 		.then((response) => {
      return response.json()      
     })
     .then((beers) => {
      this.setState({ beers: beers })
     })
    //.then(result=>result.json())
    //.then(items=>this.setState({items}))    
  }

  render() {
    if (this.state.beers) {
      return (
        <div className="columns">
          <p> {this.state.beers.beers}</p>
        </div>
      )
    } else {
      return <p className="text-center">Loading beers... </p>
    }
  } 

}

ReactDOM.render(
  <BeerLister />,
  document.getElementById('app')
);