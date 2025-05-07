# JSON-XML Adapter Web APP Design

## 1 - Wireframe

![ui_wireframe](./wireframe.drawio.png)


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
