import React from "react";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            movies: [],
        };
        this.saveFavorites = this.saveFavorites.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.saveFavorites)
        let favs = JSON.parse(localStorage.getItem('myFavorites')) || []
        this.setState({ favorites: favs })
        this.getData();
    }

    componentWillUnmount() {
        this.saveFavorites()
        window.removeEventListener('beforeunload', this.saveFavorites)
    }

    saveFavorites() {
        console.log('saving favorites!')
        localStorage.setItem('myFavorites', JSON.stringify(this.state.favorites))
    }

    addToFavorites(movie, e){
        if (this.state.favorites.includes(movie)) {
            this.removeFromFavorites(movie)
            e.target.style.color = 'black'
        } else {
            e.preventDefault();
            e.target.style.color = 'green'
            this.setState({ favorites: [...this.state.favorites, movie] })
        }
    }

    removeFromFavorites(movie){
        this.setState({ favorites: [...this.state.favorites.filter(favorite => favorite !== movie)]})
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
                favorites.map((fav, i) => {
                    return(
                        <div className="movie" key={fav}>
                            <span>{i+1})</span>
                            <span>{fav}</span>
                            <span onClick={(e) => this.removeFromFavorites(fav)}> R </span>
                        </div>
                    )
                })
                )
                }

                <h3> All Movies</h3>
                {movies.map(movie => {
                    return (
                        <div className="movie" key={movie.title} onClick={(e) => this.addToFavorites(movie.title, e)}>
                            <span>{movie.title}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default Dashboard;