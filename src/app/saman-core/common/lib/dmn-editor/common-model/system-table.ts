export const SYSTEM_TABLE = `<?xml version="1.0" encoding="UTF-8"?>
<dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/" xmlns="saman-core/system-table" xmlns:feel="http://www.omg.org/spec/DMN/20180521/FEEL/" xmlns:kie="http://www.drools.org/kie/dmn/1.2" xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/DMNDI/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" id="_5AE59027-5D65-46BD-A77B-FDCC08BB3CC1" name="system-table" typeLanguage="http://www.omg.org/spec/DMN/20180521/FEEL/" namespace="saman-core/system-table">
  <dmn:extensionElements/>
  <dmn:businessKnowledgeModel id="_41C669E2-E8EB-46EC-8E10-0E4A6BB92BA0" name="systemTableString">
    <dmn:extensionElements/>
    <dmn:variable id="_24186599-5E17-419A-802C-E84B5553BE4F" name="systemTableString" typeRef="string"/>
    <dmn:encapsulatedLogic id="_52C04384-41C5-45B7-B4A3-5CEC7416EB57" kind="Java">
      <dmn:formalParameter id="_98B17DAA-29AA-4D70-B8AE-526E9DB4F069" name="name" typeRef="string"/>
      <dmn:formalParameter id="_7D98F932-4648-4B00-AA76-2EF40A71BF1E" name="property" typeRef="string"/>
      <dmn:formalParameter id="_B706F17D-9E87-48AC-876D-70E5B38A0E4A" name="filters" typeRef="context"/>
      <dmn:context id="_2EF4BDDC-999B-4C53-A0D1-71EFE7DCD88B">
        <dmn:contextEntry>
          <dmn:variable id="_0C823D85-DEDF-4320-9DF2-1097B5A5E732" name="class" typeRef="string"/>
          <dmn:literalExpression id="_2541218C-7FE6-437F-8DB5-7D4D3138C18F">
            <dmn:text>"io.samancore.condition_template.client.SystemTableWrapperClient"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
        <dmn:contextEntry>
          <dmn:variable id="_7F7FA4EE-4C3A-42B5-B512-894B24E3C692" name="method signature" typeRef="string"/>
          <dmn:literalExpression id="_ABCB7689-B035-4D0F-B6F2-B5B8B24F1032">
            <dmn:text>"fetchString(java.lang.String, java.lang.String, java.util.Map)"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
      </dmn:context>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmn:businessKnowledgeModel id="_B4D076DA-9572-421C-BFAE-7660FF68A9C4" name="systemTableNumber">
    <dmn:extensionElements/>
    <dmn:variable id="_13D1D2CB-BFF7-4186-8291-E980AB682355" name="systemTableNumber" typeRef="number"/>
    <dmn:encapsulatedLogic id="_F8135280-243F-4450-B417-B2208CF95BD1" kind="Java">
      <dmn:formalParameter id="_345F9D67-0F7F-4903-BD7F-E09701D02692" name="name" typeRef="string"/>
      <dmn:formalParameter id="_9BE0C068-6327-4EEB-B255-EEC0FAFF34A4" name="property" typeRef="string"/>
      <dmn:formalParameter id="_F6C9C21D-1B3E-4253-88C2-16B263685570" name="filters" typeRef="context"/>
      <dmn:context id="_82537596-7D8F-48FF-A12C-7237E63C3D78">
        <dmn:contextEntry>
          <dmn:variable id="_574D0349-095F-4C69-9D98-08A9227B0F67" name="class" typeRef="string"/>
          <dmn:literalExpression id="_76004643-496F-4735-A595-DEBB72AC3C04">
            <dmn:text>"io.samancore.condition_template.client.SystemTableWrapperClient"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
        <dmn:contextEntry>
          <dmn:variable id="_259D0284-0EBC-4548-AE8E-D1042562B9E3" name="method signature" typeRef="string"/>
          <dmn:literalExpression id="_FEA67E1A-D40D-4E6C-9A91-F48AEFE49334">
            <dmn:text>"fetchNumber(java.lang.String, java.lang.String, java.util.Map)"</dmn:text>
          </dmn:literalExpression>
        </dmn:contextEntry>
      </dmn:context>
    </dmn:encapsulatedLogic>
  </dmn:businessKnowledgeModel>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram id="_68F295DD-E8FD-422F-A1D2-427B9C20CD7A" name="DRG">
      <di:extension>
        <kie:ComponentsWidthsExtension>
          <kie:ComponentWidths dmnElementRef="_2EF4BDDC-999B-4C53-A0D1-71EFE7DCD88B">
            <kie:width>50</kie:width>
            <kie:width>100</kie:width>
            <kie:width>470</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_2541218C-7FE6-437F-8DB5-7D4D3138C18F">
            <kie:width>470</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_ABCB7689-B035-4D0F-B6F2-B5B8B24F1032">
            <kie:width>470</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_52C04384-41C5-45B7-B4A3-5CEC7416EB57">
            <kie:width>50</kie:width>
            <kie:width>640</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_82537596-7D8F-48FF-A12C-7237E63C3D78">
            <kie:width>50</kie:width>
            <kie:width>100</kie:width>
            <kie:width>379</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_76004643-496F-4735-A595-DEBB72AC3C04">
            <kie:width>379</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_FEA67E1A-D40D-4E6C-9A91-F48AEFE49334">
            <kie:width>379</kie:width>
          </kie:ComponentWidths>
          <kie:ComponentWidths dmnElementRef="_F8135280-243F-4450-B417-B2208CF95BD1">
            <kie:width>50</kie:width>
            <kie:width>549</kie:width>
          </kie:ComponentWidths>
        </kie:ComponentsWidthsExtension>
      </di:extension>
      <dmndi:DMNShape xmlns:p0="https://kiegroup.org/dmn/_0F165F0B-0342-4EEC-8D01-38D8C71DDA8C" id="dmnshape-drg-_41C669E2-E8EB-46EC-8E10-0E4A6BB92BA0" dmnElementRef="p0:_41C669E2-E8EB-46EC-8E10-0E4A6BB92BA0" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="283" y="101" width="144" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
      <dmndi:DMNShape xmlns:p1="https://kiegroup.org/dmn/_0F165F0B-0342-4EEC-8D01-38D8C71DDA8C" id="dmnshape-drg-_B4D076DA-9572-421C-BFAE-7660FF68A9C4" dmnElementRef="p1:_B4D076DA-9572-421C-BFAE-7660FF68A9C4" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="283" y="162" width="146" height="51"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</dmn:definitions>`;