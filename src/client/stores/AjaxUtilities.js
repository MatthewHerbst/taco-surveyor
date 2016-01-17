module.exports = class AjaxUtilities {
  request (url, data, success, error) {
    return $.ajax({
      url: url,
      data: data.toJS(),
      success: success,
      error: error
    });
  }

  error (message) {
    return (jqXHR, textStatus, error) => {
      console.error('AjaxUtilities: ' + message);
      console.error(jqXHR);
      console.error(textStatus);
      console.error(error);
      alert('There was an error getting some data.\n\nError: ' + message + '\n\nPlease refresh the page. Please contact Taco-Surveyor Support if this problem continues.');
    }
  }
};
