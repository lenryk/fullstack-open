import React from "react"

function Notification({data: {message, type}}) {
    if (!message) return null

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
