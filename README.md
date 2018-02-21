# Salesforce Lightning Lookup Component

<img src="screenshots/dropdown-open.png" width="350" align="right"/>

## About
This is a generic &amp; customizable lookup component built using Salesforce Lightning and [SLDS](https://www.lightningdesignsystem.com/) style.
It does not rely on third party libraries and you have full control over its datasource.

<b>Features</b>

The Lightning Lookup component provides the following features:
- customizable data source that can return mixed sObject types
- single or multiple selection mode
- client-side caching
- built-in server request rate limit mechanism

<img src="screenshots/multiple-selection.png" width="350" align="right"/>


## Documentation
Component is documented using Aura documentation.
You can access it from this URL (replace the domain):
https://<b>&lt;YOUR_DOMAIN&gt;</b>.lightning.force.com/auradocs/reference.app#reference?descriptor=c:Lookup&defType=component


## Sample application
Check out the [sample application](https://github.com/pozil/sfdc-ui-modal-sample).


## Salesforce DX setup instructions
Create scratch org:<br/>
`sfdx force:org:create -s -f config/project-scratch-def.json -a lookup`

Push app source:<br/>
`sfdx force:source:push`

Log in and open the sample app:<br/>
`sfdx force:org:open -p c/SampleLookupApp.app`
