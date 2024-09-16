export class SettingsConfigForm extends FormApplication {
    // lots of other things...
    constructor(options) {
        super();
        this.options = options;
    }
    

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['form'],
            popOut: true,
            template: `modules/pf2e-rpg-numbers/templates/config.html`,
            id: 'pf2e-rpg-numbers-settings-form',
            title: 'Pf2e RPG #s Config Menu',
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
      }

    getData() {
        //game.settings.get('myModuleName', 'myComplexSettingName')
        return {
            placeholder: true
        };
    }

    async _updateObject(event, formData) {
        const data = expandObject(formData);
        //game.settings.set('myModuleName', 'myComplexSettingName', data);
    }
}