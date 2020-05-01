import React, { Component } from 'react';
import '../App.css';


class MovieDetails extends Component { 
      
    state = {
        highlighted: -1
    }

    highlightRated = high => evt => {
        this.setState({highlighted : high});
    }

    rateClicked = stars => evt => {
        fetch(`http://127.0.0.1:8000/api/movie/${this.props.movie.id}/rate_movie/`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : `Token ${this.props.token}`
            },
            body: JSON.stringify({stars : stars + 1})
            }).then( resp => resp.json())
            .then ( res => this.getDetails())
            .catch(error => console.log(error))    
    }

    getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movie/${this.props.movie.id}/`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : `Token ${this.props.token}`
            }
            }).then( resp => resp.json())
            .then ( res => this.props.updatemovie(res))
            .catch(error => console.log(error))
    }

    render() {  
        const movie = this.props.movie
        return (            
            <React.Fragment>
                {
                    movie ? (                                                    
                        <div className="ui card">
                            <div className="content">
                                <h3 >{movie.title}</h3>                            
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className = {this.props.movie.avg_ratings > 0 ? 'gold' : 'black'} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" ></path></svg>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className = {this.props.movie.avg_ratings > 1 ? 'gold' : 'black'} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" ></path></svg>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className = {this.props.movie.avg_ratings > 2 ? 'gold' : 'black'} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" ></path></svg>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className = {this.props.movie.avg_ratings > 3 ? 'gold' : 'black'} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" ></path></svg>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className = {this.props.movie.avg_ratings > 4 ? 'gold' : 'black'} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" ></path></svg>   
                                ({movie.no_of_ratings})
                                <p>{movie.description}</p> 
                            </div>

                            <div className="rate-container">
                                <h2>rate it</h2>
                                { [...Array(5)].map((e,i) => {
                                    return <svg key={i} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className = {this.state.highlighted > i -1 ? 'purple' : 'black'} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" 
                                    onMouseEnter={this.highlightRated(i)} onMouseLeave={this.highlightRated()} onClick = {this.rateClicked(i)} ></path></svg>
                                })}
                            </div>
                        </div>                    
                    ) : null }
            </React.Fragment>
        )
    }    
}

export default MovieDetails;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         