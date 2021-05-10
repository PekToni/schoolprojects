import React from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import MaterialTable from 'material-table'


const Events = ({events}) => {
    // Columns for material-table
    const columns = [
        {title: 'Tapahtuman nimi', field: 'name.fi', render: rowData => <Link to={`/events/${rowData.id}`}>{rowData.name.fi}</Link>},
        {title: 'Tapahtuman sivusto', field: 'info_url.fi', render: rowData => rowData.info_url !== null ? <a target="_blank" rel="noreferrer" href={rowData.info_url.fi}>Klikkaa tästä tapahtuman sivustolle</a> : null},
        {title: 'Ajankohta', field: 'start_time', render: rowData => <Moment format="DD/MM/YYYY hh:mm a">{rowData.start_time}</Moment>}
    ]
    return (
        <div>
            <MaterialTable 
                columns={columns}
                data={events}
                title='Tarkemmat tiedot klikkaamalla tapahtuman nimeä!'
            />
        </div>
    )
}

export default Events