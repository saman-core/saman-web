export const buildOptions = {
    builder: {
      basic: false,
      data: false,
      premium: false,
      advanced: false,
      customBasic: {
        title: 'Basic',
        default: false,
        weight: 0,
        components: {
          textfield: true,
          textarea: true,
          number: true,
          password: true,
          checkbox: true,
          select: true,
          radio: true,
          hidden: true,
        }
      },
      customAdvanced: {
        title: 'Advanced',
        default: false,
        weight: 0,
        components: {
          email: true,
          url: true,
          phoneNumber: true,
          tags: true,
          datetime: true,
          time: true,
          currency: true,
          signature: true,
        }
      },
      customNext: {
        title: 'Next',
        default: false,
        weight: 0,
        components: {
          selectboxes: true,
          survey: true,
          file: true,
        }
      },
      layout: {
        title: 'Layout',
        weight: 0,
        components: {
          panel: true,
          table: true,
          tabs: true,
          well: true,
          columns: true,
          fieldset: true,
          content: true,
          htmlelement: true,
        }
      }
    },
    language: 'en',
    i18n: {
      es: {
      }
    }
  };
