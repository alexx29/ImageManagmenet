import React from "react";
import { Stage, Layer, Group } from "react-konva";
import Rectangle from './Rectangle.jsx';

class Editable extends React.Component {
    constructor(props){
        super(props)
        this.groupRef = React.createRef();
        this.state = {
            selectedId: '',
        }
    }

    getRelativePointerPosition= () => {
        let transform = this.groupRef.current.getAbsoluteTransform().copy();
        transform.invert();

        const pos = this.groupRef.current.getStage().getPointerPosition();
        return transform.point(pos);
    };
    
    selectRectangle = id => () => {
        this.setState({ selectedId: id })
    };

    mapClick = e => {
        const { onPaiting } = this.props;
        const clickedOnEmpty = e.target === e.target.getStage();
        onPaiting();
        if (clickedOnEmpty) {
            this.selectRectangle(null)();
        }
    };

    onMouseDown = e => {
        const { createNewRectangles, onPaiting } = this.props;
        if((e.target === e.target.getStage())) {
          onPaiting();
          const pos = this.getRelativePointerPosition();
          createNewRectangles({
              x:pos.x,
              y:pos.y,
              width: 1,
              height: 1,
              id: Math.random() * 100
          })
        }
    };

    drawNewShape = () => {
        const { changeRectangles, paint, rectangles } = this.props;
        if(!paint) return;
        let editedRectangle = rectangles[rectangles.length - 1]
        var pos = this.getRelativePointerPosition();
        changeRectangles(rectangles.length - 1)(
            editedRectangle = {
                ...editedRectangle,
                width: (pos.x - editedRectangle.x),
                height: (pos.y - editedRectangle.y),
            }
        )
    }

    render() {
        const { rectangles, changeRectangles } = this.props;
        const { selectedId } = this.state;
        return (
            <Stage
              width={window.innerWidth}
              height={window.innerHeight}
              onMouseDown={this.onMouseDown}
              onMouseUp={this.mapClick}
              onMouseMove={this.drawNewShape}
            >
                <Layer>
                <Group ref={this.groupRef}>
                {rectangles.map((rect, i) => {
                  return (
                    <Rectangle
                      key={i}
                      shapeProps={rect}
                      isSelected={rect.id === selectedId}
                      onChange={changeRectangles(i)}
                      onSelect={this.selectRectangle(rect.id)}
                    />
                  );
                })}
                </Group>
              </Layer>
            </Stage>
          );
    }
}

export default Editable;