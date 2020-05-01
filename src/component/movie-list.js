import React from 'react';

function MovieList(props) {
   
    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    };

    const editClicked = movie =>  {
        props.editClicked(movie);
    }

    const newmovie = () =>{
        props.newmovie();
    }

    const removeClicked = movie =>  {
        fetch(`http://127.0.0.1:8000/api/movie/${movie.id}/`,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : `Token ${props.token}`
            }
            }).then ( res => props.movieDeleted)
            
            .catch(error => console.log(error))
        };
        
    return (
        <div>
            { props.mv.map(movie => {
                return ( 
                    <div key={movie.id}  className ="movie-item">    
                        <h3 onClick={movieClicked(movie)}>
                            {movie.title}                            
                        </h3>                        
                        <svg onClick={() => removeClicked(movie)} width="30" height="30" viewBox="0 0 24 24"><path d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"/></svg>
                        <svg onClick={() => editClicked(movie)} width="30" height="30" viewBox="0 0 24 24"><path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"/></svg>                    
                    </div>
                )
            })
            }
            <button onClick={newmovie} >new movie</button>
        </div>        
    )
}

export default MovieList;