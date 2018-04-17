## 5 Understanding the VueJS Instance

### -- Some Basics about the VueJS Instance

The VueJS instance is the middleman between the DOM (the HTML) and the business logic.
```js
    new Vue({
        el: '',
        data: {},
        methods: {},
        computed: {},
        watch: {}
    })
```

### -- Using Multiple Vue Instances

It is possible to control multiple pieces of the application with multiple instances.
Be aware, inside an instance you can only access the properties of that specific instance with the `this` keyword.  

### -- Accessing the Vue Instance from Outside

Store the Vue Instance in a variable, often used `vm` for "Vue Model".

It is recommended in case multiple instances need to communicate, to place all logic from into one instance. Since they are related in some way.

### -- How VueJS manages your Data and Methods

Behind the scens, when creating an instance, VueJS will take the passed object and then will take the data properties and methods and use them as native properties on the instance object itself.  
It even sets up a watcher for each of the properties which makes sure it recognizes whenever one of these properties is changed so it knows when to update the DOM or do anything.

The 'proxied' properties result in getter and setter properties in the rendered Vue Instance Object (the watcher-effect).

You can add new properties to the instance object, but they will not be watched by VueJS.

### -- A Closer Look at $el and $data

$el refers to the template (the HTML) of the instance.  
$data is an object which holds the data-properties.
You can also create the data variable before creating a Vue instance and simply pass it as the value for the key-value pair.

```js
var data = {
    ...
};

new Vue({
    data: data
})
```

### -- Placing $refs and Using them on your Templates

The `ref`-attribure is a key added by VueJS and not an official HTML-attribute. 
You can place it on any element. 
It isn't a directive so it doesn't need to bind or need a colon in the beginning.
```html
<button @click="show" ref="myButton">Show Paragraph</button>
```
```js
...
vm.$refs.myButton.innerText = 'Bladiebla'.
...
```

Keep in mind, this is not reactive. So the changes may be overwritten since it is directly the DOM and not part of the Vue instance.  
It is convenient to use a reference to get a value or access a native element. It is easier than a query-selector to gain access.

### -- Where to learn more about the Vue API

## [vuejs.org/api](http://vuejs.org/api)

### -- Mounting a Template

Mount is a method which does the same as the el-property.  
We can pass the element where to mount the application by passing the css-selector of the place to mount.

```js
    vm1.$mount('#app');
```

Up until now the template was already defined in the HTML.  
with the property 'template' you can create the html in the object.

```html
<div id="vm3"></div>
```
```js
var vm = new Vue({
    template: '<h1>Hello!</h1>'
});

vm.$mount('#app');
```

### -- Using Components

Create a Vue Component with `Vue.component()`. It takes as a first argument the selector of the component as a `string`. And as a second argument an object, similar to the Vue instance but not equal; for example "data" is used differently.

```js
Vue.component('hello', {
    template: '<h1>Hello!</h1>'
});
```

To use it: Which replaces the custom element with the template.
```html
<hello></hello>
```

### -- Limitations of some Templates

Template would be a `string` and is therefor harder to write multiline, or IDE support.

### -- How VueJS updates the DOM

Each property has it's own watcher.  
Accessing the real DOM is the part which takes the most performance.  
Vue add an exta layer: the Virtual DOM; a copy parsed in JavaScript and therefor real quickly to access.

### -- The VueJS Lifecycle

It start with the `new Vue()`-constructor,  
Then we access the first lifecycle method to which we can listen `beforeCreate()`.
Then it initialzes Data & Events and then creates the instance and call the `created()`
-hook-method.  
Thereafter it compiles the template or derifes the template from the HTML.  
Then `beforeMount()` is reached. This is called right before this template is mounted to the real DOM, so it is not there yet.  
Now the element is replaced with the compiled template, it is still not mounted but VueJS compiles the template, inserts all the values, sets up all bindings and converts it into real HTML-code BUT still behind the scenes.  
Then it is mounted to the DOM.

Ongoing lifecycle:
If some data changes, the DOM is rerendered.
The `beforeUpdate()`-hook-method right before the part of the DOM is rerendered. And the `updated()`-hook-method which is called right after the DOM is updated.

Before-destroy-lifecycle:
`beforeDestroy()` right before an instance is destroyed. This ends with the `destroyed()`-hook-method.

### -- The VueJS Instance Lifecycle in Practice

```js
new Vue({
    ...
    beforeCreate: function(){
        console.log('beforeCreate()');
    },
    created: function(){
        console.log('created()');
    },
    beforeMount: function(){
        console.log('beforeMount()');
    },
    mounted: function(){
        console.log('mounted()');
    },
    beforeUpdate: function(){
        console.log('beforeUpdate()');
    },
    updated: function(){
        console.log('updated()');
    },
    beforeDestroy: function(){
        console.log('beforeDestroy()');
    },
    destroyed: function(){
        console.log('destroyed()');  
    } 
}); 
```

--- 
---
## Section 6 - Moving to a "Real" Development Workflow with Webpack and Vue CLI

### -- Why do we need a Development Server?

- Test the App under realistic circumstances
- To lazy load files
- Benefits like auto-reload

### -- What does 'Development Workflow' mean?

//

### -- Using the Vue CLI to create Projects

Vue CLI allows you to fetch empty VueJS Project Templates

```bash
npm i -g vue-cli
```

Choose from different Templates:
- simple: index.html + Vue CDN import
- webpack-simple: Basic Webpack Workflow
- webpack: Complex Webpack Workflow (incl. Testing)
- browserify / browserify-simple: Browserify Workflows

Template compilation is supported in all options except for 'simple'.

### -- Installing the Vue CLI and Creating a new Project

Initialize a new project with vue cli:

```js
// vue init [template] [project-folder-name]
vue init webpack-simple vue-cli
```

### -- An Overview over the Webpack Template Folder Structure

The first file that gets executed is "main.js" when the bundle gets loaded in index.html.


### -- Understanding ".vue" Files

The Single Template File.

In main.js all thats happening is the creation of a new Vue instance which depends on the vue folder and to get access to create a new instance.
Then it selects the Vue element with the el-property, which indicates the place where to load the Vue-app.

Instead the `render`-property-function tells VueJS to take this place but don't infer the template, overwrite it with the html-template exported in App (App.vue).

```js
import Vue from 'vue';
import App from './App.vue'

new Vue({
    el: '#app',
    render: h => h(App)
});
```
Inside a .vue-file the markup follows the same structure:
1. A `<template></template>`-block; the container of the HTML
2. A script holding the VueJS code for this template.
3. And some possible styling.

*in App.vue:*
```html
    <template>
        <h1>Hello World!</h1>
    </template>

    <script>
        export default {

        }
    </script>
```

