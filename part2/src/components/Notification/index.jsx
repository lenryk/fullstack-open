import React from "react"

function Notification({data}) {
    if (!data?.message) return null
    const {message, type} = data

    const styles = {
        color: type,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        maxWidth: 'max-content'
    }

    return (
        <div style={styles}>
            {message}
        </div>
    )
}

export default Notification
