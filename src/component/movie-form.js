import React, { Component } from 'react';

class MovieForm extends Component {

    state ={
        editedmovie : this.props.movie,
    }

    cancelClicked = () =>{
        this.props.cancelform();
    }

    inputchanged = event => {
        let movi = this.state.editedmovie;
        movi[event.target.name] = event.target.value;
        this.setState({editedmovie: movi})
    }

    saveclicked = () => {
        fetch('http://127.0.0.1:8000/api/movie/',{
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization' : `Token ${this.props.token}`
        },
        body : JSON.stringify(this.state.editedmovie)
        }).then( resp => resp.json())
        .then ( res => this.props.newmovie(res))
        .catch(error => console.log(error))
    }

    updateclicked = () =>{
        fetch(`${process.env.REACT_APP_URL}/api/movie/${this.props.movie.id}/`,{
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization' : `Token ${this.props.token}`
        },
        body : JSON.stringify(this.state.editedmovie)
        }).then( resp => resp.json())
        .then ( res => this.props.editedmovie(res))
        .catch(error => console.log(error))
    }

    render() {    
        const isDisabled = this.state.editedmovie.title.length === 0 ||
                            this.state.editedmovie.description.length === 0;    
        return (
            <React.Fragment>
                <span>Title</span><br/>
                <input name = "title" type = "text" value={this.props.movie.title} onChange={this.inputchanged}/><br/>
                <span>Description</span><br/>
                <textarea name = "description" value={this.props.movie.description} onChange={this.inputchanged}/><br/>
                {this.props.movie.id ? <button disabled={isDisabled} onClick = {this.updateclicked}>udpate
                                                            {console.log(this.props.movie.id)} </button> :
                                            <button disabled={isDisabled} onClick = {this.saveclicked}>Save</button> } &nbsp;
                <button onClick={this.cancelClicked}>Cancel</button>
            </React.Fragment>
        )
    }
}

export default MovieForm;