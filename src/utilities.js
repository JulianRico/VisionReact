const LabelMap = {
    1:{name:'arma 1', color:'yellow'},
    2:{name:'arma 2', color:'yellow'},
    3:{name:'arma 3', color:'yellow'},
    4:{name:'arma 4', color:'yellow'},
    5:{name:'arma 5', color:'yellow'}
}

//draw function

export const drawRect = (boxes,classes,score,threshold,imWitdh, imHeight,ctx,video) =>{

for(let i=0; i<boxes.length; i++){
 if(boxes[i] && classes[i] && score[i]>threshold){

    const [y,x,height,width] = boxes[i]

    const text = classes[i]

    const xi = x*imWitdh
    const yi = y*imHeight
    const xf = (width*imWitdh)-(x*imWitdh)
    const yf = (height*imHeight) -( y*imHeight)

    ctx.strokeStyle = LabelMap[text]['color']
    ctx.lineWidth = 2
    ctx.fillStyle= 'white'
    ctx.font = '30px Arial'

    //draw
    ctx.beginPath()
    ctx.fillText(LabelMap[text]['name' + '-' + Math.round(score[i]*100 + '%', x*imWitdh, y*imHeight-10)])
    ctx.rect(xi,yi,xf,yf)
    ctx.stroke()
 }

}


}