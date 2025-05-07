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
