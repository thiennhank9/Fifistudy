from django.core.mail import send_mail


class EmailServices:
    def __init__(self):
        self.from_mail = 'nguyentrisinh0810@gmail.com'

    def send_pin(self, email):
        pin = 999999
        # send_mail(
        #     'This is test mail',
        #     'test pin: {}'.format(pin),
        #     self.from_mail,
        #     [email, ],
        #     fail_silently=False
        # )

        return pin
