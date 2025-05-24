socket.emit : ony client get this (client will create this event)

socket.broadcast.emit: everyone other then client will get this (so client have creted this event, but him self want recieve it)
io.emit: client will also recieve this

    socket.broadcast vs io.emit
    cient want get theier own message where in io.emit client can also see their own message