### -- Understanding the Object in the Vue File

Whatever is exported in the object is a Vue instance - the same object used by VueJS.

### -- More about ".vue" Files and the CLI

Learn more about '.vue' Files in this Article from the official Docs: http://vuejs.org/guide/single-file-components.html

Learn more about the `render()` method in another Article in the official Docs: http://vuejs.org/guide/render-function.html

Finally, it's important to be aware of the fact, that you can also load your App.vue File (your main Component/Instance) via the following two ways (Alternatives to `render()`);

**1) Using the ES6 Spread Operator:**  
Install the babel-preset-stage-2 Dependency to your .babelrc File)
```bash
npm i -D babel-preset-stage-2
```
*in .babelrc:*
```json
    {
        "presets": [
            ["es2015", {"modules": false}],
            ["stage-2"]
        ]
    }
```

*in main.js:*
```js
    import Vue from 'vue'
    import App from './App.vue'

    new Vue({
        el: '#app',
        ...App
    });
```

**2) Using `mount()`:**  
Also install the stage-2 preset as described above.

*in main.js:*
```js
    import Vue from 'vue'
    import App from './App.vue'

    const vm = new Vue({
        ...App
    });

    vm.$mount('#app');
```

Learn more about the CLI here: https://github.com/vuejs/vue-cli


## Section 7 - Components

To create & use a component:

1. Define render-area.  
*in index.html:* 
```html
<div id="app"></div>
```
2. Create and Mount an Vue instance.  
*in main.js:*
```js
import Vue from 'vue'

const vm = new Vue({

});

vm.$mount('#app'); 
```
3. Create and pass the Single Template file.  
*in App.vue:*
```html
<template>
    <div>

    </div>
</template>
<script></script>
```
*in main.js:*
```js
//import Vue from 'vue'
import App from './App.vue'

//const vm = new Vue({
    ...App
//})
```
4. Create a Component.  
*in main.js:*
```js
//import Vue from 'vue'
//import App from './App.vue'

Vue.component('my-cmp', {
    
});

//const vm = new Vue({
    //...App
//})
```
5. Create & import the components' template  
*in App.vue:* 
```html
<!-- <template> -->
    <!-- <div> -->
        <my-cmp></my-cmp>
    <!-- </div> -->
<!-- </template> -->
```
*in MyComponent.vue:*
```html
<template>
  <p>Server Status: {{ status }}</p> 
</template>

<script>
export default {
  data () {
    return {
      status: 'Critical'
    }
  }
}
</script>
```

*in main.js:* 
```js
//import Vue from 'vue'
//import App from './App.vue'
import MyComponent from './MyComponent.vue'

//Vue.component('my-cmp', {
    ...MyComponent
//});

//const vm = new Vue({
    //...App
//})
```
### -- Storing Data in Components with the Data Method

If `data` isn't a function, the components will share the same value. Thus when one changes, they all change!
When it is a function, each component gets its own data storage.

### -- Registering Components Locally and Globally

*in main.js:*
```js
//-import MyComponent from './MyComponent.vue'-

// Registers component globally
//-Vue.component('my-cmp', {});-
```
*in MyComponent.vue `script`:*
```js
import MyComponent from './MyComponent.vue'

// Registers component locally
var cmp = {
    ...MyComponent
}

export default {
    components: {
        'my-cmp': cmp
    }
}
```

### -- The "Root Component" in the App.vue File

// 

### -- #95 Creating a Component

One of the restrictions of a Single Template File is   
`template should contain exactly one root element`.

The solution is to wrap all in a container `div`.

### -- #96 Using Components

*in main.js:*
```js
    import Vue from 'vue'
    import App from './App.vue'
    import Home from './Home.vue'

    //global component
    Vue.component('app-servers', Home);

    const vm = new Vue({
        ...App
    });

    vm.$mount('#app');
```
*in App.vue:*
```html 
<template>
    <app-servers></app-servers>
</template>
```
*in Home.vue:*
```html
<template>
    <div>
        <app-server-status v-for="server in 5"></app-server-status>
    </div>
</template>
<script>
    import ServerStatus from './ServerStatus.vue'

    export default {
        components: {
            'app-server-status': ServerStatus
        }
    }
</script>
```
*in ServerStatus.vue:*
```html
<template>
    <div>
        <p>Server status: {{ status }}</p>
        <hr>
        <button @click="changeStatus">Change Status</button>
    </div>
</template>
<script>
    export default {
        data: function(){
            return {
                status: 'Critical'
            }
        },
        methods: {
            changeStatus() {
                this.status = 'Normal'
            }
        }
    }
</script>
```
**! Add `:key="[iterator].id"` to resolve conflicts**

### -- #99 How to Name your Component Tags (Selectors)

```html
<template>
    <appHeader></appHeader> <!-- 1. -->
    <app-header></app-header> <!-- 2. -->
    <app-header></app-header> <!-- 3. -->
    <appheader></appheader> <!-- 4. -->
</template>
<script>
    import AppHeader from './AppHeader.vue'

    export default {
        compontents: {
            appHeader: AppHeader // 1. Case-sensitive Name
            'app-header': AppHeader // 2. Classical setup
            appHeader: AppHeader // 3. Combination 1 & 2, more JS-style
            AppHeader // 4. ES6 option, will automaticly create key-value pair "AppHeader: AppHeader"
        }
    }
</script>
```
Option 2 and 3 are considered as normal or even best practice.

### -- #100 Scoping Component Styles

By default the style-tag in a Single Template File is globally used.
To scope the styling, add the attribute `scoped` to the style-tag:
```html
<style scoped></style>
```

### -- #102 Module Resources & Useful Links

Learn more about VueJS Components: http://vuejs.org/guide/components.html

## Section 8 - Communicating between Components

### -- #105 Using Props for Parent => Child Communication

*in App.vue:*   
```html 
<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <app-user></app-user>
            </div>
        </div>
    </div>
</template>

<script>
    import User from './components/User.vue';

    export default {
        components: {
            appUser: User
        }
    }
</script>

<style>
    div.component {
        border: 1px solid black;
        padding: 30px;
    }
</style>
```
*in User.vue:*  
1: Add `<button>Change my Name</button>` to template html.  
2: Add `data`-function-property to vue instance.  
3: Return `name`-property in `data-function-property`.   
4: Add click-event `@click="changeName"` to `button`.     
9: Add the binded `:name`-key to `<app-user-detail>`.  
10: Pass the `name`-property to the `:name`-key.
```html
<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my Name</button>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail :name="name"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        data() {
            return {
                name: "Nick"
            }
        },
        methods: {
            changeName() {
                this.name = "Ronan the Accuser"
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>
```
*in UserDetail.vue:*  
6: Add display-area `<p>User Name: {{ name }}</p>` to template html.  
7: Add `props`-array-property to Vue instance.  
8: Add `name`-key to `props`-array.
```html
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ name }}</p>
    </div>
</template>

<script>
    export default {
        props: ['name']
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
```

