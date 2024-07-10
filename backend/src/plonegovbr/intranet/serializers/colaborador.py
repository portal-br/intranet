from Acquisition import aq_parent
from plone.restapi.interfaces import ISerializeToJson
from plone.restapi.interfaces import ISerializeToJsonSummary
from plone.restapi.serializer.converters import json_compatible
from plone.restapi.serializer.dxcontent import SerializeFolderToJson
from plonegovbr.intranet.content.area import IArea
from plonegovbr.intranet.content.colaborador import IColaborador
from zope.component import adapter
from zope.component import getMultiAdapter
from zope.interface import implementer
from zope.interface import Interface


@implementer(ISerializeToJson)
@adapter(IColaborador, Interface)
class ColaboradorJSONSerializer(SerializeFolderToJson):
    def get_area_info(self):
        result = {}
        context = self.context
        area = aq_parent(context)
        if IArea.providedBy(area):
            result = getMultiAdapter((area, self.request), ISerializeToJsonSummary)()
        return result

    def __call__(self, version=None, include_items=True):
        result = super().__call__(version, include_items)
        result.update(
            json_compatible({
                "area_info": self.get_area_info(),
            })
        )
        return result
