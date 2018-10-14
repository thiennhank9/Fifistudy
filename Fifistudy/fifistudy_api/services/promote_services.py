from ..adapter import PromoteAdapter
from ..serializers import ListPromoteSerializer, BasePromoteSerializer


class PromoteServices:
    def __init__(self):
        self.promote_adapter = PromoteAdapter()

    def get_all_for_homepage(self):
        promotes = self.promote_adapter.get_all_for_homepage()

        serializer = ListPromoteSerializer(promotes, many=True)

        return serializer.data