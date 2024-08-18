const distanse = (x1, y1, x2, y2) => {
    return Math.pow((((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))), 0.5);
}

const getDir=(x1,y1,x2,y2)=>{
    return radiansToDegrees(Math.atan2(y2-y1,x2-x1));
  }