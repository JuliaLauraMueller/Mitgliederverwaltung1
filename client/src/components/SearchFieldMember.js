import React, { Component } from 'react'
import '../cssx/MemberCSS.css';
import { Container } from 'reactstrap';

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
        <style>
          @import url('https://fonts.googleapis.com/css?family=Roboto:100,300');
        </style> 
        <Container className="search-field-member">
      <form className="search-form">
        <img className="search-icon"src={require('../img/search-grey.png')} alt="Card i cap" ></img>
          <input 
            className="search-input"
            style={{background: 'none', border: 'none'}} 
            placeholder="suchen..."
            ref={input => this.search = input} // Select input element and getting it's value (suggestions)
            onChange={this.handleInputChange} 
         /> 
         <hr/>
     </form>
     </Container>
    </div>
    
   );
 };
}

export default SearchFieldMember