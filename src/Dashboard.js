import React from "react";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            movies: [],
        };
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    addToFavorites(movie){
        if (this.state.favorites.includes(movie)) {
            alert('already added!')
        } else {
            this.setState({ favorites: [...this.state.favorites, movie] })
        }
        

    }

    getData() {
        fetch("https://raw.githubusercontent.com/aaroncaraway/data/master/2019moviesALL.json")
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({ movies: data });
            console.log('getting here', data)
          })
          .catch(err => {
            console.log("Error Reading data " + err);
          });
      }

    render() {
        const movies = this.state.movies;
        const favorites = this.state.favorites;
        return (
            <div className="main">
                <h2> 2019 Movies </h2>
                <h3> My Favorites </h3>
                
                {favorites.length === 0 ? ( 
                    <div className="movie"> Click title below to add to favorites </div>
                ) : (
                favorites.map(fav => {
                    return(
                        <div className="movie" key={fav}>{fav}</div>
                    )
                })
                )
                }

                <h3> All Movies</h3>
                {movies.map(movie => {
                    return (
                        <div className="movie" key={movie.title} onClick={(e) => this.addToFavorites(movie.title)}>{movie.title}</div>
                    )
                })}
            </div>
        )
    }

}

export default Dashboard;