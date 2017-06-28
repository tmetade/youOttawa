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
        password: ['minLength[6]', 'empty']
      }
    });
});
