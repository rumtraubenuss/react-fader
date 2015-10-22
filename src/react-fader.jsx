import React, { Component } from 'react';

class Fader extends Component {

  static propTypes = {
    valInit: React.PropTypes.number,
    handleChange: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      doDrag: false,
      mousePosStartX: 0,
      translateX: 0,
      offsetX: 0,
      maxLeft: 0,
      maxRight: 0,
      fullWidth: 0,
      val: parseFloat(props.valInit) || 0
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('touchmove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleUpHandle);
    document.addEventListener('touchend', this.handleUpHandle);
    window.addEventListener('resize', this.handleResize);
    this.setState({
      fullWidth: elWidth(this.refs.container),
      translateX: this.calcPosByVal()
    });
  }

  calcPosByVal(val = this.state.val) {
    return (elWidth(this.refs.container) - this.refs.handle.getBBox().width) * val;
  }

  calcValByPos(newX) {
    return newX / (elWidth(this.refs.container) - this.refs.handle.getBBox().width);
  }

  calcMax() {
    const r = this.refs;
    const left = 0;
    const right = r.container.clientWidth - r.handle.getBBox().width;
    return [left, right];
  }

  handleDownHandle = (ev) => {
    ev.preventDefault();
    ev = !!ev.touches ? ev.touches[0] : ev;
    const [maxL, maxR] = this.calcMax();
    this.setState({
      doDrag: true,
      mousePosStartX: ev.clientX,
      offsetX: this.state.translateX,
      maxLeft: maxL,
      maxRight: maxR
    });
  }

  handleResize = (ev) => {
    this.setState({
      fullWidth: elWidth(this.refs.container),
      translateX: this.calcPosByVal()
    });
  }

  handleUpHandle = (ev) => {
    this.setState({doDrag: false});
  }

  handleMouseMove = (ev) => {
    ev = !!ev.touches ? ev.touches[0] : ev;
    if(this.state.doDrag) {
      const s = this.state;
      let newTranslateX = s.offsetX + (ev.clientX - s.mousePosStartX);
      if(newTranslateX < s.maxLeft) newTranslateX = s.maxLeft;
      if(newTranslateX > s.maxRight) newTranslateX = s.maxRight;
      const newVal = this.calcValByPos(newTranslateX);
      this.setState({
        translateX: newTranslateX,
        val: newVal
      });
      if(this.props.handleChange) this.props.handleChange(newVal);
    }
  }

  render() {
    const _stylesHandle = Object.assign({}, stylesHandle, {transform: `translate(${this.state.translateX}px)`});
    return (
      <svg ref="container" style={stylesSVG} xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="10" x2={this.state.fullWidth} y2="10" stroke="black" strokeDasharray="3, 5" strokeWidth="1"/>
        <rect ref="handle"
          style={_stylesHandle}
          onMouseDown={this.handleDownHandle}
          onTouchStart={this.handleDownHandle}
          width="20" height="20" strokeWidth="0"
        />
      </svg>
    );
  }

}

const elWidth = el => Math.floor(el.getBoundingClientRect().width);

const stylesHandle = {
  cursor: 'ew-resize',
  fill: 'grey',
  stroke: 'black'
};

const stylesSVG = {
  height: '20px',
  width: '100%'
};

export default Fader;
