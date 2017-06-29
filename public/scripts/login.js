 document.addEventListener("DOMContentLoaded", function(event) {
    $('.ui.form').form({
      fields: {
          email: {
          identifier  : 'email',
          rules: [
            {
              type   : 'email',
              prompt : 'Please enter a valid e-mail'
            }
          ]
        }, 
        password: {
          identifier  : 'password',
          rules: [
            {
              type   : 'password',
              prompt : 'Please enter a valid password that contains atleast 6 characters'
            }
          ]
        }
      }
    });
});
