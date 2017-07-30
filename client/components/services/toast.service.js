class toastService {
  show(type,message) {
    alert(message || (type ? 'Action Completed' : 'Error Occured'));
  }

  next(err) {
    alert(err.message || err.data.message || 'Error Occured');
  }

}

export default toastService;
