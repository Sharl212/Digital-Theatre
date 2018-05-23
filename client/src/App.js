import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import './javascripts/player';
// import './javascripts/playerFunctions';
// import './javascripts/socket.io';
// import './javascripts/playerCommands';
import $ from 'jquery';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className="alert alert-warning col-12" role="alert">
          </div><br />
          <div className='row col-12'>
            <input className='form-control col-3' type='text' id='link' placeholder="video id.." />
            <button className='btn btn-primary col-3' id='sendVid' onclick='onYouTubeIframeAPIReady()'>Import video</button>
            <div id="count" className='col-6'></div>
          </div>

          <div className='layer'>
            <div id="player"></div>
          </div>
          <div className="progress">
            <div className="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <span className="sr-only"></span>
            </div>
          </div>
          <div className="alert alert-success" id='VideosBeingPlayed' role="alert"></div>
          <input className="range-progress-bar" role="progressbar" type='range' value="0" style={{width:1080 + 'px'}} />

          <div className='controls col-12'>
            <div className='row'>
              <button className='btn btn-success' onclick='Play()'>Play</button>
              <button className='btn btn-danger' onclick='Pause()'>Pause</button>
              <button className='btn btn-warning' onclick='Mute()'>Mute</button>
              <button className='btn' onclick='unMute()'>unMute</button>
              <input id="duration" type='text' readonly />
              <input id="time" type='text' readonly />
              <div className='col-12'>
                <input className="setVolume col-3" role="progressbar" type='range' value="0" style={{ width: 1080 + 'px' }} />
                <input id="vol" type='number' readonly />
                <p>Volume 1 - 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
