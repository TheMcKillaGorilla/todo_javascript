class PropertiesManager {
    constructor() {
        this.properties = new Array();
    }

    addProperty(propType, propName, propValue) {
        let props = this.properties[propType];
        if (!props) {
            props = new Array();
            this.properties[propType] = props;
        }
        props[propName] = propValue;
    }

    loadProperties(propsFile, callback) {
        $.getJSON(propsFile, function(json) {
            
            callback();
        });
    }
}