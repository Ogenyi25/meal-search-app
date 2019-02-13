import React, { Component } from "react";
import './Search.css'


class Search extends Component {
    state = {
        searchValue: '',

 meals: []
    };

    handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
    };

    handleSearch = () => {
        this.makeApiCall(this.state.searchValue);
    };

    makeApiCall = searchInput => {
        var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
        fetch(searchUrl)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData.meals);
                this.setState({ meals: jsonData.meals });
            });
    };
    componentDidMount(){
        this.makeApiCall("")
    }
    render() {
        return (
            <div>
                <h1>Welcome to the meal search app</h1>
                <input name="text" type="text" placeholder="Search"
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.searchValue} />
                <button onClick={this.handleSearch}>Search</button>
                {this.state.meals ? (
                    <div>
                        {this.state.meals.map((meal, index) => (
                            <div key={index}>
                                <h1>{meal.strMeal}</h1>
                                <img src={meal.strMealThumb} alt="meal-thumbnail" />
                            </div>
                        ))}
                    </div>
                ) : (
                        <p>Try searching for a meal</p>
                    )}
            </div>
        );
    }
}


export default Search;