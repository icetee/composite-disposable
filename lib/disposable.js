module.exports = class Disposable {
  constructor(disposalAction) {
    this.disposed = false;
    this.disposalAction = disposalAction;
  }

  dispose() {
    if (!this.disposed) {
      this.disposed = true;
      if (typeof this.disposalAction === 'function') {
        this.disposalAction();
      }
      this.disposalAction = null;
    }
  }

  static isDisposable(object) {
    return (typeof (object != null ? object.dispose : void 0) === 'function');
  }
};
