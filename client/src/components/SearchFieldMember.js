import React, { Component } from 'react'

class SearchFieldMember extends Component {
 state = {
   query: '',
 }

 handleInputChange = () => {
   this.setState({
     query: this.search.value
   })
 }

 render() {
   return (
    <div>
      <div className="search-field">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Roboto:100,300');
        </style> 
      <form>
       <input className="search-input"
        style={{background: 'none', border: 'none'}} 
        placeholder="suchen..."
         ref={input => this.search = input} // Select input element and getting it's value (suggestions)
         onChange={this.handleInputChange}
       />
       <p>{this.state.query}</p>
     </form>
     </div>
    <hr/>
    
    </div>
   );
 };
}

export default SearchFieldMember