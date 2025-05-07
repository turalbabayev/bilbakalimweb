# JSON-XML Adapter Web APP Design

## 1 - Wireframe

![ui_wireframe](./wireframe.drawio.png)

---
## 2 - JSON Input Field Definition

### Required Fields

- `from_msisdn` (string): (e.g., "12345678910123")
- `to_msisdn` (string): (e.g., "12345678910123")
- `message` (string): Message body in ASCII or UTF-8
- `encoding` (string):(e.g., "UTF-8")

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
---
## 3 - JSON → XML mapping rules

- All output is wrapped under `<envelope>`.
- Each top-level JSON key becomes an XML tag.
- If `field-map` exists, it provides a `type` attribute for the matching fields.
- `field-map` itself is not converted.

### Mapping Logic

1. Skip `field-map`.
2. For each JSON key:
   - Create `<key>value</key>`
   - If key exists in `field-map`, add attribute: `<key type="...">value</key>`

---

## 4  API Request Format Specification

The request format defines how the frontend will communicate with the backend using REST-style POST requests. Two separate endpoints are used: one for XML submission, and one for audit logging.

#### XML Submission API

- **Endpoint:** `POST api/xml`
- **Headers:**  
  `Content-Type: application/xml`
- **Example Body:**
  ```xml
  <envelope>
    <from_msisdn>12345678901</from_msisdn>
    <to_msisdn>12345678902</to_msisdn>
    <message>Hello!</message>
    <encoding>utf-8</encoding>
    <custom_field_1 type="string">extra_value</custom_field_1>
  </envelope>
   ``` 

#### Audit Trail Logging API
- **Endpoint:** `POST /query`
- **Headers:**  
`Content-Type: application/json`
- **Example Body:**
```json
{
  "language": "sql",
  "command": "INSERT INTO logs SET operation = 'submit_xml', status = 'success', timestamp = '2025-05-07T15:00:00Z'"
}
```

---

### 5 Mock API behavior:

---

### 6 - Component Diagram

> The diagram below shows the main modules

![compopnent_diagram](./compopnent_diagram.png)
---

### 9 – May 8 – Edge Case List

>  This checklist outlines edge cases that may occur due to user input or runtime behavior. 

- [ ] JSON body is empty
- [ ] JSON is not parsable (e.g. syntax error)
- [ ] Required fields are missing (`from_msisdn`, `to_msisdn`, `message`, `encoding`)
- [ ] `from_msisdn` or `to_msisdn` are not numeric strings
- [ ] `encoding` value is not supported (e.g. not `ascii` or `utf-8`)
- [ ] `message` field is empty or contains invalid characters
- [ ] `field-map` is provided but contains unsupported data types
- [ ] Extra fields in JSON not listed in `field-map`
- [ ] Extremely large JSON input (e.g. >100KB)
- [ ] Backend submission API is unreachable (network error)
- [ ] Audit API returns error or times out
- [ ] Duplicate submission within a short period

---

### 10 – May 8 – Test Input Matrix

This matrix defines core test scenarios to verify the app's validation and JSON → XML transformation logic. It covers both valid and invalid inputs, based on edge cases and expected behaviors.

| #  | Test Case Description                      | Input Summary                                  | Expected Result                         |
|----|--------------------------------------------|------------------------------------------------|------------------------------------------|
| 1  | Empty JSON body                            | `{}`                                           | Validation error: all required fields missing |
| 2  | Missing `encoding` field                   | JSON without `encoding`                        | Validation error                         |
| 3  | Valid minimal input                        | Required fields only, all valid                | Success – XML generated and submitted    |
| 4  | Invalid `from_msisdn`                      | `from_msisdn` contains letters                 | Validation error                         |
| 5  | Extra field not listed in `field-map`      | Extra key like `priority`, no map given        | Validation error                         |
| 6  | `field-map` has unsupported type           | `"priority": true`, type `"object"` in map     | Validation error                         |
| 7  | Valid input with field-map                 | Extra field with correct `field-map`           | Success – Field included in XML          |
| 8  | Extremely large input                      | >100KB JSON                                    | Success or timeout (depending on browser/runtime) |
| 9  | API unreachable                            | Simulate server down                           | Submission error displayed to user       |
| 10 | Audit API fails                            | Simulate audit server 500                      | Process should stop, error displayed     |