### -- Using "props" in the Child Component

//

### -- #108 Validating "props"

The `props`-property can not only be an array. For validation it should be an object.

```js
props: {
    myName: String // forces the value to be of type string
    myName: [String, Array] // for multiple types
}
```
It is also possible to define the property as an object for extra options:
```js
props: {
    myName: {
        type: String,
        default: 'Nick'
        // required: true
    }
}
```
### -- #109 Using Custom Events for Child => Parent Communication

in *UserDetails.vue:*  
1: Add `<button>Reset Name</button>` to template html.  
2: Add click-event `@click="ResetName"` to `button`.  
3: Add `resetName`-function-property to Vue instance.  
4: Add `$emit`-method to custom function.  
5: Pass a custom event-name to `$emit`-method as a first argument.  
6: Pass data as a second argument.
```html
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ name }}</p>
        <button @click="resetName">Reset Name</button>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: "Nick"
            }
        },
        // data() {
        //     return {
        //         userName: this.name
        //     };
        // },
        computed: {
            output() {
                return {
                    userName: this.name
                }
            }    
        },
        methods: {
            resetName() {
                this.userName = "Amnesia";
                this.$emit('nameWasReset', this.userName);
            }
        }
    }
</script>
```

*in parent User.vue:*
7: Add the listener `@[customEventName]=` to the component emitting the event.
8: Pass the listener the code to be executed, like a method or the property-change (`"name = $event"`).
```html
<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my Name</button>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail :name="name" @nameWasReset="name = $event"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        data() {
            return {
                name: "Nick"
            }
        },
        methods: {
            changeName() {
                this.name = "van der Sangen";
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>
```

#### ! Use either the `data`- or `computed`-property to resolve conflicts in mutating !

### -- #110 Understanding Unidirectional Data Flow

//

### -- #111 Communicating with Callback Functions

Alternitive for using Custom Events it is possible to use Callback functions.

in *UserDetails.vue:*  
1: Add `<button>Reset Name</button>` to template html.  
2: Add click-event `@click="resetFn"`-prop to `button`.  
3: Add `resetFn`-prop, of type `Function`, to `props`-object in Vue instance.
```html
<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ name }}</p>
        <button @click="resetFn">Reset Name</button>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                default: "Nick"
            },
            resetFn: {
                type: Function
            }
        }
    }
</script>
```

*in parent User.vue:*  
4: Add `resetName`-function-property to `methods`-object in Vue instance. 
5: Add the binded `:resetFn`-key to `<app-user-detail>`.  
6: Pass the `resetName`-property to the `:resetFn`-key.
```html
<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my Name</button>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail :name="name" :resetFn="resetName"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        data() {
            return {
                name: "Nick"
            }
        },
        methods: {
            changeName() {
                this.name = "van der Sangen";
            },
            resetName() {
                this.name = "Nick";
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>
```

### -- #112 Communication between Sibling Components

*in User.vue:*
```html
<template>
    <div class="component">
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail :userAge="age"></app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit :userAge="age"></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        data() {
            return {
                age: 29
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>
```
*in UserDetail.vue:*
```html 
<template>
    <div class="component">
        <p>User Age: {{ userAge }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            userAge: {
                type: Number
            }
        }
    }
</script>
```
*in UserEdit.vue:*
```html
<template>
    <div class="component">
        <p>User Age: {{ userAge }}</p>
        <button @click="editAge">Edit Age</button>
    </div>
</template>

<script>
    export default {
        props: {
            userAge: {
                type: Number
            }
        },
        methods: {
            editAge() {
                this.userAge = 30;
            }
        }
    }
</script>
```
#### Method #1: Setup Custom Event to be emitted
*in UserEdit.vue:*  
1: Call `$emit` in the `editAge`-function.
```js
//methods: {
    //editAge(){
        //this.userAge = 30;
        this.$emit('ageWasEdited', this.userAge);
    //}
//}
```
*in User.vue:*  
2: Setup listener in `<app-user-edit>`-component.
```html
    <app-user-edit @ageWasEdited="age = $event"></app-user-edit>
```
*in UserEdit.vue:*  
3: Resolve mutations bij referring to the passed prop with `data` or `computed`.
```js
//methods: {
    //editAge(){
        //---this.userAge = 30;--- 
        //---this.$emit('ageWasEdited', this.userAge);---
        this.age = this.age
        this.$emit('ageWasEdited', this.age);
    //}
//},
data() {
    return {
        age: this.userAge
    };
},
computed: {
    output() {
        return {
            age: this.userAge
        }
    }    
},
```
#### Method #2: Callback Function
*in UserEdit.vue:*  
1: 1: Add click-event `@click="editAgeFn"`-prop to `button`.  
2: Add `editAgeFn`-prop to `props`-object in Vue instance.
```html
<button @click="editAgeFn">Edit Age</button>
```

```js
 export default {
        props: {
            userAge: {
                type: Number
            },
            editAgeFn: Function
        }
    }
```

*in User.vue:*  
3: Add `:editAgeFn`-key to `<app-user-edit>`.  
4: Pass the `editAge`-property to the `:editAgeFn`-key.
5: Add `editAge`-function to `methods`-object in Vue instance.
```html
<app-user-edit :userAge="age" :editAgeFn="editAge">
```
```js
 methods: {
    editAge() {
        this.age = 30;
    }
},
```
#### Method #3: Event Bus

### -- #113 Using an Event Bus for Communication

*in main.js:*  
1: Create a new Vue instance. **Before mounting**
```js
export const eventBus = new Vue();
```
*in UserEdit.vue:*  
2: Import the new Vue instance.  
3: Call `$emit` on the new Vue instance. 
4: Pass the Custom Event & to-emitted-data. 
```js
import { eventBus } from '../main';

export default {
    props: ['userAge'],
    methods: {
        editAge() {
            this.userAge = 92;
            eventBus.$emit("ageWasEdited", this.userAge);
        }
    }
}
```
*in UserDetail.vue:*  
5: Import the new Vue instance aswell.  
6: Add the `created`-lifecycle-hook-function to the main Vue instance.  
7: Setup `$on`-listener to the Custom Event on the new Vue instance and a callback function. Always pass the data.  
```js
import { eventBus } from '../main';

export default {
    props: ['userAge'],
    created() {
        eventBus.$on('ageWasEdited', (emit) => {
            this.userAge = emit;
        })
    }
}
```

