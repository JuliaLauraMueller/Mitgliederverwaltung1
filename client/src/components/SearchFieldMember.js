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
     <div className="search-field">
     <form>
       <input 
        placeholder="Search"
         ref={input => this.search = input} // Select input element and getting it's value (suggestions)
         onChange={this.handleInputChange}
       />
       <p>{this.state.query}</p>
     </form>
     </div>
   );
 };
}

export default SearchFieldMember