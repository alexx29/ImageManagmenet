import React from "react";
import { Stage, Layer, Group } from "react-konva";
import Rectangle from './Rectangle.jsx';

class Editable extends React.Component {
    constructor(props) {
        super(props)
        this.groupRef = React.createRef();
        this.state = {
            selectedId: '',
        };
    }

    getRelativePointerPosition= () => {
        const node = this.groupRef.current;
        let transform = node.getAbsoluteTransform().copy();
        transform.invert();

        const pos = node.getStage().getPointerPosition();
        return transform.point(pos);
    };
    
    selectRectangle = id => () => {
        const { onPaiting } = this.props;
        onPaiting(false);
        this.setState({ selectedId: id })
    };

    onMouseUp = e => {
        const { onPaiting, paint } = this.props;
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty && paint) {
           return this.selectRectangle(null)();
        }

        return onPaiting(false);
    };

    onMouseDown = e => {
        const { createNewRectangles, onPaiting } = this.props;
        if((e.target === e.target.getStage())) {
          this.selectRectangle(null)();
          onPaiting(true);
          const pos = this.getRelativePointerPosition();
          createNewRectangles({
              x:pos.x,
              y:pos.y,
              width: 0,
              height: 0,
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
              onMouseUp={this.onMouseUp}
              onMouseMove={this.drawNewShape}
            >
                <Layer key="layer">
                <Group key="group" ref={this.groupRef}>
                {rectangles.map((rect, i) => {
                  return (
                    <Rectangle
                      key={rect.id}
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