*in both UserDetails.vue & UserEdit.vue:*  
8: Avoid mutating props directly by referring to it in the `data`-function.  
9: Update all other references to `userAge` with `age`.
```js
    data() {
        return {
            age: this.userAge
        }
    },
```

This is managing state of properties across multiple components can very quick be very complicated. To make this simpler VueJS has a great tool called "VueX".

### -- #114 Centralizing Code in an Event Bus

Another way of managing the data is to set the eventBus-instance up as a collection of data & methods.  
It can be any code, accessible from anywhere in your application as long as it is imported and accesses the provided methods on the instance.

*in main.js:*  
1: Create a eventBus-vue-instance.  
2: Add the `data`- & `methods`-object.  
3: Add the `changeAge`-function to the `methods`-object and pass it an argument to which the age can be passed in.  
4: Call the `$emit`-function and pass it the same custom event & the passed argument.
```js
export const eventBus = new Vue({
    data: {

    }, 
    methods: {
        changeAge(newAge){
            this.$emit("ageWasEdited", newAge);
        }
    }
});
```
*in UserEdit.vue:*  
5: Call the `changeAge`-function on the eventBus-instance and pass it the `userAge`-prop.
```js
    methods: {
        editAge(){
            this.userAge = 30;
            //---eventBus.$emit('ageWasEdited', this.userAge);---
            eventBus.changeAge(this.userAge);
        }
    }
``` 
### // Exercise 7

//

### -- Module Resources & Useful Links

- Official Docs - Props: http://vuejs.org/guide/components.html#Props
- Official Docs - Custom Events: http://vuejs.org/guide/components.html#Custom-Events
- Official Docs - Non-Parent-Child Communication: http://vuejs.org/guide/components.html#Non-Parent-Child-Communication

---
---

## Section 9 - Advanced Component Usage

### -- #118 Setting up the Module Project

*in index.html*
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Vue Components</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  </head>
  <body>

    <div id="app"></div>

    <script src="/dist/build.js"></script>
  </body>
</html>
``` 
*in main.js:*
```js 
import Vue from 'vue'
import App from './App.vue'

const vm = new Vue({ 
  ...App
});

vm.$mount('#app');    
```
*in App.vue:*
```html
<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <quote></quote>
            </div>
        </div>
    </div>
</template>
<script>
    import Quote from './components/Quote.vue'

    export default {
        components: {
            Quote
        }
    }
</script>
```
*in Quote.vue:*
```html
<template>
    <div>
        <p>A wonderful Quote!</p>
    </div>
</template>
<script></script>
<style scoped>
    div {
        border: 1px solid #ccc;
        box-shadow: 1px 1px 2px black;
        padding: 30px;
        margin: 30px auto;
        text-align: center;
    }
</style>
```

### -- #119 Passing Content - The Suboptimal Solution

**Using Props:**

*in App.vue:*  
1: Add the attribute `quote` to the `<quote>`-component.  
2: Pass it the quote as a string.
```html
<quote quote="A wonderful Quote!"></quote>
```

*in Quote.vue:*  
3: Add the `quote`-prop to the `quote`-object in the Vue instance.  
4: Express the value of `{{ quote }}` in the template-html.
```html
<p>{{ quote }}</p>

<script>
    export default {
        props: {
            quote: {
                type: String
            }
        }
    }
</script>
```

### -- #120 Passing Content with Slots

*in Quote.vue:*    
1: Add the reserved word **slot** in the template-html.  
```html
<template>
    <div>
        <slot></slot>
    </div>
</template>
```
*in App.vue:*  
2: Contain the html to be injected in the template within the `<quote>`-component.
```html
<quote>
    <h2>The Quote</h2>
    <p>A wonderful Quote</p>
</quote>
```

### -- #121 How Slot Content gets Compiled and Styled

Add styling to the child-component where the html is rendered.  
Everything else is handled on the parent-component.

### -- #122 Using Multiple Slots (Named Slots)

Split the HTML by adding names to the slot's content with the `slot`-attribute.

*in App.vue:*
```html
<quote>
    <h2 slot="title">{{ quoteTitle }}</h2>
    <p slot="content">A wonderful Quote!</p>
</quote>
```
*in Quote.vue:*
```html
<div class="title">
    <slot name="title"></slot>
</div>
<hr>
<div>
    <slot name="content"></slot>
</div>
```
### -- #123 Default Slots and Slot Defaults

VueJs will treat the unnamed `<slot>` as the "default"-slot: Everything that is passed in which doesn't have a named-slot assigned, will automaticly be rendered in the default slot.

### -- #124 A Summary on Slots

//

### -- #125 Switching Multiple Components with Dynamic Components

// 

### -- #126 Understanding Dynamic Component Behavior

On switching between components the current component gets destroyed and a new one is created.

### -- #127 Keeping Dynamic Components Alive

Wrap the reserved tag `<component>` in another reserved tag `<keep-alive>` to preserve the state.

### -- #128 Dynamic Component Lifecycle Hooks

Two new lifecycle hooks:

```js
    deactivated() {},
    activated() {}
```

### // Exercise 8: Slots and Dynamic Components

//

### -- #130 Module Resources & Helpful Links

- Official Docs - Slots: http://vuejs.org/guide/components.html#Content-Distribution-with-Slots
- Official Docs - Dynamic Components: http://vuejs.org/guide/components.html#Dynamic-Components
- Offical Docs - Misc: http://vuejs.org/guide/components.html#Misc

## // Project: Wonderful Quotes

## Section 11 - Handling User Input with Forms

### -- A Basic input Form Binding
*in App.vue:*
```html
<template>
    <div class="form-group">
        <label for="email">Mail</label>
        <input type="text" id="email" class="form-control" v-model="user.email">
    </div>

    <div class="panel-body">
        <p>Mail: {{ user.email }}</p>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          user: {
            email: ''
          }
        }
      }
    }
</script>
```

VueJS checks what the source is of the editting and automatically update the corresponding property.

### -- #146 Modifying User Input with Input Modifiers

By default the input-field gets updated at every input.  
By adding the modifier `lazy` to the `v-model` it gets update at every change.

```html
<input type=text v-model.lazy="userData.password" />
```

- `trim` to trim any whitespace in the beginning and end.
- `number` to force conversion to number instead of string.

### -- #147 Binding textarea and Saving Line Breaks

To preserve line breaks in the `<textarea>`, add the CSS-property `white-space: pre` to the output element to keep the multiline string.

```html
<textarea v-model="message"></textarea>

