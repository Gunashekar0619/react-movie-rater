import React , { Component} from 'react';
import './App.css';
import MovieList from "./component/movie-list";
import MovieDetails from "./component/movie-details";
import MovieForm  from "./component/movie-form";
import { withCookies } from 'react-cookie';

class App extends Component {

  state = {
    mv:[],
    selectedMov: null,
    editedMovie: null,
    Token: this.props.cookies.get('mr-token'),
    isenabled : false
  }

  componentDidMount(){
    if(this.state.Token){
      fetch('http://127.0.0.1:8000/api/movie/',{
        method: 'GET',
        headers: {
          'Authorization' : `Token ${this.state.Token}`
        }
      }).then( resp => resp.json())    
      .then ( res => this.setState({mv:res}))
      .catch(error => console.log(error))
    } else {
      window.location.href="/";
    }
    
  }

  loadmovie = movie => {
    //console.log(movie)
    this.setState({selectedMov: movie,editedMovie :null});
    
  }
  uloadmovie = movie => {
    //console.log(movie)
    this.setState({editedMovie :null});
    
  }

  movieDeleted = selmovie => {
    const movies = this.state.mv.filter(movie => movie.id !== selmovie.id);
    this.setState({mv:movies})
    this.setState({selectedMov: null})
  }

  editClicked = selmovie => {
    this.setState({editedMovie : selmovie});
  }

  newmovie = () =>{
    this.setState({editedMovie : {title: '',description:''}});
  }

  cancelform = () =>{
    this.setState({editedMovie :null });
  }

  addmovie=movie => {
    this.setState({mv: [...this.state.mv,movie]})
    this.setState({editedMovie :null});
  }
  
  logout = () =>{
    window.location.href="/";
  }
  render(){
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <div className="layout">    
          <MovieList mv = {this.state.mv} movieClicked={this.loadmovie} newmovie={this.newmovie} 
            movieDeleted ={this.movieDeleted} editClicked={this.editClicked} token={this.state.Token}></MovieList>         
          <div>
            {!this.state.editedMovie ?(
              <MovieDetails token ={this.state.Token} movie = {this.state.selectedMov} updatemovie={this.loadmovie} ></MovieDetails>
              
            ):<MovieForm token ={this.state.Token} movie = {this.state.editedMovie} cancelform={this.cancelform} newmovie = {this.addmovie} editedmovie={this.uloadmovie}/>}
          </div>

        </div>
        <button onClick = {this.logout}>Logout </button>
      </div>
    );
  }
}

export default withCookies(App);
