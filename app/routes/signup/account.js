import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import ENV from "../../config/environment";
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),
  queryParams: {
    expired: {
      refreshModel: true
    }
  },
  model(params) {
    if (params.expired === true) {
      this.set('controller.expired', true);
    }
    return hash({
      countries: this.get('ajax').post(ENV.APP.host, {
        data: {
          frontendKey: ENV.APP.frontendKey,
          api: {
            type: 'GET',
            endpoint: 'countries',
            data: {}
          }
        }
      }),
      client: this.modelFor('signup').client
    })
  },
});
