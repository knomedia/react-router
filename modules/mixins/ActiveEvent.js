var React = require('react');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

/**
 * A mixin for components that emit active state change events.
 * <Routes> components use this mixin to notify descendant <Link>s
 * when the active state changes.
 */
var ActiveEvent = {

  propTypes: {
    maxActiveChangeListeners: React.PropTypes.number.isRequired
  },

  getDefaultProps: function () {
    return {
      maxActiveChangeListeners: 0
    };
  },

  componentWillMount: function () {
    this._events = new EventEmitter;
    this._events.setMaxListeners(this.props.maxActiveChangeListeners);
  },

  componentWillReceiveProps: function (nextProps) {
    this._events.setMaxListeners(nextProps.maxActiveChangeListeners);
  },

  componentWillUnmount: function () {
    this._events.removeAllListeners();
  },

  addActiveChangeListener: function (listener) {
    this._events.addListener(CHANGE_EVENT, listener);
  },

  removeActiveChangeListener: function (listener) {
    this._events.removeListener(CHANGE_EVENT, listener);
  },

  emitActiveChange: function () {
    this._events.emit(CHANGE_EVENT);
  }

};

module.exports = ActiveEvent;
