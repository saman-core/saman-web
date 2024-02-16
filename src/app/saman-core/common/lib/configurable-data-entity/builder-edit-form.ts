export const HTML = `
<div class="row">
  <div class="col col-sm-6">
    <p class="lead">{{ctx.t(ctx.componentInfo.title, { _userInput: true })}} {{ctx.t('Component')}}</p>
  </div>
</div>
<div class="row">
  <div class="col component-edit-tabs {% if (ctx.preview) { %}col-sm-6{% } else { %}col-sm-12{% } %}">
    <div ref="editForm">
        {{ctx.editForm}}
    </div>
    {% if (!ctx.preview) { %}
    <div style="margin-top: 10px;">
      <button class="btn btn-success" style="margin-right: 10px;" ref="saveButton">{{ctx.t('Save')}}</button>
      <button class="btn btn-secondary" style="margin-right: 10px;" ref="cancelButton">{{ctx.t('Cancel')}}</button>
      <button class="btn btn-danger" ref="removeButton">{{ctx.t('Remove')}}</button>
    </div>
    {% } %}
  </div>
  {% if (ctx.preview) { %}
  <div class="col col-sm-6">
    <div class="card panel preview-panel">
      <div class="card-header">
        <h4 class="card-title mb-0">{{ctx.t('Preview')}}</h4>
      </div>
      <div class="card-body">
        <div class="component-preview" ref="preview">
          {{ctx.preview}}
        </div>
      </div>
    </div>
    {% if (ctx.componentInfo.help) { %}
    <div class="card card-body bg-light formio-settings-help">
      {{ ctx.t(ctx.componentInfo.help) }}
    </div>
    {% } %}
    <div style="margin-top: 10px;">
      <button class="btn btn-success" style="margin-right: 10px;" ref="saveButton">{{ctx.t('Save')}}</button>
      <button class="btn btn-secondary" style="margin-right: 10px;" ref="cancelButton">{{ctx.t('Cancel')}}</button>
      <button class="btn btn-danger" ref="removeButton">{{ctx.t('Remove')}}</button>
    </div>
  </div>
  {% } %}
</div>

`;
