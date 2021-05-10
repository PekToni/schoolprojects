import './App.css';
import React, {useState, useEffect} from 'react'
import {Switch, Route, useRouteMatch, Link} from 'react-router-dom'
import Events from './components/events'
import Event from './components/event'
import axios from 'axios'
import {AppBar, Toolbar, Button} from '@material-ui/core'
import messageService from './services/messages'


function App() {
  const [events, setEvents] = useState([])
  const [messagesH, setMessagesH] = useState({})

  // data for events from api
  useEffect(() => {
    axios
      .get('https://api.hel.fi/linkedevents/v1/event/?end=today&format=json&start=now')
      .then(res => {
        setEvents(res.data.data)
      })
  }, [])

  // all the messages from firebase
  useEffect(() => {
    messageService.getAll().on('value', snapshot => {
      if(snapshot.val() !== null) {
        setMessagesH({...snapshot.val()})
      }
    })
  }, [])

  // matching data of event based on address bar address
  const match = useRouteMatch('/events/:id')
  const event = match ? events.find(event => event.id === match.params.id) : null

  // switch the view based on route
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Tapahtumat
          </Button>
        </Toolbar>
      </AppBar>
      <h1>Helsingin tapahtumat</h1>
      <Switch>
        <Route path="/events/:id">
          <Event event={event} messages={messagesH} />
        </Route>
        <Route path="/">
          <Events events={events}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
