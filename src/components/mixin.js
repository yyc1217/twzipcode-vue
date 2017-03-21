import twzipcode from 'twzipcode-data'
import { keyBy } from 'lodash'


export default {
    props: {
        valueLocale: {
            type: String,
            default: 'zh-tw'
        },
        textLocale: {
            type: String,
            default: 'zh-tw'
        },
        selected: {
            type: String,
        }
    },
    methods: {
        getData ({dataName, transform = _.identity}) {

            let ids = twzipcode()[dataName].map(data => data.id)
            let valueDict = keyBy(twzipcode(this.valueLocale)[dataName], 'id')
            let textDict = keyBy(twzipcode(this.textLocale)[dataName], 'id')

            return this.toOptions(ids, valueDict, textDict)
                       .map(option => transform(option, valueDict, textDict))
        },

        toOptions (ids, valueDict, textDict) {
            return ids.map(id => this.toOption(id, valueDict[id], textDict[id]))
        },

        toOption (id, valueObject, textObject) {
            return {
                id,
                value: this.renderOption(valueObject, this.valueTemplate),
                text: this.renderOption(textObject, this.textTemplate)
            }
        },
        
        renderOption(object, template) {
            return Object.keys(object).reduce((text, key) => {
                return text.replace(`:${key}`, object[key])
            }, template)
        },

        emitChange (value) {

            if (this.$root.bus) {
                let id = this.$props.id
                this.$root.bus.$emit(`${id}:change`, {
                    value
                })
            }
        }
    },

    watch: {
        value: function(value) {
            this.emitChange(value)
        }
    },

    mounted () {
        this.emitChange(this.$data.value)
    }
}