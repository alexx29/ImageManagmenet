import React from "react";
import Editable from './Editable.jsx';

class Editable extends React.Component {
    constructor(props){
        super(props)
        this.groupRef = React.createRef();
    }

    state = {
        rectangles: [ ],
        selectedId: '',
        paint: false,
    }

    mapClick = e => {
        const clickedOnEmpty = e.target === e.target.getStage();
        this.onPaiting()
        if (clickedOnEmpty) {
            this.selectRectangle(null)();
        }
    }

    selectRectangle = id => () => {
        this.setState({ selectedId: id })
    }

    changeRectangles = i => newAttrs => {
        const { rectangles } = this.state;
        const rects = rectangles.slice();
        rects[i] = newAttrs;
        this.setState({ rectangles: rects })
    }

    createNewRectangles = (recData) => {
        const { rectangles } = this.state;
        this.setState({ rectangles: [...rectangles, recData] })
    }

   getRelativePointerPosition= () => {
        var transform = this.groupRef.current.getAbsoluteTransform().copy();
        transform.invert();

        var pos = this.groupRef.current.getStage().getPointerPosition();
        return transform.point(pos);
    }

    onPaiting = () => {
        this.setState(prevState => ({ paint: !prevState.paint }));
    }

    onMouseDown = (e) => {
        if((e.target === e.target.getStage())) {
          this.onPaiting()
          var pos = this.getRelativePointerPosition();
          this.createNewRectangles({
              x:pos.x,
              y:pos.y,
              width: 1,
              height: 1,
              id: Math.random() * 100
          })
        }
    }

    drawNewShape = () => {
        const { paint, rectangles } = this.state;
        if(!paint) return;
        let editedRectangle = rectangles[rectangles.length - 1]
        var pos = this.getRelativePointerPosition();
        this.changeRectangles(rectangles.length - 1)(
            editedRectangle = {
                ...editedRectangle,
                width: ( pos.x - editedRectangle.x),
                height:( pos.y - editedRectangle.y),
            }
        )
    }

    render() {
        const {
            rectangles,
            selectedId,
        } = this.state;
        return (
         <Editable
            rectangles={rectangles}
            selectedId={selectedId}
         />
        );
    }
}

export default Editable;