<p style="white-space: pre">{{ message }}</p>
```
### -- #148 Using Checkboxes and Saving Data in Arrays

1: Create a `data`-property which is an array.  
2: Add the `v-model` to the checkbox' input-fields.
3: Loop through the array and show each item.
```html
<input type="chekbox" value="Promotions" v-model="sendMail"/>
<input type="chekbox" value="News" v-model="sendMail"/>

<ul>
    <li v-for="mail in sendMail" :key="mail.id">{{ mail }}</li>
</ul>

<script>
    data () {
        sendMail: []
    }
</script>
```

### -- #149 Using Radio Buttons
By adding the `v-model="gender"`-attribute VueJS knows all the input-fields with `type="radio"`, which hold the added attribute, belong to the same group.

### -- #150 Handling Dropdowns with select and option

//

### -- #151 What v-model does and How to Create a Custom Control

`v-model` does two things behind the scenes:
1. It binds to the value with `:[value]` or `v-bind:[value]`
2. It enables the (default) `@input`-listener.

### -- #152 Creating a Custom Control (Input)

// 

### -- #153 Submitting a Form

1: Add a click-listener to the submit-button.
2: Add the `prevent`-modifier.
3: Pass it the custom event `"submitted".`

```html
    <button class="btn btn-primary" @click.prevent="submitted"></button>
```

### // Exercise 9: Forms

// 

### -- #155 Module Resources & Useful Links

Official Docs - Forms: http://vuejs.org/guide/forms.html

---
---

## Section 12 - Using and Creating Directives

### -- #157 Understanding Directives

Register a custom directive globally:
*in main.js*
```js
Vue.directive('highlight'); // v-highlight
```

### -- #158 Hooks

- `bind(el, binding, vnode)`: Fired as soon as the directive is bound to the element. "binding" & "vnode" should be treated as **Read-Only**.
- `inserted(el, binding, vnode)`: Fired as soon as it is inserted in the DOM.
- `update(el, binding, vnode, oldVnode)`: Fired as soon as the element updates without children
- `componentUpdated(el, binding, vnode, oldVnode)`: Once component is updated with children
- `unbind(el, binding, vnode)`: Whenever the directive is removed

```js
Vue.directive('highlight', {
    bind(el, binding, vnode){
        // el.style.backgroundColor = 'green'
        // el.style.backgroundColor = binding.value
        if(binding.arg == 'background'){
            el.style.backgroundColor = binding.value;
        } else {
            el.style.color = binding.value;
        }
    }
});
```

### -- #162 Modifying a Custom Directive with Modifiers

// 

### -- #164 Registering Directives Locally
```html
<p v-local-hightlight:background.delayed="'red'">Color this, too</p>
```
```js
    export default {
        directives: {
            localHighlight: {
                bind(el, binding, vnode){
                    ...
                }
            }
        }
    }
 ```

 ### -- #168 Module Resources & Useful Links

 Official Docs - Custom Directives: http://vuejs.org/guide/custom-directive.html

 ---
 ---

 ## Section 13 - Improving your App with Filters and Mixins

 ### -- 170 Creating a Filter
```html
    <div>{{ text | toUppercase | to-lowercase }}</div>
```

 Global: 
 *in main.js:*
 ```js
    Vue.filter('to-lowercase', function(value) {
        return value.toLowerCase();
    });
 ```

 Local:
 *in [component].vue*
 ```js
 export default {
     data() {
         return {
             text: 'Hello there!'
         }
     },
     filters: {
        //  'to-uppercase'
        toUppercase(value) {
            return value.toUpperCase()
        }
     }
 }
 ```
### -- #172 An (often-time better) Alternative to Filters: Computed Properties

*in App.vue:*
```html
<template>
    <input v-model="filteredText" />
    <ul>
        <li v-for="fruit in filteredFruits" :key="fruit.id">
            {{ fruit }}
        </li>
    </ul>
</template>
<script>
    export default {
        data() {
            return {
                fruits: [
                    'Apple',
                    'Banana',
                    'Mango', 
                    'Melon'
                ],
                filterText: ''
            }
        }, 
        computed: {
            filteredFruits() {
                return this.fruits.filter((fruit) => {
                    return fruit.match(this.filterText);
                });
            }
        }
    }
</script>
```

Filters can be a nice solution, but often computed properties are better solutions!

### -- #173 Creating and Using Mixins

1: Create a mixin-file called "fruitMixin".
*in fruitMixin.js:*
```js
    export const fruitMixin = {
        data() {
            return { 
                fruits: ['Apple', 'Banana', 'Mango', 'Melon']
            }
        }
        computed: {
            filteredFruits() {
                return this.fruits.filter((fruit) => {
                    return fruit.match(this.filterText);
                });
            }
        }
    };
```

*in App.vue:*
```html
<script>
    import { fruitMixin } from '[path-to]/fruitMixin'

    export default {
        mixins: [
            fruitMixin
        ],
        data() {
            return { 
                // fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
                filterText: ''
            }
        }
        // ,computed: {
        //     filteredFruits() {
        //         return this.fruits.filter((fruit) => {
        //             return fruit.match(this.filterText);
        //         });
        //     }
        // }
    }
</script>
```
### -- How Mixins get Merged

Mixins first, then components.

### -- Creating a Global Mixin (Special Case)

// 

### // Exercise 11 - Filters & Mixins

// 

### -- #179 Module Resources & Useful Links

Official Docs - Filters: http://vuejs.org/v2/guide/filters/html
Official Docs - Mixins: http://vuejs.org/guide/mixins/html 

---
---

## Section 14 - Adding Animations and Transitions

### -- #180 Module Introduction



---
---

## Section 15 - Connecting to Servers via Http - Using vue-resource

### -- #209 Accessing Http via vue-resource - Setup

https://github.com/vuejs/vue-resource

Install vue-resource package as a production development: `npm i -S vue-resource`

Add/configure the plugin to the application with the new method on the global vue object `use()`:

*in main.js:*
```js
import VueResource from 'vue-resource';

Vue.use(VueResource);
```

### -- #211 Data to the Server

*in App.vue:*
```js
this.$http.get('/someUrl', {params: {foo: 'bar'}})
    .then(response => {
        // success callback
    }, reject => {
        // error callback
    })
