/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if (
    'serviceWorker' in navigator
    && (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                    'service worker became redundant.');

              default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here
  if (typeof Vue !== 'undefined') {

    let bacon = new Vue({
      el: '#overview',
      data: {
        bacons: 1
      },
      methods: {
        addBacon: function () {
          this.bacons++;
        }
      }
    });

    let form = new Vue({
      el: '#form',
      data: {
        countries: ["United States", "Poland"],
        form: {
          firstName: '',
          lastName: '',
          email: '',
          country: 'United States',
          postal: '',
          number: '',
          card: '',
          sCode: '',
          eDate: ''
        },
        errors: {
          firstName: '',
          lastName: '',
          email: '',
          country: '',
          postal: '',
          number: '',
          card: '',
          sCode: '',
          eDate: ''
        },
        possibleErrors: {
          empty: "Field cannot be empty",
          email: "Field must be an email ",
          postal: "Field must be an postal code",
          number: 'Field must be an phone number',
          card: 'Field must be an card number (for visa start with 4)',
          sCode: 'Field must be an security code',
          eDate: 'Field must be an expiration date'
        }
      },
      methods: {
        send: function () {
          this.clearErrors();
          let success = this.validate();
          if (success) {
            this.showSuccessMessage();
          }
        },
        clearErrors: function () {
          this.errors = {
            firstName: '',
            lastName: '',
            email: '',
            country: '',
            postal: '',
            number: '',
            card: '',
            sCode: '',
            eDate: ''
          }
        },
        validate: function () {
          let success = true;
          if ('' === this.form.firstName) {
            this.errors.firstName = this.possibleErrors.empty;
            success = false;
          }
          if ('' === this.form.lastName) {
            this.errors.lastName = this.possibleErrors.empty;
            success = false;
          }
          if ('' === this.form.email) {
            this.errors.email = this.possibleErrors.empty;
            success = false;
          } else if (!this.validEmail(this.form.email)) {
            this.errors.email = this.possibleErrors.email;
            success = false;
          }
          if ('' === this.form.postal) {
            this.errors.postal = this.possibleErrors.empty;
            success = false;
          } else if (!this.validPostalCode(this.form.postal)) {
            this.errors.postal = this.possibleErrors.postal;
            success = false;
          }
          if ('' === this.form.number) {
            this.errors.number = this.possibleErrors.empty;
            success = false;
          } else if (!this.validatePhone(this.form.number)) {
            this.errors.number = this.possibleErrors.number;
            success = false;
          }
          if ('' === this.form.card) {
            this.errors.card = this.possibleErrors.empty;
            success = false;
          } else if (!this.validateCard(this.form.card)) {
            this.errors.card = this.possibleErrors.card;
            success = false;
          }
          if ('' === this.form.sCode) {
            this.errors.sCode = this.possibleErrors.empty;
            success = false;
          } else if (!this.validateSCode(this.form.sCode)) {
            this.errors.sCode = this.possibleErrors.sCode;
            success = false;
          }
          if ('' === this.form.eDate) {
            this.errors.eDate = this.possibleErrors.empty;
            success = false;
          } else if (!this.validateEDate(this.form.eDate)) {
            this.errors.eDate = this.possibleErrors.eDate;
            success = false;
          }
          return success;
        },
        showSuccessMessage: function() {
          alert("Success");
        },
        validEmail: function (email) {
          let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        validPostalCode: function(postal) {
          let re = /^[0-9]{5}/;
          return re.test(postal);
        },
        validatePhone: function(phone) {
          let re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
          return re.test(phone);
        },
        validateCard: function(card) {
          // visa card always start with 4
          card = card.replace(/\s/g, '').replace(/-/g, '')
          let re = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
          return re.test(card);
        },
        validateSCode: function(code) {
          let re = /^[0-9]{3}/;
          return re.test(code);
        },
        validateEDate: function(date) {
          let re = /^(0[1-9]|1[0-2])\/\d{2}$/;
          return re.test(date);
        }
      }
    });

  }
})();
