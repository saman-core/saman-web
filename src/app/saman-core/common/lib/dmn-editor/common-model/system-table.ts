export const SYSTEM_TABLE = `<?xml version="1.0" encoding="UTF-8"?>
<dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/" xmlns="saman-core/property/generatesMovements_value" xmlns:feel="http://www.omg.org/spec/DMN/20180521/FEEL/" xmlns:kie="http://www.drools.org/kie/dmn/1.2" xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/DMNDI/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="_187F4C76-FFEE-438A-BA01-9D8F86961B86" name="generatesMovements_value" typeLanguage="http://www.omg.org/spec/DMN/20180521/FEEL/" namespace="saman-core/property/generatesMovements_value">
  <dmn:extensionElements/>
  <dmn:businessKnowledgeModel id="_8D62B497-C2C8-4C60-BE16-2619138AAC16" name="systemTableNumber">
    <dmn:extensionElements/>
    <dmn:variable id="_D5774FC8-DB13-4AAD-A57C-4ECE566FB6C9" name="systemTableNumber" typeRef="number"/>
    <dmn:encapsulatedLogic id="_5F7DDF61-E0F2-4C6F-B4B4-8DE7E585F45C" kind="Java">
      <dmn:formalParameter id="_5A1ED60F-9727-4895-B4D7-DBA515865484" name="systemTableName" typeRef="string"/>
      <dmn:formalParameter id="_8C2CE7A1-64C4-4B05-9C87-34A6688257EE" name="systemTableProperty" typeRef="string"/>
      <dmn:formalParameter id="_1CD038B5-95A7-4ED3-9835-D2425F0EDEEF" name="conditions" typeRef="context"/>
      <dmn:context id="_43D81CAC-AE81-4306-BD97-AC1055FF9BEA">
        <dmn:contextEntry>
          <dmn:variable id="_A159E7A4-2BA7-4E84-B046-8358293BF2B0" name="class" typeRef="string"/>
          <dmn:literalExpression id="_8FD1E332-60C3-4C16-BA9B-A5FB2C72F3A7">
            <dmn:text>"io.samancore.condition_template.client.SystemTableWrapperClient"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
        <dmn:contextEntry>
          <dmn:variable id="_925CC0E7-783A-4F7C-886B-8C322A5E4CF9" name="method signature" typeRef="string"/>
          <dmn:literalExpression id="_C4A25513-AE9C-4FEA-A455-D71BCC0E1AE5">
            <dmn:text>"fetchNumber(java.lang.String, java.lang.String, java.util.Map)"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
      </dmn:context>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmn:businessKnowledgeModel id="_55B272DE-2012-4765-83A0-1AD1E58BB4BB" name="systemTableString">
    <dmn:extensionElements/>
    <dmn:variable id="_FBAA97A8-698D-4252-BE3A-3F83A374AE0C" name="systemTableString" typeRef="string"/>
    <dmn:encapsulatedLogic id="_C7C0AB22-F879-4078-905E-2EAA8BEB499E" kind="Java">
      <dmn:formalParameter id="_CE9B8BE3-1185-4168-9143-EA5FDEC381E7" name="systemTableName" typeRef="string"/>
      <dmn:formalParameter id="_5055B91B-F28E-4918-9F14-5F9890AF9BCB" name="systemTableProperty" typeRef="string"/>
      <dmn:formalParameter id="_43252BC0-CF47-4AD3-9292-120EB55FD713" name="conditions" typeRef="context"/>
      <dmn:context id="_42C51228-E67F-4537-8A7D-F116299A937A">
        <dmn:contextEntry>
          <dmn:variable id="_6FF6BB16-FC58-4476-96D4-B490B16835C2" name="class" typeRef="string"/>
          <dmn:literalExpression id="_BD68B3B3-B711-4DEB-8129-7934285BDBCD">
            <dmn:text>"io.samancore.condition_template.client.SystemTableWrapperClient"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
        <dmn:contextEntry>
          <dmn:variable id="_301AD3DB-1AAC-497F-9535-6C28508D19BD" name="method signature" typeRef="string"/>
          <dmn:literalExpression id="_A51418AF-D532-4253-B3FA-F5449C80089B">
            <dmn:text>"fetchString(java.lang.String, java.lang.String, java.util.Map)"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
      </dmn:context>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram id="_64110A90-BCCA-462F-983B-2FBD2CD39E92" name="DRG">
      <di:extension>
        <kie:ComponentsWidthsExtension>
          <kie:ComponentWidths dmnElementRef="_43D81CAC-AE81-4306-BD97-AC1055FF9BEA">
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
          <kie:ComponentWidths dmnElementRef="_42C51228-E67F-4537-8A7D-F116299A937A">
            <kie:width>50</kie:width>
            <kie:width>100</kie:width>
            <kie:width>389</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_BD68B3B3-B711-4DEB-8129-7934285BDBCD">
            <kie:width>389</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_A51418AF-D532-4253-B3FA-F5449C80089B">
            <kie:width>389</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_C7C0AB22-F879-4078-905E-2EAA8BEB499E">
            <kie:width>50</kie:width>
            <kie:width>559</kie:width>
          </kie:ComponentWidths>
        </kie:ComponentsWidthsExtension>
      </di:extension>
      <dmndi:DMNShape id="dmnshape-drg-_8D62B497-C2C8-4C60-BE16-2619138AAC16" dmnElementRef="_8D62B497-C2C8-4C60-BE16-2619138AAC16" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="119" y="70" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-_55B272DE-2012-4765-83A0-1AD1E58BB4BB" dmnElementRef="_55B272DE-2012-4765-83A0-1AD1E58BB4BB" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="119" y="157" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</dmn:definitions>`;