# JSON Input Field Definition

This document defines the expected JSON structure for the JSON to XML Adapter.

## Required Fields

- `from_msisdn` (string): Sender's phone number (e.g., "12345678910123")
- `to_msisdn` (string): Recipient's phone number (e.g., "12345678910123")
- `message` (string): Message body in ASCII or UTF-8
- `encoding` (string): Specifies character encoding (e.g., "UTF-8")

## Optional Field

- `field-map` (object): Describes additional fields in the JSON payload. Each key represents a field name, and its value defines the type. Accepted types are: `integer`, `string`, `boolean`, `float`.

### Example

```json
{
  "from_msisdn": "12345678910123",
  "to_msisdn": "12345678910123",
  "message": "Hello World",
  "encoding": "UTF-8",
  "priority": 1,
  "field-map": {
    "priority": "integer"
  }
}
```

# JSON → XML Mapping Rules

**Design Owner:** Tural Babayev  
**Date:** 2025-05-08  
**Deliverable:** mapping-rules.md  
**Goal:** Define how incoming JSON input will be converted into structured XML under a common root element.

---

## 1. Purpose

To define a consistent and predictable rule set for converting JSON-formatted form data into an XML structure, ensuring proper tagging, typing, and ordering for downstream API submission.

---

## 2. Mapping Strategy

- The XML output will be wrapped inside a single root element: `<envelope>`.
- Each top-level key in the input JSON will be converted into a separate child XML tag.
- If the JSON includes a `field-map` object, any key listed in it will receive a `type` attribute in its XML equivalent.
- The key `field-map` itself will not be transformed into XML.

---

## 3. Supported Field Types (from `field-map`)

Only the following types will be accepted as values inside `field-map`:
- `string`
- `integer`
- `float`
- `boolean`

These values will be added as the value of the `type` attribute on their corresponding XML tags.

---

## 4. Transformation Rules (Step-by-step)

1. Loop through each top-level key in the JSON object.
2. If the key is `"field-map"`, skip it.
3. For each key:
   - Create an XML tag with the same name as the key.
   - If the key exists in `field-map`, add `type="..."` as an attribute using the provided type.
   - Place the field's value inside the tag as its text content.
4. Group all these tags under a root `<envelope>` element.

---

## 5. Pseudocode Representation

```pseudo
for key in json_object:
    if key == "field-map":
        continue
    if key in json_object["field-map"]:
        type = json_object["field-map"][key]
        add <key type="type">value</key> inside envelope
    else:
        add <key>value</key> inside envelope

```



# JSON → XML Mapping Rules

**Date:** May 8  
**Prepared by:** Tural Babayev  
**Deliverable:** mapping-rules.md

---

## Purpose

Define how incoming JSON fields will be converted to XML elements under a root `<envelope>` tag.

---

## Rules

- All output is wrapped under `<envelope>`.
- Each top-level JSON key becomes an XML tag.
- If `field-map` exists, it provides a `type` attribute for the matching fields.
- `field-map` itself is not converted.

---

## Supported Types

Values in `field-map` must be one of:
- `string`
- `integer`
- `float`
- `boolean`

---

## Mapping Logic

1. Skip `field-map`.
2. For each JSON key:
   - Create `<key>value</key>`
   - If key exists in `field-map`, add attribute: `<key type="...">value</key>`

---

## Pseudocode

```pseudo
for key in JSON:
  if key == "field-map":
    continue
  if key in field-map:
    add <key type=field-map[key]>value</key>
  else:
    add <key>value</key>

```


### 4 – May 8 – API request format specification

Define how the converted XML will be submitted. Include method, endpoint, headers, and sample request body. REST-style. Deliver as `api-request-spec.md` by May 8.

- Endpoint: `POST http://transter.to/api/xml`  
- Method: `POST`  
- Headers:  
  - `Content-Type: application/xml`  
  - `Accept: application/json`  
- Body: XML wrapped in `<envelope>`, generated from validated JSON. If `field-map` exists, matching fields will include a `type` attribute.

**Example body:**

```xml
<envelope>
  <from_msisdn type="string">12345678910123</from_msisdn>
  <to_msisdn type="string">98765432101234</to_msisdn>
  <message type="string">Hello</message>
  <encoding type="string">UTF-8</encoding>
  <priority type="integer">1</priority>
</envelope>
```
### Component Diagram

This step defines the internal structure of the application by identifying its main components and the data flow between them. The goal is to show how responsibilities are divided and how data moves through the system from user input to external API calls.

The diagram will include the following modules:

- **UI Module**  
  Handles user interaction. Captures JSON input and displays results or errors.

- **Validator Module**  
  Checks that required fields exist in the input and that the JSON format is valid.

- **Converter Module**  
  Converts validated JSON into XML under a root `<envelope>` tag. Handles `field-map` type conversion.

- **API Client Module**  
  Sends XML data to the submission API and logs operations via the audit API.

Arrows will show the flow from UI → Validator → Converter → API Client. The diagram will also indicate mock API use during development.


