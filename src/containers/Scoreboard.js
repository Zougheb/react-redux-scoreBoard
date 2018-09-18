import React, {Component,PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PlayerActionCreators from '../actions/player';
import Player from'../components/Player';
import Header from '../components/Header';
import AddPlayerForm from '../components/AddPlayerForm';
import PlayerDetail from '../components/PlayerDetail';


 class Scoreboard extends Component{
  static propTypes ={
    players: PropTypes.array.isRequired
  };
  
  render() {
    // extract dispatch and players from our props
    const {dispatch, players, selectedPlayerIndex} = this.props;
    // create 3 bound action creators and then invoke the bind action creators method
    // for each of the 3 action creator we defined earlier
    const addPlayer = bindActionCreators(PlayerActionCreators.addPlayer, dispatch);
    const removePlayer = bindActionCreators(PlayerActionCreators.removePlayer, dispatch);
    const updatePlayerScore = bindActionCreators(PlayerActionCreators.updatePlayerScore, dispatch) ;
    const selectPlayer = bindActionCreators(PlayerActionCreators.selectPlayer, dispatch);

    // pull out only the selected player frpm the player's array
    // if the selecter player is not -1
    let selectedPlayer;
    if (selectedPlayerIndex !== -1) {
      selectedPlayer = players[selectedPlayerIndex];
    }

    // iterate over the player and create a player component for each player
    const playerComponents = players.map((player, index) => (
      <Player
      index={index}
        name={player.name}
        score={player.score}
        key={player.name}
        updatePlayerScore ={updatePlayerScore}
        removePlayer={removePlayer}
        selectPlayer={selectPlayer}
        />
    ));
      
    return (
      <div className="scoreboard">
        <Header players={players} />
        <div className="players">
          {playerComponents}
        </div>
        <AddPlayerForm addPlayer={addPlayer} />
        <PlayerDetail selectedPlayer={selectedPlayer} />
      </div>
    );
  }
}


// mapsatetoprops will take the player state data and assign it to a prop
// value called players
const mapStateToProps = state => (
  {
    players: state.players,
    selectedPlayerIndex: state.selectedPlayerIndex
  }
);

export default connect(mapStateToProps)(Scoreboard);