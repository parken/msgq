class AppController {
  /* @ngInject */
  constructor($rootScope, $state, $http, OAuth, $window, Session, OTP, $location, AppAction) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$http = $http;
    this.OAuth = OAuth;
    this.$window = $window;
    this.$location = $location;
    this.Session = Session;
    this.AppAction = AppAction;
    this.OTP = OTP;
    this.user = this.Session.read('userinfo');
    this.company = this.Session.read('company');

    this.app = {
      name: 'MSGQue',
      version: '1.0.0',
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-primary',
        navbarCollapseColor: 'bg-primary lter',
        asideColor: 'bg-primary bg-gd-dk',
        headerFixed: true,
        asideFixed: true,
        asideFolded: false,
        asideDock: false,
        container: false,
        offScreen: false, // flag for show of sidebar for mobile view
        mobileHeader: false, // flag to show header Nav and Search in mobile view
      },
    };
  }

  $onInit() {
    // keeps track of state change and hides sidebar view for mobile

    this.$rootScope.$on('$stateChangeStart', () => {
      this.app.settings.offScreen = false;
      this.app.settings.mobileHeader = false;
    });

    this.$rootScope.$on('sessionUpdated', (e, d) => {
      this.user = d;
    });

    if (!this.company) {
      this.$http.get('/company')
        .then(({ data: company }) => {
          this.company = company;
          this.Session.create('company', company);
        });
    }

    if (this.$location.search().uid) {
      this.AppAction
        .loginUUID(this.$location.search().uid)
        .then(() => this.$state.go(
          this.$state.current.name,
          Object.assign(this.$state.params, { uid: undefined })));
    }
  }

  logout() {
    return this.OAuth
      .revokeToken()
      .then(() => {
        this.Session.destroy();
        if (this.$state.current.auth) this.$state.go('home.list');
        return this.$window.location.reload();
      });
  }
}

export default AppController;
