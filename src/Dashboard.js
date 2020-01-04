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
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
        this.clearFavorites = this.clearFavorites.bind(this);
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

    clearFavorites() {
        this.setState({ favorites: [] })
    }

    upvote(movie){
        this.setState(prevState => {
            let favorites = [...prevState.favorites]
            let oldindex = favorites.indexOf(movie)
            let swappingwith = favorites[oldindex - 1] || favorites[oldindex]
            favorites[oldindex] = swappingwith
            favorites[oldindex - 1] = movie
            return { favorites };
        })
    }

    downvote(movie){
        this.setState(prevState => {
            let favorites = [...prevState.favorites]
            let oldindex = favorites.indexOf(movie)
            let swappingwith; 
            if (oldindex !== favorites.length - 1) {
                swappingwith = favorites[oldindex + 1]
                favorites[oldindex] = swappingwith
                favorites[oldindex + 1] = movie
            } else {
                swappingwith = favorites[oldindex]
            }

            return { favorites };
        })
    }

    getData() {
        fetch("https://raw.githubusercontent.com/aaroncaraway/data/master/2019moviesALL.json")
          .then(response => {
            return response.json();
          })
          .then(data => {
            this.setState({ movies: data });
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
                <h3> My Favorites <span onClick={(e) => this.clearFavorites()}> R </span></h3>
                
                {favorites.length === 0 ? ( 
                    <div className="movie"> Click title below to add to favorites </div>
                ) : (
                favorites.map((fav, i) => {
                    return(
                        <div className="movie" key={fav}>
                            <span>{i+1})</span>
                            <span>{fav}</span>
                            <span onClick={(e) => this.removeFromFavorites(fav)}> R </span>
                            <span onClick={(e) => this.upvote(fav)}> UP </span>
                            <span onClick={(e) => this.downvote(fav)}> DOWN </span>
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