```

Use the `response.json()`-method to convert the string to an object if it not already is. It returns a Promise instead of the data right away. Therefor just return the Promise and chain another `.then()`-method.

*in App.vue:*
```js
fetchDdata() {
    this.$http.get('/someUrl')
        .then(response => {
            return response.json();
        }).then(data => {
            // access to the data!
        });
}
```

A central place for the url to be stored is after the VueResource usage without the $.
*in main.js:*
```js
// Vue.use(VueResource);
Vue.http.options.root = 'http://www.omdbapi.com/' // relative path
```
### -- #214 Intercepting Requests
An array of functions to be executed on each request

*in main.js:*
```js
Vue.http.interceptors.push((request, next) => {
    // console.log(request);
    // request.method = 'PUT';
    next();
});
```

### -- #216 Where the "resource" in vue-resource Comes From
*in App.vue:*
```js
data(){
    return {
        resource: {}
    }
},
created() {
    this.resource = this.$resource('someUrl').get();
}
```

## Section 16 - Routing in a VueJS Application
### -- #224 Setting up and loading routes
1 Install vue-router as a dependency
```bash
npm i -S vue-router
```

2 Include vue-router  
*in main.js:*
```js
// import Vue from 'vue'
import VueRouter from 'vue-router';
// import App from './App.vue';
import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
});

// const vm = new Vue({
//  ...App,
 router
// });

// vm.$mount('#app');
```
3 Create routes-file  
*in main.js:*
```js
import Home from './components/Home.vue';
import User from './components/user/User.vue';

export const routes = [
    { path: '', component: Home }, 
    { path: '/user', component: User }
];
```
4 Include the `<router-view>`-marker in App.vue to tell VueJS where to load the current routeComponent.

### -- #225 Understanding Routing Modes (Hash vs History)

Needs to have a configured server in deployment where the index.html is always served.
webpack-dev-server already is properly configured.  
*in main.js:*
```js
// const router = new VueRouter({
//   routes: routes,
  mode: 'history'
// });
```
### -- #226 Navigating with Router Links

Instead of using an `<a>`-tag, use the `<router-link>`-tag with the `to=""`-attribute. Which will render an anchor-tag and the correct routes.  
*in Header.vue:*
```html
<li role="presentation"><router-link to="/">Home</router-link></li>
<li role="presentation"><router-link to="/user">User</router-link></li>
```

### -- #227 Where am I? - Styling Active Links

Attach Bootstrap's 'active'-class to the `<li>`.  
The problem in the example above is that the `<router-link>` is used as an anchor-tag and not as the parent list-item.   
Therefor the classname 'router-link-active' is wrong. And it's replacing the wrong element.

Solve this by:
1) Replace the `<li>` with `<router-link>`.
2) Set the `tag`-attribute of the `<router-link>` to `li` to render it as a list-item.
3) Nest the `<a>` inside without any attributes.
4) Set the `active-class`-attribute to Bootstrap's classname 'active'.
```html
<router-link tag="li" to="/" active-class="active" exact>
    <a>Home</a>
</router-link>
<router-link tag="li" to="/user" active-class="active">
    <a>User</a>
</router-link>
```

This results in an issue: 'Home' stays selected at all times.  
This is because the default behaviour of the active-class is that it looks at where this link links to, so just '/' and then it looks at the url. By default it marks the link as active whenever the url starts with the path passed to the `to=""`-attribute. Clearly, all the urls start with '/' after the domain. Which is great for nested routes, for example on `user/{id}' and the 'user'-link needs to stay active.  
It isn't desired behaviour in the case above though, where the root-route shouldn't be active all the time.

Solve this by:
1) Adding another configuration-attribute `exact` to the router-link which will overwrite the default to be an exact match.

### -- #228 Navigating from Code (Imperative Navigation)
*in User.vue:*
```html
<template>
    <div>
        <h1>The User Page</h1>
        <hr>
        <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
    </div>
</template>
<script>
export default {
  methods: {
      navigateToHome() {
          this.$router.push({
              path: '/'
          });
      }
  }
}
</script>
```

### -- #229 Setting Up Route Parameters
Pass an parameter like 'id' to the route
*in routes.js:*
```js
{ path: '/user/:id', component: User }
```

### -- #230 Fetching and Using Route Parameters
*in Header.vue:*
```html
<router-link tag="li" to="/user/10" active-class="active"><a>User</a></router-link>
  </ul>
```
*in User.vue:*
```html
<p>Loaded ID: {{ id }}</p>
```
```js
data() {
    return {
        id: this.$route.params.id
    }
},
```

### -- #231 Reacting to Changes in Route Parameters
VueJS will not recreate the Component and therefor the 'id'-output is not updated.

Solve this by watching the params to change and update if needed:
1) Setup a watcher
```js
...
watch: {
    '$route'(to, from) {
        this.id = to.params.id
    }
}
...
```

### -- #232 Extract Route Params via "props"
As of vue-router version 2.2, you can also bind your route params to props of the target components. This eliminates the need of watch ing $route .

There are three ways of using this feature, check this official example to learn more: https://github.com/vuejs/vue-router/tree/dev/examples/route-props

You can basically either pass a static value, bind a dynamic value to props or use a function to also convert your dynamic value.

*in routes.js:*
```js
{ path: '/user/:id', component: User, props: true }
```
*in User.vue:*
```js
 props: ['id'],
//  watch: {
//     '$route'(to, from) {
//         this.id = to.params.id
//     }
// }
```
### -- #233 Setting Up Child Routes (Nested Routes)
*in routes.js:*  
1) Import the child components:
```js
// import Home from './components/Home.vue';
// import User from './components/user/User.vue';
import UserStart from './components/user/UserStart.vue';
import UserDetail from './components/user/UserDetail.vue';
import UserEdit from './components/user/UserEdit.vue';

// export const routes = [
    // { path: '', component: Home }, 
    { path: '/user', component: User, children: [
        { path: '', component: UserStart },
        { path: ':id', component: UserDetail },
        { path: ':id/edit', component: UserEdit }
    ], props: true }
// ];
```
*in Header.vue:*  
2) Link to User-component
```html
<router-link tag="li" to="/user" active-class="active"><a>User</a></router-link>
```

*in User.vue:*  
3) Load childcomponents in User.vue
```html
<router-view></router-view>
```

### -- #234 Navigating to Nested Routes
*in UserStart.vue:*
```html
<router-link tag="li" to="/user/1" class="list-group-item" style="cursor: pointer">User 1</router-link>
<router-link tag="li" to="/user/2" class="list-group-item" style="cursor: pointer">User 2</router-link>
<router-link tag="li" to="/user/3" class="list-group-item" style="cursor: pointer">User 3</router-link>
```
*in UserDetail.vue:*
```html
<p>User loaded has ID: {{ $route.params.id }}</p>

---

<p>User loaded has ID: {{ id }}</p>

<script>
    export default {
        props: ['id']
    }
</script>
```
*in routes.js:*
```js
 { path: ':id', component: UserDetail, props: true },
```

### -- #235 Making Router Links more Dynamic
*in UserDetail.vue:*
```html
<router-link tag="button" :to="'/user/' + id + '/edit'" class="btn btn-primary">Edit User</router-link>
```

