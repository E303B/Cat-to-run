const degreesToRadians = function(degrees){
    return (degrees % 360) * (Math.PI / 180);
}

const radiansToDegrees = function(radians){
    return (radians% Math.PI) * (180 / Math.PI)
}