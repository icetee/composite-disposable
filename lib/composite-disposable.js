const Disposable = require('./disposable');

const checkDisposable = (disposable) => {
  if (disposable instanceof Disposable) return disposable;

  return new Disposable(disposable);
};

module.exports = class CompositeDisposable {
  constructor(...args) {
    this.disposed = false;
    this.disposables = new Set();
    for (let i = 0, len = args.length; i < len; i++) {
      this.add(args[i]);
    }
  }

  add(...args) {
    let disposable = null;
    if (!this.disposed) {
      for (let i = 0, len = args.length; i < len; i += 1) {
        disposable = checkDisposable(args[i]);
        this.disposables.add(disposable);
      }
    }
  }

  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      this.disposables.forEach(disposable => disposable.dispose());
      this.disposables = null;
    }
  }

  remove(disposable) {
    if (!this.disposed) {
      this.disposables.delete(disposable);
    }
  }

  clear() {
    if (!this.disposed) {
      this.disposables.clear();
    }
  }

  delete(disposable) {
    this.remove(disposable);
  }
};
