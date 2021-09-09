"use strict"

class SlashBuilder {
    constructor(data = {}) {
        this.setup(data)
    }
    setup(data) {
        this.name = data.name ?? null;
        this.description = data.description ?? null;
        this.options = [];
        if (data.options) {
            this.options = this.constructor.normalizeOptions(data.options)
        }
    }
    addSubCommand(name, description, options) {
        name = name.toLowerCase()
        return this.addSubCommands({ name, description, options })
    }
    addSubCommands(...options) {
        this.options.push(...this.constructor.normalizeSubCommands(options))
        return this
    }
    addString(name, description, required) {
        name = name.toLowerCase()
        return this.addStrings({ name, description, required })
    }
    addStrings(...options) {
        this.options.push(...this.constructor.normalizeStrings(options))
        return this
    }
    addInteger(name, description, required) {
        name = name.toLowerCase()
        return this.addIntegers({ name, description, required })
    }
    addIntegers(...options) {
        this.options.push(...this.constructor.normalizeIntegers(options))
        return this
    }
    addBoolean(name, description, required) {
        name = name.toLowerCase()
        return this.addBooleans({ name, description, required })
    }
    addBooleans(...options) {
        this.options.push(...this.constructor.normalizeBooleans(options))
        return this
    }
    addUser(name, description, required) {
        name = name.toLowerCase()
        return this.addUsers({ name, description, required })
    }
    addUsers(...options) {
        this.options.push(...this.constructor.normalizeUsers(options))
        return this
    }
    addChannel(name, description, required) {
        name = name.toLowerCase()
        return this.addChannels({ name, description, required })
    }
    addChannels(...options) {
        this.options.push(...this.constructor.normalizeChannels(options))
        return this
    }
    addRole(name, description, required) {
        name = name.toLowerCase()
        return this.addRoles({ name, description, required })
    }
    addRoles(...options) {
        this.options.push(...this.constructor.normalizeRoles(options))
        return this
    }
    addMentionable(name, description, required) {
        name = name.toLowerCase()
        return this.addMentionables({ name, description, required })
    }
    addMentionables(...options) {
        this.options.push(...this.constructor.normalizeMentionables(options))
        return this
    }
    addNumber(name, description, required) {
        name = name.toLowerCase()
        return this.addNumbers({ name, description, required })
    }
    addNumbers(...options) {
        this.options.push(...this.constructor.normalizeNumbers(options))
        return this
    }
    addOption(name, description, type, required) {
        name = name.toLowerCase()
        return this.addOptions({ name, description, type, required })
    }
    addOptions(...options) {
        this.options.push(...this.constructor.normalizeOptions(options))
        return this
    }
    setName(name) {
        name = name.toLowerCase()
        this.name = name;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setDefaultPermission(perm = true) {
        this.defaultPremission = perm
        return this;
    }
    toJSON() {
        return {
            name: this.name,
            description: this.description,
            options: this.options
        }
    }
    static normalizeSubCommand(name, description, options) {
        return {
            name,
            description,
            type: 1,
            options

        }
    }
    static normalizeSubCommands(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeSubCommand(option.name, option.description, option.options)
            )
    }
    static normalizeSubCommandGroup(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 2,
            required
        }
    }
    static normalizeSubCommandGroups(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeSubCommandGroup(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeString(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 3,
            required
        }
    }
    static normalizeStrings(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeString(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeInteger(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 4,
            required
        }
    }
    static normalizeIntegers(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeInteger(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeBoolean(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 5,
            required
        }
    }
    static normalizeBooleans(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeBoolean(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeUser(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 6,
            required
        }
    }
    static normalizeUsers(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeUser(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeChannel(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 7,
            required
        }
    }
    static normalizeChannels(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeChannel(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeRole(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 8,
            required
        }
    }
    static normalizeRoles(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeRole(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeMentionable(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 9,
            required
        }
    }
    static normalizeMentionables(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeMentionable(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeNumber(name, description, required = false) {
        return {
            name: name,
            description: description,
            type: 10,
            required
        }
    }
    static normalizeNumbers(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeNumber(option.name, option.description, typeof option.required === 'boolean' ? option.required : false)
            );
    }
    static normalizeOption(name, description, type, required = false) {
        return {
            name: name,
            description: description,
            type: type,
            required
        }
    }
    static normalizeOptions(...options) {
        return options
            .flat(2)
            .map(option =>
                this.normalizeOption(option.name, option.description, option.type, typeof option.required === 'boolean' ? option.required : false)
            );
    }
}

module.exports = SlashBuilder;