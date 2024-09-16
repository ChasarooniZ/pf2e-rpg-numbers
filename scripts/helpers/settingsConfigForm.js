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
            template: `modules/pf2e-rpg-numbers/templates/pf2e-rpg-settings-config.hbs`,
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
        /*return {
            placeholder: true
        };*/
        return foundry.utils.mergeObject(super.getData(), {
            settings: {},
            tabs: [
                {
                    id: "home",
                    label: "Home",
                    icon: "fa-dragon",
                    home: true
                },
                {
                    id: "rolls",
                    label: "rolls",
                    icon: "fa-dice-d20",
                    rolls: true
                },
                {
                    id: "token",
                    label: "token",
                    icon: "fa-projector",
                    token: true
                },
                {
                    id: "critical",
                    label: "critical",
                    icon: "fa-explosion",
                    critical: true
                },
                {
                    id: "text",
                    label: "text",
                    icon: "fa-message-captions",
                    text: true
                },
                {
                    id: "misc",
                    label: "misc",
                    icon: "fa-gear",
                    misc: true
                },
            ]
        })
    }

    async _updateObject(event, formData) {
        const data = expandObject(formData);
        //game.settings.set('myModuleName', 'myComplexSettingName', data);
    }
}