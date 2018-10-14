from ..models import Promote


class PromoteAdapter:
    def __init__(self):
        pass

    def get_all_for_homepage(self):
        promotes = Promote.objects.all().order_by('-updated_at')

        for promote in promotes:
            promote.film_detail = promote.film_id

        return promotes

