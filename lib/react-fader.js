'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Fader = (function (_Component) {
  _inherits(Fader, _Component);

  _createClass(Fader, null, [{
    key: 'propTypes',
    value: {
      valInit: _react2['default'].PropTypes.number,
      handleChange: _react2['default'].PropTypes.func
    },
    enumerable: true
  }]);

  function Fader(props) {
    var _this = this;

    _classCallCheck(this, Fader);

    _get(Object.getPrototypeOf(Fader.prototype), 'constructor', this).call(this, props);

    this.handleDownHandle = function (ev) {
      ev.preventDefault();
      ev = !!ev.touches ? ev.touches[0] : ev;

      var _calcMax = _this.calcMax();

      var _calcMax2 = _slicedToArray(_calcMax, 2);

      var maxL = _calcMax2[0];
      var maxR = _calcMax2[1];

      _this.setState({
        doDrag: true,
        mousePosStartX: ev.clientX,
        offsetX: _this.state.translateX,
        maxLeft: maxL,
        maxRight: maxR
      });
    };

    this.handleResize = function (ev) {
      _this.setState({
        fullWidth: elWidth(_this.refs.container),
        translateX: _this.calcPosByVal()
      });
    };

    this.handleUpHandle = function (ev) {
      _this.setState({ doDrag: false });
    };

    this.handleMouseMove = function (ev) {
      ev = !!ev.touches ? ev.touches[0] : ev;
      if (_this.state.doDrag) {
        var s = _this.state;
        var newTranslateX = s.offsetX + (ev.clientX - s.mousePosStartX);
        if (newTranslateX < s.maxLeft) newTranslateX = s.maxLeft;
        if (newTranslateX > s.maxRight) newTranslateX = s.maxRight;
        var newVal = _this.calcValByPos(newTranslateX);
        _this.setState({
          translateX: newTranslateX,
          val: newVal
        });
        if (_this.props.handleChange) _this.props.handleChange(newVal);
      }
    };

    this.state = {
      doDrag: false,
      mousePosStartX: 0,
      translateX: 0,
      offsetX: 0,
      maxLeft: 0,
      maxRight: 0,
      fullWidth: 0,
      val: parseFloat(props.valInit) || 0
    };
  }

  _createClass(Fader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
  }, {
    key: 'calcPosByVal',
    value: function calcPosByVal() {
      var val = arguments.length <= 0 || arguments[0] === undefined ? this.state.val : arguments[0];

      return (elWidth(this.refs.container) - this.refs.handle.getBBox().width) * val;
    }
  }, {
    key: 'calcValByPos',
    value: function calcValByPos(newX) {
      return newX / (elWidth(this.refs.container) - this.refs.handle.getBBox().width);
    }
  }, {
    key: 'calcMax',
    value: function calcMax() {
      var r = this.refs;
      var left = 0;
      var right = r.container.clientWidth - r.handle.getBBox().width;
      return [left, right];
    }
  }, {
    key: 'render',
    value: function render() {
      var _stylesHandle = Object.assign({}, stylesHandle, { transform: 'translate(' + this.state.translateX + 'px)' });
      return _react2['default'].createElement(
        'svg',
        { ref: 'container', style: stylesSVG, xmlns: 'http://www.w3.org/2000/svg' },
        _react2['default'].createElement('line', { x1: '0', y1: '10', x2: this.state.fullWidth, y2: '10', stroke: 'black', strokeDasharray: '3, 5', strokeWidth: '1' }),
        _react2['default'].createElement('rect', { ref: 'handle',
          style: _stylesHandle,
          onMouseDown: this.handleDownHandle,
          onTouchStart: this.handleDownHandle,
          width: '20', height: '20', strokeWidth: '0'
        })
      );
    }
  }]);

  return Fader;
})(_react.Component);

var elWidth = function elWidth(el) {
  return Math.floor(el.getBoundingClientRect().width);
};

var stylesHandle = {
  cursor: 'ew-resize',
  fill: 'grey',
  stroke: 'black'
};

var stylesSVG = {
  height: '20px',
  width: '100%'
};

exports['default'] = Fader;
module.exports = exports['default'];
