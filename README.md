# Salesforce Lookup Component (Aura version)
Lightning Web Component version is available [here](https://github.com/pozil/sfdc-ui-lookup-lwc).

<p align="center">
    <img src="screenshots/lookup-animation.gif" alt="Lookup animation"/>
</p>

<img src="screenshots/dropdown-open.png" alt="Lookup with dropdown open" width="350" align="right"/>

## About
This is a generic &amp; customizable lookup component built using Salesforce Lightning (Aura) and [SLDS](https://www.lightningdesignsystem.com) style.<br/>
It does not rely on third party libraries and you have full control over its datasource.

<b>Features</b>

The lookup component provides the following features:
- customizable data source that can return mixed sObject types
- single or multiple selection mode
- client-side caching & request throttling
- built-in server request rate limit mechanism

<p align="center">
    <img src="screenshots/selection-types.png" alt="Multiple or single entry lookup"/>
</p>

## Documentation
The lookup component is documented using Aura documentation.<br/>
You can access it from this URL (replace the domain):<br/>
https://<b>&lt;YOUR_DOMAIN&gt;</b>.lightning.force.com/docs/component-library/bundle/c:Lookup/documentation

Follow these steps in order to use the lookup component:

### Basic use

#### 1) Write the search endpoint

Implement an Apex `@AuraEnabled` method (`SampleLookupController.search` in our samples) that returns the search results as a `List<LookupSearchResult>`.
The method name can be different but it needs to match this signature:

```apex
@AuraEnabled
public static List<LookupSearchResult> search(String searchTerm, List<String> selectedIds) {}
```

#### 2) Handle the `search` event and pass the results to the lookup

The lookup component exposes an `onSearch` component event that is fired when a search needs to be performed on the server-side.
The parent component that contains the lookup must handle the `onSearch` event:
```xml
<c:Lookup selection="{!v.selection}" onSearch="{!c.lookupSearch}" label="Search"/>
```

The event handler should do the following:
```js
lookupSearch : function(component, event, helper) {
    // Get the lookup component that fired the search event
    const lookupComponent = event.getSource();
    // Get the Apex server-side action associated with this search (`search` in our samples)
    const serverSearchAction = component.get('c.search');
    // Passes the action to the lookup component by calling the `search` aura method
    lookupComponent.search(serverSearchAction);
}
```

### Advanced use case: custom search parameters
If you need to pass custom parameters like a record id to the Apex search method, you can write the following search event handler:

```js
lookupSearch : function(component, event, helper) {
    // Get the lookup component that fired the search event
    const lookupComponent = event.getSource();
    // Get the SampleLookupController.search server side action
    const serverSearchAction = component.get('c.search');
    // You can pass optional parameters to the search action
    // but you can only use setParam and not setParams to do so
    serverSearchAction.setParam('recordId', component.get('v.recordId'));
    // Passes the action to the Lookup component by calling the search method
    lookupComponent.search(serverSearchAction);
},
```

And use a custom Apex search method with your extra parameters:

```apex
@AuraEnabled(cacheable=true)
public static List<LookupSearchResult> search(String searchTerm, List<String> selectedIds, String recordId) {

}
```

### Advanced use case: lookups in an iteration
If you use lookups in an iteration and need to adjust the search logic based on some iteration parameter, follow these steps.

Wrap the Lookup in a `div` with a dynamic dataset attribute like so:
```xml
<aura:iteration items="{!v.rows}" var="row" indexVar="index">
  <div data-row-index="{!index}">
    <c:Lookup .../>
  </div>
<aura:iteration>
```

Then, in your search function, do that:
```js
lookupSearch : function(component, event, helper) {
  // Get the lookup component that fired the search event
  const lookupComponent = event.getSource();
  // Get the row index from the parent div
  const rowIndex = lookupComponent.getElement().parentNode.dataset.rowIndex;

  // Handle the rest of the search logic
  // You can use different search endpoints depending on the row index for example
}
```


## Salesforce DX setup instructions
Deploy the sample application with Salesforce DX by clicking on this button:

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://deploy-to-sfdx.com)


## Sample application
The default installation installs the lookup component and a sample application available under this URL (replace the domain):<br/>
https://<b>&lt;YOUR_DOMAIN&gt;</b>.lightning.force.com/c/SampleLookupApp.app

If you wish to install the project without the sample application, edit `sfdx-project.json` and remove the `src-sample` path.
