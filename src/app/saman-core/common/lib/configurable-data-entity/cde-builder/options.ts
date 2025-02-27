export const buildOptions = {
    noDefaultSubmitButton: true,
    builder: {
      basic: false,
      data: false,
      premium: false,
      advanced: false,
      layout: false,
      customBasic: {
        title: 'Basic',
        default: false,
        weight: 0,
        components: {
          samanTextfield: true,
          samanTextarea: true,
          samanNumber: true,
          samanPassword: true,
          samanCheckbox: true,
          samanSelect: true,
          samanRadio: true,
          samanHidden: true,
        }
      },
      customAdvanced: {
        title: 'Advanced',
        default: false,
        weight: 1,
        components: {
          samanEmail: true,
          samanUrl: true,
          samanPhoneNumber: true,
          samanTags: true,
          samanDatetime: true,
          samanTime: true,
          samanSignature: true,
        }
      },
      customNext: {
        title: 'Next',
        default: false,
        weight: 2,
        components: {
          samanSelectboxes: true,
          samanSurvey: true,
          samanFile: true,
        }
      },
      customLayout: {
        title: 'Layout',
        weight: 3,
        components: {
          samanPanel: true,
          samanTable: true,
          samanTabs: true,
          samanWell: true,
          samanColumns: true,
          samanFieldset: true,
          samanContent: true,
          samanHtmlelement: true,
        }
      }
    },
    language: 'en',
    i18n: {
      es: {
      }
    }
  };
