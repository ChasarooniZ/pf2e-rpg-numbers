export class SettingsConfigForm extends FormApplication {
    // lots of other things...
    constructor(options) {
        super(options);
        this.options = foundry.utils.mergeObject(this.constructor.defaultOptions, options);
    }
    

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['form'],
            popOut: true,
            template: `modules/pf2e-rpg-numbers/templates/pf2e-rpg-settings-config.html`,
            id: 'pf2e-rpg-numbers-settings-form',
            title: 'Pf2e RPG #s Config Menu',
            width: 500,
            height: 'auto'
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