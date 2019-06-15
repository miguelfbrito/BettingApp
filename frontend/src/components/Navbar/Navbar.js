import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

import UserHandler from '../utils/userHandler';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = { user: {} }
    }

    componentDidMount() {

        const userData = UserHandler.get();
        this.setState({ user: userData });
    }


    render() {
        //Fazer um counter para passar o número de bets abertas

        const { user } = this.state;

        if (!user) {
            return (
                <nav className="navbar navbar-expand-md bg-faded">
                    <div className="container navbar-container">
                        <a className="navbar-brand" href="#">Bet</a>
                        <div className="collapse navbar-collapse " id="navbarText">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active"> <Link to="/events"> <span className="nav-link" href="#">Events</span> </Link> </li>
                                <li className="nav-item active"> <Link to="/bets"> <span className="nav-link" href="#">Bets</span> </Link> </li>
                                <li className="nav-item"> <Link to="/user"> <span className="nav-link" href="#">Welcome"</span> </Link> </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }

        console.log("PRINT USER", user)

        return (
            <nav className="navbar navbar-expand-md bg-faded">
                <div className="container navbar-container">
                    <a className="navbar-brand" href="#">Bet</a>
                    <div className="collapse navbar-collapse " id="navbarText">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"> <Link to="/events"> <span className="nav-link" href="#">Events</span> </Link> </li>
                            <li className="nav-item active"> <Link to="/bets"> <span className="nav-link" href="#">Bets</span> </Link> </li>
                            <li className="nav-item"> <Link to="/user"> <span className="nav-link" href="#">Welcome, {user.username + "(" + user.balance + "€)"}</span> </Link> </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;