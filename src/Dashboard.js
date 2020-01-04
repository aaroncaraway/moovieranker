import React from "react";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            movies: [],
        };
    }

    componentDidMount() {
        this.getData();
    }

    favorite(movie){
        console.log('favorite!', movie)
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
        return (
            <div>
                <h2> 2019 Movies </h2>
                {movies.map(movie => {
                    return (
                        <div key={movie.title} onClick={(e) => this.favorite(movie.title)}>{movie.title}</div>
                    )
                })}
            </div>
        )
    }

}

export default Dashboard;