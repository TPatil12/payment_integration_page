import { Component, HostListener } from '@angular/core';

declare var Razorpay:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'payment_integration_page';
  message = 'Not yet started';
  paymentId = '';
  error = '';
  options = {
    key: 'rzp_live_Ay9af2dQeUH8A6',
    amount: '200',
    name: 'Abhijit Gatade',
    description: 'Web Development',
    image: 'https://www.abhijitgatade.com/assets/img/favicon.png',
    order_id: '',
    handler: function (response: any) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    },

    prefill: {
      name: '',

      email: '',

      contact: '',
    },

    notes: {
      address: '',
    },

    theme: {
      color: '#3399cc',
    },
  };

  paynow() {
    this.paymentId = '';

    this.error = '';

    this.options.amount = '100'; //paise

    this.options.prefill.name = 'Tushar Patil';

    this.options.prefill.email = 'tusharpatil1216@gmail.com';

    this.options.prefill.contact = '8379885643';

    var rzp1 = new Razorpay(this.options);

    rzp1.open();

    rzp1.on('payment.failed', function (response: any) {
      // Todo - store this information in the server

      console.log(response.error.code);

      console.log(response.error.description);

      console.log(response.error.source);

      console.log(response.error.step);

      console.log(response.error.reason);

      console.log(response.error.metadata.order_id);

      console.log(response.error.metadata.payment_id);

      //this.error = response.error.reason;
    });
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = 'Success';
  }
}
