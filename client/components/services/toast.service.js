class toastService {
  /*  @ngInject  */
  constructor(toaster) {
    this.toaster = toaster;
  }
  show(type,message) {
    this.toaster.pop(type, 'Success!',message || (type ? 'Action Completed' : 'Error Occured'));
  }

  next(err) {
    this.toaster.pop('error', 'Error!',err.message || err.data.message || 'Error Occured');
  }

}

export default toastService;
