import React, { Component } from 'react';
import './BettingSlip.css';

class BettingSlip extends Component {

    constructor(props) {
        super(props);
        this.state = { bets: [] }

        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onPlaceBet = this.onPlaceBet.bind(this);
    }

    //Nesta função colocar a que seja atualizado o valor dos "Ganhos" consoante o valor inserido
    changeAmount(e, bet) {
        var value = e.target.value;
        console.log(value);
        this.setState({
            Ganhos: value,
        });
        console.log(this.state);
    }

    onChangeAmount(e, bet) {
        const target = e.target;
        console.log(target);
        console.log(bet);
    }

    onPlaceBet() {
        this.props.onPlaceBet()
    }


    render() {

        const { bets } = this.props;

        if (!bets) {
            return (<div></div>);
        }

        return (
            <div className="event-title">

                <div className="top-bar">
                    <p className="info-par">Boletim de apostas</p>
                </div>
                {bets.map(bet => (
                    <div className="events-container shadow bettingslip">

                        <div className="row">
                            <div className="col-md-4">
                                <p className="bet-titles">Event:</p>
                            </div>
                            <div className="col-md-8 ">
                                <p className="test">{bet.name}</p>
                            </div>
                            <div className="col-md-4 ">
                                <p className="bet-titles">Bet:</p>
                            </div>
                            <div className="col-md-8 ">
                                <p className="test">{bet.bettypeName}</p>
                            </div>
                            <div className="col-md-4 ">
                                <p className="bet-titles">Odd:</p>
                            </div>
                            <div className="col-md-8 ">
                                <p className="test">{bet.odd}</p>
                            </div>
                            <div className="col-md-4 ">
                                <p className="bet-titles">Earnings:</p>
                            </div>
                            <div className="col-md-8 ">
                                <p className="test">{bet.gains + " €"}</p>
                            </div>
                            <div className="col-md-4 ">
                                <p className="bet-titles"></p>
                            </div>
                            <div className="col-md-8">
                                <div className="input-group input-group-sm">
                                    <input type="number" min="0" max="999" className="form-control" placeholder="0.00" aria-label="Amount (to the nearest dollar)" onChange={(e) => this.onChangeAmount(e, bet)} />
                                    <div className="input-group-append">
                                        <span className="input-group-text">€</span>
                                    </div>
                                </div>

                                {/* <form>
                                        <input type="number" className="bet-amount" placeholder="0.00 €" id="montante" onInput={this.changeAmount.bind(this)}></input>
                                        <button id="bet-place">Bet</button>
                                    </form> */}
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                ))}
                <div id="place-bet">
                    <button className="btn btn-info" type="submit" onClick={this.onPlaceBet}>Bet</button>
                </div>
            </div>
        );
    }
}

export default BettingSlip;