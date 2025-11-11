# CSAF in DevGuard

- In Asset Settings go to "Enable public access to vulnerability data"
- Now the global lister available under /.well-known/csaf-aggregator/aggregator.json should list your org as provider
- The next file like https://api.main.devguard.org/api/v1/organizations/l3montree-cybersecurity/csaf/provider-metadata.json/ should list the asset inside the distributions array
- It should point to a "directory_url" like this: https://api.main.devguard.org/api/v1/organizations/l3montree-cybersecurity/projects/devguard/assets/devguard/csaf/white/2025/
- There should be a report for each and every vulnerability ever happened in that asset

- Consuming those can be done in the artifact form when creating an artifact  or updating an artifact
- To use csaf as upstream, you need to add the org provider-metadata.json url and the correct purl of the asset. Like this e. g. "canonical_url": https://api.main.devguard.org/api/v1/organizations/l3montree-cybersecurity/csaf/provider-metadata.json/ and this pkg:oci/devguard@v0.19.0?repository_url=ghcr.io/l3montree-dev/devguard
- Same upstream event handling

## Table of Contents
	1. [What is CSAF?]
	2. How to setup CSAF in DevGuard?
	3. Where to find CSAF-Reports for my Asset?
	4. What to find in DevGuards CSAF Reports?
	
*Make Table of Contents clickable* 

## What is CSAF 

The **CSAF (Common Security Advisory Framework)** standard is an open format for providing security advisories in a structured, machine-readable way. Instead of publishing vulnerability information as free-form text, vendors can use CSAF to deliver clearly defined JSON documents. The goal is to make security information easier to process automatically—for example in vulnerability management tools or security dashboards. This helps reduce manual effort when interpreting advisories and enables organizations to respond more quickly and reliably to potential security risks.

In DevGuard we decided to use CSAF to provide information about the current state of your dependency-vulnerabilities in your assets. In particular each CVE in your asset has its own report, showing the history of the CVE over its lifetime, as well as additional information about the vulnerability like VEX states, what packages are affected as well as a description about the CVE. This means once you scanned your repository you can start publishing CSAF reports as a **CSAF trusted provider**.

## How to setup CSAF in DevGuard

- Navigate to your **Organization** then **Settings** . There you can enable CSAF reports and also configure them for your liking.
		- *Explain each attribute and configuration*
		- *Need images to display feature in DevGuard*
##  Where to find CSAF-Reports for my Asset

- After you successfully enabled CSAF reports for your organization you can find your reports in the **Asset** section. These reports are automatically generated and adjusted when the vulnerability state of your asset changes.
-  *Need images to display feature in DevGuard*

## What to find in DevGuards CSAF Reports?

As previously mentioned each CSAF report covers one vulnerability of your asset. Each Report consists of **Document** object and a **Vulnerabilities** object.

### Document Object

The **Document** object includes general metadata for from your organization, like name and contact details. These values, if not configured otherwise, are pulled from your **DevGuard Organization Settings**. 

```json
"document": {
	"category": "csaf_vex",
	"csaf_version": "2.0",
	"distribution": {
		"tlp": {
			"label": "WHITE",
			"url": "https://first.org/tlp"
		}
	},
	"publisher": {
		"category": "vendor",
		"name": "Test Org",
		"namespace": "https://devguard.org"
	},
	"source_lang": "en-US",
	"title": "Vulnerability history of asset: test",
	...
```

The **name** and **id** properties can also be found in the **Document** object.

Inside the **Document** object you can also find the **Revision-History** of the CVE, where you can find each change in the state of the CVE since it was originally found.  Each entry represents a change  in the vulnerability state (e.g. marked as false positive) and also provides you with the timestamp of the modification. 

```json
"revision_history": [
	{
		"date": "2025-11-02T09:42:38+01:00",
		"number": "1",
		"summary": "Detected vulnerability CVE-2020-25649."
	},
	{
		"date": "2025-11-02T09:42:38+01:00",
		"number": "2",
		"summary": "Marked vulnerability CVE-2020-25649 as false positive."
	},
	{
		"date": "2025-11-02T09:43:56+01:00",
		"number": "3",
		"summary": "Fixed vulnerability CVE-2020-25649."
	},
	{
		"date": "2025-11-02T09:54:17+01:00",
		"number": "4",
		"summary": "Detected vulnerability CVE-2020-25649."
	}
],
``` 

### Vulnerabilities Object

In **Vulnerabilities** object you can find a set of vulnerabilities associated with this product. Each vulnerability entry consist of the **CVE-ID**,  a textual description of the CVE, the current **product_status**, as well a information about which packages are affected.

```json 
"vulnerabilities": [
	{
		"cve": "CVE-2020-25649",
		"discovery_date": "2025-11-02T09:42:38+01:00"
		"notes": [
			{
				"category": "details",
				"text": "ProductID pkg:devguard/test-org/group1/test@main: unhandled for package pkg:golang/github.com/jinzhu/inflection@v1.0.0",
				"title": "state of the vulnerability in the product"
			},
			{
				"category": "description",
				"text": "A flaw was found in FasterXML Jackson Databind, where it did not have entity expansion secured properly. This flaw allows vulnerability to XML external entity (XXE) attacks. The highest threat from this vulnerability is data integrity.",
				"title": "textual description of CVE"
			}
		],
		"product_status": {
			"under_investigation": [
				"pkg:devguard/test-org/group1/test@main"
			]
		},
		"title": "CVE-2020-25649"
	}
]
```