### -- #236 A Better Way of Creating Links - With Named Routes
*in routes.js:*
```js
{ path: ':id/edit', component: UserEdit, name: 'userEdit' }
```

*in UserDetail.vue:*
```html
<router-link tag="button" :to="{ name: 'userEdit', params: { id: id } }" class="btn btn-primary">Edit User</router-link>
```

### -- #237 Using Query Parameters
*in UserDetail.vue:*
```html
<router-link tag="button" 
    :to="{ 
        name: 'userEdit', 
        params: { 
            id: id 
        },
        query: {
            locale: 'en',
            q: 100 
        }
    }" class="btn btn-primary">
    Edit User
</router-link>
```
*in UserEdit.vue:*
```html
<p>Locale: {{ $route.query.locale }}</p>
<p>Analytics: {{ $route.query.q }}</p>
```

### -- #238 Multiple Router Views
...

### -- #239 Redirecting
*in routes.js:*
```js
{ path: '/redirect-me', redirect: { name: 'home' } }
```

### -- Setting Up "Catch All" Routes / Wildcards
*in routes.js*
```js
{ path: '*', redirect: { name: 'home' } }
```

### -- Animating Route Transitions

### -- Passing the Hash Fragment

### -- 242 Controlling the Scoll Behavior

### -- 243 Protecting Routes with Guards

### -- 244 Using the "beforeEnter" Guard
1) Gets executed on each routing action. Execute `next()` to continue or `next(false)`, or passing a path or object.
*in main.js:*
```js
router.beforeEach((to, from, next) => {
    console.log('global beforeEach');
    next(); // continues journey
});
```
2) Guard certain routes: userDetail-route:
*in routes.js:*
```js
{
    path: ':id',
    component: UserDetail,
    beforeEnter: (to, from, next) => {
        console.log('inside route setup');
        next();
    }
}
```

Now a new hook is available thanks to the VueRouter:

*in UserDetail.vue:*
```js
// export default {
    beforeRouteEnter(to, from, next) {
        
        // You can't access components properties from here, because they are not fully rendered yet!

        if(true){
            next();
        } else {
            next('false');
        }
    }
// }
```
### -- 246 Using the "beforeLeave" Guard

### -- 247 Loading Routes Lazily
1) Transfer `import`'s into another syntax which webpack will recoginze, not include it into the initial bundle but will create several other bundles.

*in routes.js:*
```js
// import User from './components/user/User.vue';

// Async
const User = resolve => {
    require.ensure([
        './components/user/User.vue' // Whenever we want to load something which lives in this place './components/user/User.vue':
    ], () => {
        resolve(require('./components/user/User.vue')); // Execute this function, which is basicly like a promise and resolves the path. Now webpack will only get this if we actually need this file.
    }, 'user'); // You can also group the component-bundles together by adding a third parameter to the `require.ensure()`-method, the group name: 

    //All the components which share the same group name will be bundled together.
};

// import UserStart from './components/user/UserStart.vue';

const UserStart = resolve => {
    require.ensure([
        './components/user/UserStart.vue'
    ], () => {
        resolve(require('./components/user/UserStart.vue'));
    }, 'user');
};

// import UserEdit from './components/user/UserEdit.vue';

const UserEdit = resolve => {
    require.ensure([
        './components/user/UserEdit.vue'
    ], () => {
        resolve(require('./components/user/UserEdit.vue'));
    }, 'user');
};

// import UserDetail from './components/user/UserDetail.vue';

const UserDetail = resolve => {
    require.ensure([
        './components/user/UserDetail.vue'
    ], () => {
        resolve(require('./components/user/UserDetail.vue'));
    }, 'user');
};
```

## Section 17 - Vuex

This pattern has the idea of using a (Central) Store which holds the state.

### -- 253 Using the "Centeralized State"
1) Install helpers through npm: 
```bash
npm i -S vuex
```
2) Create store-directory and store.js-file.  

*in store/store.js:*
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Create new store
export const store = new Vuex.Store({
    state: {
        // store all the properties the app has
        counter: 0
    }
});
```
3) Register the store in the root Vue-instance  

*in main.js:*
```js
// Register the store in the root Vue-instance
import { store } from './store/store.js';

// new Vue({
//  ..App,
    store // es6 for store: store
// });
```
4) Replace customEventListener with `$store`-reference.

*in components/Counter.vue:*
```html
<template>
    <div>
        <button class="btn btn-primary" @click="increment">Increment</button>
        <button class="btn btn-primary" @click="decrement">Decrement</button>
    </div>
</template>

<script>
    export default {
        methods: {
            increment() {
                // this.$emit('updated', 1);
                // Access store:
                this.$store.state.counter++;

            },
            decrement() {
                // this.$emit('updated', -1);
                // Access store:
                this.$store.state.counter--;
            }
        }
    }
</script>
```
5) Replace `props`-property-array with `computed`-property-object which returns the stored state of the corresponding property `counter`.

*in components/Result.vue:*
```html
<template>
    <p>Counter is: {{ counter }}</p>
</template>

<script>
    export default {
        // props: ['counter']
        computed: {
            counter() {
                return this.$store.state.counter;
            }
        }
    }
</script>
```

6) Remove dynamic attributes from component-tags and `data`-property-object from default-object.

*in App.vue:*
```html
<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Vuex</h1>
                <!-- <app-result :counter="counter"></app-result> -->
                <app-result></app-result>
                <hr>
                <!-- <app-counter @updated="counter += $event"></app-counter> -->
                <app-counter></app-counter>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './components/Counter.vue';
    import Result from './components/Result.vue';

    export default {
        // data() {
        //     return {
        //         counter: 0
        //     }
        // },
        components: {
            appCounter: Counter,
            appResult: Result,
        }
    }
</script>
```

### -- 254 Why a Centralized State Alone Won't Fix It

#DuplicateCode

### -- 256 Using Getters
1) Add a new property `getters`.

*in store/store.js:*
```js
// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// Create new store
// export const store = new Vuex.Store({
//     state: {
//         counter: 0
//     },
    getters: {
        doubleCounter: state => {
            return state.counter * 2;
        }
    }
// });
```
2) Access the getters in the components.

*in components/Result.vue & components/AnotherResult.vue:*
```js
// export default {
    computed: {
        counter() {
            return this.$store.getters.doubleCounter;
        }
    }
