import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LeftPanelContainer from './left_panel_container';
import LeaguesLoginContainer from './form/leagues_login_container';
import LeagueShowContainer from './show/league_show_container';

class Leagues extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if(this.props.fetchInvite){
      this.props.history.push(this.props.match.url)
      this.props.fetchInvite(this.props.match.params.id);
      this.props.history.push('/leagues')
    } else if (this.props.fetchLeagues) {
      this.props.fetchLeagues().then(() =>{
        <Redirect to="/leagues" />
      });
    }
  }

  render () {
    let show;

    if(this.props.leagues !== undefined && this.props.leagues[0] !== null) {
      show = <Route path="/leagues/:leagueId" component={LeagueShowContainer} />
    } else {
      show = <div></div>
    }

    return (
    <div className="main-leagues-container">
      <div className="left-panel-container">
        <Route path="/leagues" component={LeftPanelContainer} />
      </div>
    
      <div className="center-panel">
        <Switch>
          <Route exact path="/leagues/create" component={LeaguesLoginContainer} />
          {show}
        </Switch>
      </div>
      <div className="auth-board-layout show">
        <div className="left-panel show">
          <div className="onboard-image-panel">
            <div className="content-container">
              <div>
                <video autoPlay="on" loop="on" src="https://sleepercdn.com/videos/draftboard.mp4" data-vscid="oexb3kxio"></video>
              </div>
            </div>
            <div className="title-continaer">
              <h1 className="left-panel-title">Chat Box Here!</h1>
              <p className="left-panel-description">Eventually....</p>
            </div>
          </div>
        </div>
        <div className="right-panel">
          {/* Github/linkedin and stuff */}
          <div className="social-medias">
            <div className="git">git</div>
            <div className="linkedin">in</div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Leagues;