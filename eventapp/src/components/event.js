import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import messageService from '../services/messages'

// styles for infocard
const useStyles = makeStyles({
    root: {
      minWidth: 275
    },
    row: {
      fontSize: 14,
    }
});

const Event = ({event, messages}) => {
    // states for message and name of individual user
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')

    // material-ui usestyles for styling
    const classes = useStyles();
    const addMessage = (e) => {
        e.preventDefault()
        const eventId = event.id
        messageService.create({eventId, name, message})
        setName('')
        setMessage('')
    }
    return (
        <div>
            <h3>{event.name.fi}</h3>
            <div>{event.short_description.fi}</div>
            <div style={{textAlign: 'center'}}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.row} color="textSecondary">
                    <b>Järjestäjä:</b> {event.provider !== null ? event.provider.fi : 'Katso lisätiedot'}
                    </Typography>
                    <Typography className={classes.row} color="textSecondary">
                    <b>Sijainti:</b> {event.location_extra_info !== null || undefined ? event.location_extra_info.fi : 'Katso lisätiedot'}
                    </Typography>
                    <Typography className={classes.row} color="textSecondary">
                    <b>Ikäraja:</b> {event.audience_min_age !== null ? event.audience_min_age : 'Ei ikärajaa'}
                    </Typography>
                    <Typography className={classes.row} color="textSecondary">
                    <b>Hinta:</b> {event.offers.map(price => {
                            if (price.is_free === false) {
                                return <span>{price.price.fi}</span>
                             } else if (price.is_free === true) {
                                return <span>Ilmainen</span>
                            } else {
                                return <span>Ei saatavilla</span>
                            }
                        })}
                    </Typography>
                    <Typography className={classes.row} color="textSecondary" gutterBottom>
                    <b>Lisätietoja:</b> {event.info_url !== null ? <a target="_blank" rel="noreferrer" href={event.info_url.fi}>Klikkaa tästä päästäksesi tapahtuman info-sivustolle</a> : null}
                    </Typography>
                </CardContent>
            </Card>
            </div>
            <div style={{textAlign: 'left'}}>
                <h3>Viestit</h3>
                <Grid container>
                    <Grid item md={2}>
                        <List>
                            {Object.keys(messages).map(id => messages[id].eventId === event.id ? 
                                <ListItem key={id} divider={true}>
                                    <ListItemText key={`${id}n`} primary={<b>{messages[id].name}: </b>} />
                                    <ListItemText  key={`${id}m`} primary={messages[id].message} />
                                </ListItem> : null
                            )}
                        </List>
                    </Grid>
                </Grid>
            </div>
            <h3 style={{textAlign: 'left'}}>Lisää viesti</h3>
            <form onSubmit={addMessage}>
                <FormGroup>
                    <FormControl>
                        <Input type="text" placeholder="Nimimerkkisi" value={name} onChange={({target}) => setName(target.value)} />
                    </FormControl>
                    <FormControl>
                        <Input type="text" placeholder="Kirjoita viestisi tähän" value={message} onChange={({target}) => setMessage(target.value)} />
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">Lisää viesti</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default Event