// }
```
### -- 257 Mapping Getters to Properties

Vuex has a helper-method which will create all the computed properties needed.

1) Import the helper-function `mapGetters`;

*in components/AnotherResult.vue:*
```html
<template>
    <div>
        <p>Counter is: {{ doubleCounter }}</p>
        <p>Number of Clicks: {{ stringCounter }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: { 
        ...mapGetters([ 
            'doubleCounter', 
            'stringCounter'
        ])
        // , ourOwnProperties
    }

    // OR
    // mapGetters({
        // dblCnt: doubleCounter,
        // strCnt: stringCounter
    // })
}
</script>
```
Optional: update dependency if not transpiled properly: `
```bash
npm i -D babel-preset-stage-2
```
& 
*in .babelrc:*
```json
presets {
    "presets": [
        ["es2015", { "modules": false}],
        ["stage-2"]
    ]
}
```

### -- 259 Using Mutations

1) Add a new property `mutations`.

*in store/store.js:*
```js
// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// Create new store
// export const store = new Vuex.Store({
//     state: {
//         counter: 0
//     },
    // getters: {
    //     doubleCounter: state => {
    //         return state.counter * 2;
    //     }
    // },
    mutations: {
        increment: state => {
            state.counter++;
        },
        decrement: state => {
            state.counter--;
        }
    }
// });
```

*in components/Counter.vue:*
```html
<template>
    <div>
        <button class="btn btn-primary" @click="increment">Increment</button>
        <button class="btn btn-primary" @click="decrement">Decrement</button>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        methods: {
            ...mapMutations([
                'increment', 
                'decrement'
            ])
            // increment() {
            //     // this.$store.state.counter++;
            //     this.$store.commit('increment'); // Pass mutation as a string!
            // },
            // decrement() {
            //     // this.$store.state.counter--;
            //     this.$store.commit('decrement');
            // }
        }
    }
</script>
```

### -- 260 Why Mutations have to run Synchonously

Otherwise the main benifit of it having a easy-to-track adjustment of your state, you can't track which mutation was responsible for each change!

### -- 262 Using Actions

1) Add a new property `actions`.

*in store/store.js:*
```js
...
    // mutations: {
    //     increment: state => {
    //         state.counter++;
    //     },
    //     decrement: state => {
    //         state.counter--;
    //     }
    // },
    actions: {
        increment: context => {
            context.commit('increment');
        },
        decrement: context => {
            context.commit('decrement');
        },
        asyncIncrement: ({commit}) => {
            setTimeout(() => {
                commit('increment');
            }, 1000);
        },
        asyncDecrement: ({commit}) => {
            setTimeout(() => {
                commit('decrement');
            }, 1000);
        }

        // OR to only use the commit-method:
        increment: ({ commit }) => {
            commit('increment');
        }
    }
// });
```
*in components/Counter.vue:*
```html
<template>
    <div>
        <button class="btn btn-primary" @click="increment">Increment</button>
        <button class="btn btn-primary" @click="decrement">Decrement</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions([
                'increment', 
                'decrement'
            ])
        }
    }
</script>
```
### -- 263 Mapping Actions to Methods

Passing parameters to actions

### -- 264 A Summary of Vuex

### -- 265 Two-Way Binding and Vuex
1) Transform the computed property to an object with the properties `get` & `set`.

!! Use with caution !!

```js
computed: {
    value: {
        get() {
            return this.$store.getters.value;
        }
        set(value) {
            this.$store.dispatch('updateValue', value);
        }
    }
}
```
### -- 266 Improving Folder Structures

Create a "modules"-folder as a child of the "store"-folder.

### -- 267 Modularizing the State Management

```
store
|   | modules
|   |   | counter.js
|   |   | value.js
```

*in counter.js:*
```js
const state = {
    counter: 0
};

const getters = {
    doubleCounter: state => {
        return state.counter * 2;
    },
    stringCounter: state => {
        return state.counter + ' Clicks';
    }
};

const mutations = {
    increment: (state, payload) => {
        state.counter += payload;
    },
    decrement: (state, payload) => {
        state.counter -= payload;
    }
}

const actions = {
    increment: (context, payload) => {
        context.commit('increment', payload);
    },
    decrement: (context, payload) => {
        context.commit('decrement', payload);
    },
    asyncIncrement: ({ commit }, payload) => {
        setTimeout(() => {
            commit('increment', payload.by);
        }, payload.duration);
    },
    asyncDecrement: ({ commit }, payload) => {
        setTimeout(() => {
            commit('decrement', payload.by);
        }, payload.duration);
    }
};

export default {
    state, getters, mutations, actions
}
```
Import the exported state components
*in store.js:*
```js
import counter from './modules/counter';

...

modules: {
    counter
}
```

### --- 268 Using Separate Files
```
store
|   | modules
|   |   | counter.js
|   |   | value.js

|   | actions.js
|   | mutations.js
|   | getters.js
```
*in actions.js:*
```js
export const updateValue = (context, payload) => {
    context.commit('updateValue', payload);
};
```
Import the exported actions:

*in store.js:*
```js
import * as actions from 'actions';

... 
// actions: {}
actions,

```
### --- 269 Using Namespaces to Avoid Naming Problems

1) Create a "types.js"-file as a child of the store-folder.
2) Setup constants with unique names to be assigned for methods, properties etc. in all other files.

*in types.js:*
```js
export const DOUBLE_COUNTER = 'counter/DOUBLE_COUNTER';
export const CLICK_COUNTER = 'counter/CLICK_COUNTER';
```
3) Import types in other files:

*in counter.js:*
```js
import * as types from 'types';

... 
const getters = {
    [types.DOUBLE_COUNTER]: state => { // es6 set dynamic propertyname on runtime. will be a string.
        return state.counter * 2;
    }
    ...

```

*in AnotherCounter.vue:*
```js
import * as types from 'types';
... 
computed: {
    ...mapGetters({
        doubleCounter: types.DOUBLE_COUNTER
    ...
```

### 270 AUTO-namespacing with Vuex 2.1

If you're using Vuex version 2.1 or higher, you may use its auto-namespacing feature to avoid having to set up all the namespaces manually. You may learn more about it here: https://github.com/vuejs/vuex/releases/tag/v2.1.0

### 272 Module Resources & Useful Links

Vuex Documenation: https://vuex.vuejs.org/en/

## Section 18 - The Stock Trader

1) Setup new Vue Project.
```bash
vue init webpack-simple section-18-stocktrader
```

2) Add Bootstrap 3.3.7 and clear default Vue-files.
3) Setup components
```
| App.vue
| main.js
| components
| | Home.vue
| | Header.vue
| | portfolio
| | | Portfolio.vue
| | | Stock.vue
| | stocks
| | | Stock.vue
| | | Stocks.vue
```
4) Install Vue Router:
```bash
npm i -S vue-router
```
5) Enable VueRouter in main.js.
6) Setup routes in routes.js.
7) Add router to main Vue-instance.
8) Load the routed-components in App.vue