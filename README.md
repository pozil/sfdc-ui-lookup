# Salesforce Lightning Lookup Component

## Salesforce DX setup instructions

Create scratch org:<br/>
`sfdx force:org:create -s -f config/project-scratch-def.json -a lookup`

Push app source:<br/>
`sfdx force:source:push`

Log in the org:<br/>
`sfdx force:org:open -p c/SampleLookupApp.app`

Run Apex tests (optional):<br/>
`sfdx force:apex:test:run -w 10 -c -r human`