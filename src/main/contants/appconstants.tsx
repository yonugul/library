import React from 'react';

class AppConstants extends React.Component {
  static AppName = 'Adverti';

  static BaseUri = 'https://advdijital.com';

  static ApiUri = `${AppConstants.BaseUri}/api`;

  static UserDataUri = `${AppConstants.BaseUri}/Media/UserData/`;

  static LoginUri = `${AppConstants.ApiUri}/login`;

  static BooksUri = `${AppConstants.ApiUri}/SmartBook/GetBooks`;

  static LocalPath = `./Library/${AppConstants.AppName}`;

  static Routes = {
    Home: '/',
    About: '/about',
    Login: '/login',
    Logout: '/logout',
    ForgotPassword: '/forgotpassword',
    Library: '/library',
    BookHeader: '/bookheader',
  };
}
export default AppConstants;
