import React from "react";
import Editable from './Editable.jsx';

class EditableContainer extends React.Component {
    state = {
        rectangles: [ ],
        paint: false,
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

    onPaiting = () => {
        this.setState(prevState => ({ paint: !prevState.paint }));
    }

    render() {
        const {
            rectangles,
            paint,
        } = this.state;
        return (
            <Editable
               rectangles={rectangles}
               changeRectangles={this.changeRectangles}
               createNewRectangles={this.createNewRectangles}
               onPaiting={this.onPaiting}
               paint={paint}
            />
        );
    }
}

export default EditableContainer;