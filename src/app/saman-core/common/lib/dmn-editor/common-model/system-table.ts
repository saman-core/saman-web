export const SYSTEM_TABLE = `<?xml version="1.0" encoding="UTF-8"?>
<dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/" xmlns="saman-core" xmlns:feel="http://www.omg.org/spec/DMN/20180521/FEEL/" xmlns:kie="http://www.drools.org/kie/dmn/1.2" xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/DMNDI/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="_187F4C76-FFEE-438A-BA01-9D8F86961B86" name="system-table" typeLanguage="http://www.omg.org/spec/DMN/20180521/FEEL/" namespace="saman-core/system-table">
  <dmn:extensionElements/>
  <dmn:businessKnowledgeModel id="_8D62B497-C2C8-4C60-BE16-2619138AAC16" name="systemTable">
    <dmn:extensionElements/>
    <dmn:variable id="_D5774FC8-DB13-4AAD-A57C-4ECE566FB6C9" name="systemTable" typeRef="string"/>
    <dmn:encapsulatedLogic id="_5F7DDF61-E0F2-4C6F-B4B4-8DE7E585F45C" kind="Java">
      <dmn:formalParameter id="_5A1ED60F-9727-4895-B4D7-DBA515865484" name="systemTableName" typeRef="string"/>
      <dmn:formalParameter id="_8C2CE7A1-64C4-4B05-9C87-34A6688257EE" name="systemTableProperty" typeRef="string"/>
      <dmn:formalParameter id="_1CD038B5-95A7-4ED3-9835-D2425F0EDEEF" name="conditions" typeRef="context"/>
      <dmn:context id="_72DAC359-6322-4A56-82E1-990DFE6C1054">
        <dmn:contextEntry>
          <dmn:variable id="_DA000D53-BB23-4F02-B15A-50BE4FC982EB" name="class" typeRef="string"/>
          <dmn:literalExpression id="_8FD1E332-60C3-4C16-BA9B-A5FB2C72F3A7">
            <dmn:text>"io.samancore.condition_template.client.SystemTableWrapperClient"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
        <dmn:contextEntry>
          <dmn:variable id="_655DC1C8-C553-4D9A-B51D-09260D43C7A9" name="method signature" typeRef="string"/>
          <dmn:literalExpression id="_C4A25513-AE9C-4FEA-A455-D71BCC0E1AE5">
            <dmn:text>"call(java.lang.String, java.lang.String, java.util.Map)"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
      </dmn:context>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram id="_64110A90-BCCA-462F-983B-2FBD2CD39E92" name="DRG">
      <di:extension>
        <kie:ComponentsWidthsExtension>
          <kie:ComponentWidths dmnElementRef="_72DAC359-6322-4A56-82E1-990DFE6C1054">
            <kie:width>50</kie:width>
            <kie:width>100</kie:width>
            <kie:width>446</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_8FD1E332-60C3-4C16-BA9B-A5FB2C72F3A7">
            <kie:width>446</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_C4A25513-AE9C-4FEA-A455-D71BCC0E1AE5">
            <kie:width>446</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_5F7DDF61-E0F2-4C6F-B4B4-8DE7E585F45C">
            <kie:width>50</kie:width>
            <kie:width>616</kie:width>
          </kie:ComponentWidths>
        </kie:ComponentsWidthsExtension>
      </di:extension>
      <dmndi:DMNShape id="dmnshape-drg-_8D62B497-C2C8-4C60-BE16-2619138AAC16" dmnElementRef="_8D62B497-C2C8-4C60-BE16-2619138AAC16" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="6" y="245" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</dmn:definitions>`;