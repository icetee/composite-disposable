# composite-disposable

This is a simple library for implementing event subscription APIs.
Inspired https://github.com/atom/event-kit. Use default event handler in Node.js.

## Implementing Event Composite-Disposable Subscription APIs

```javascript
const { EventEmitter } = require('events');
const { CompositeDisposable } = require('composite-disposable');


class User {
  constructor() {
    this.emitter = new EventEmitter();
    this.subscriptions = new CompositeDisposable();
  }

  onDidChangeName(callback) {
    this.subscriptions.add(this.emitter.on('change-name', callback));
  }

  setName(name) {
    if (this.name !== name) {
      this.name = name;
      this.emitter.emit('change-name', this.name);
    }

    return this.name;
  }

  destroy() {
    this.subscriptions.dispose();
  }
}
```

In the example above, we implement `::onDidChangeName` on the user object, which will register callbacks to be invoked whenever the user's name changes. To do so, we make use of an internal `EventEmitter` instance. We use `::on` to subscribe the given callback in `::onDidChangeName`, and `::emit` in `::setName` to notify subscribers. Finally, when the User instance is destroyed we call `::dispose` on the emitter to unsubscribe all subscribers.
