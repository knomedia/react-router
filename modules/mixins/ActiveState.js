var invariant = require('react/lib/invariant');
var ActiveDelegate = require('./ActiveDelegate');

/**
 * A mixin for components that need to know about the routes, params,
 * and query that are currently active. Components that use it get two
 * things:
 *
 *   1. An `updateActiveState` method that is called when the
 *      active state changes.
 *   2. An `isActive` method they can use to check if a route,
 *      params, and query are active.
 *
 *
 * Example:
 *
 *   var Tab = React.createClass({
 *     
 *     mixins: [ Router.ActiveState ],
 *
 *     getInitialState: function () {
 *       return {
 *         isActive: false
 *       };
 *     },
 *   
 *     updateActiveState: function () {
 *       this.setState({
 *         isActive: this.isActive(routeName, params, query)
 *       })
 *     }
 *   
 *   });
 */
var ActiveState = {

  /**
   * Returns the component that serves as the active delegate for
   * this component.
   */
  getActiveDelegate: function () {
    var delegate = this._owner;

    // with (evilGrin) { eval('mwuuaaahahahahaha!') }
    while (delegate != null && typeof delegate.isActive !== 'function')
      delegate = delegate._owner;

    invariant(
      delegate,
      'ActiveState component must be owned by an ActiveDelegate'
    );

    return delegate;
  },

  /**
   * Returns true if the route with the given name, URL parameters, and
   * query are all currently active.
   */
  isActive: function (routeName, params, query) {
    return this.getActiveDelegate().isActive(routeName, params, query);
  },

  componentDidMount: function () {
    this.getActiveDelegate().addActiveChangeListener(this.handleActiveStateChange);
    this.handleActiveStateChange();
  },

  componentWillUnmount: function () {
    this.getActiveDelegate().removeActiveChangeListener(this.handleActiveStateChange);
  },

  handleActiveStateChange: function () {
    if (this.isMounted() && typeof this.updateActiveState === 'function')
      this.updateActiveState();
  }

};

module.exports = ActiveState;
