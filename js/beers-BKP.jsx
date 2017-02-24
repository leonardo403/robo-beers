class ProductCategoryRow extends React.Component {
  render() {
    return (<div><p>this.props.category}</p></div>);
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.name ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <div className="content">
        <h1>{name}</h1>                        
      </div>
    );
  }
}


class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    console.log(this.props.inStockOnly)
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (      
      <section id="beers">
            <div className="columns is-desktop">
                <div className="column">
                    <figure className="image is-3by2">
                        <img src="" alt="Image"/>
                    </figure>
                    <div className="content">
                        <h1>{rows}</h1>                        
                    </div>
                </div>                               
            </div> 
        </section>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }
  
  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }
  
  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }
  
  render() {
    return (
      <section id="busca" className="columns is-mobile">
            <article className="column is-12">
                <form>
                    <div className="control is-grouped">
                        <p className="control is-expanded">
                          <input
                            className="input"
                            type="text"
                            placeholder="Search about Beers"
                            value={this.props.filterText}
                            onChange={this.handleFilterTextInputChange}
                          />                    
                        </p>
                        <p className="control">
                            <a className="button is-info">
                            Search
                            </a>
                        </p>
                    </div>
                </form>
            </article>
        </section>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleInStockInput = this.handleInStockInput.bind(this);
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockInput(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('app')
);
