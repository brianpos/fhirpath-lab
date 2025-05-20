//go:build js && wasm

package evaluate

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"

	"github.com/DAMEDIC/fhir-toolbox-go/fhirpath"
	"github.com/cockroachdb/apd/v3"
)

// jsonObject implements fhirpath.Element for JSON objects
type jsonObject struct {
	value map[string]any
}

func (o jsonObject) Children(name ...string) fhirpath.Collection {
	if len(name) == 0 {
		// Return all children
		result := make(fhirpath.Collection, 0, len(o.value))
		for _, v := range o.value {
			if element, err := jsonToElement(v); err == nil {
				result = append(result, element)
			}
		}
		return result
	}
	// Return specific children
	result := make(fhirpath.Collection, 0, len(name))
	for _, n := range name {
		if v, ok := o.value[n]; ok {
			if element, err := jsonToElement(v); err == nil {
				result = append(result, element)
			}
		}
	}
	return result
}

func (o jsonObject) ToBoolean(explicit bool) (fhirpath.Boolean, bool, error) {
	return false, false, fmt.Errorf("cannot convert object to boolean")
}

func (o jsonObject) ToString(explicit bool) (fhirpath.String, bool, error) {
	return "", false, fmt.Errorf("cannot convert object to string")
}

func (o jsonObject) ToInteger(explicit bool) (fhirpath.Integer, bool, error) {
	return 0, false, fmt.Errorf("cannot convert object to integer")
}

func (o jsonObject) ToDecimal(explicit bool) (fhirpath.Decimal, bool, error) {
	return fhirpath.Decimal{}, false, fmt.Errorf("cannot convert object to decimal")
}

func (o jsonObject) ToDate(explicit bool) (fhirpath.Date, bool, error) {
	return fhirpath.Date{}, false, fmt.Errorf("cannot convert object to date")
}

func (o jsonObject) ToTime(explicit bool) (fhirpath.Time, bool, error) {
	return fhirpath.Time{}, false, fmt.Errorf("cannot convert object to time")
}

func (o jsonObject) ToDateTime(explicit bool) (fhirpath.DateTime, bool, error) {
	return fhirpath.DateTime{}, false, fmt.Errorf("cannot convert object to datetime")
}

func (o jsonObject) ToQuantity(explicit bool) (fhirpath.Quantity, bool, error) {
	return fhirpath.Quantity{}, false, fmt.Errorf("cannot convert object to quantity")
}

func (o jsonObject) Equal(other fhirpath.Element, _noReverseTypeConversion ...bool) (bool, bool) {
	if otherObj, ok := other.(jsonObject); ok {
		return reflect.DeepEqual(o.value, otherObj.value), true
	}
	return false, false
}

func (o jsonObject) Equivalent(other fhirpath.Element, _noReverseTypeConversion ...bool) bool {
	eq, ok := o.Equal(other, _noReverseTypeConversion...)
	return eq && ok
}

func (o jsonObject) TypeInfo() fhirpath.TypeInfo {
	return fhirpath.SimpleTypeInfo{Name: "Object"}
}

func (o jsonObject) MarshalJSON() ([]byte, error) {
	return json.Marshal(o.value)
}

func (o jsonObject) String() string {
	return fmt.Sprintf("%v", o.value)
}

// jsonArray implements fhirpath.Element for JSON arrays
type jsonArray struct {
	value []any
}

func (a jsonArray) Children(name ...string) fhirpath.Collection {
	if len(name) == 0 {
		// Return all children
		result := make(fhirpath.Collection, 0, len(a.value))
		for _, v := range a.value {
			if element, err := jsonToElement(v); err == nil {
				result = append(result, element)
			}
		}
		return result
	}
	// Return specific children
	result := make(fhirpath.Collection, 0, len(name))
	for _, n := range name {
		if i, err := strconv.Atoi(n); err == nil && i >= 0 && i < len(a.value) {
			if element, err := jsonToElement(a.value[i]); err == nil {
				result = append(result, element)
			}
		}
	}
	return result
}

func (a jsonArray) ToBoolean(explicit bool) (fhirpath.Boolean, bool, error) {
	return false, false, fmt.Errorf("cannot convert array to boolean")
}

func (a jsonArray) ToString(explicit bool) (fhirpath.String, bool, error) {
	return "", false, fmt.Errorf("cannot convert array to string")
}

func (a jsonArray) ToInteger(explicit bool) (fhirpath.Integer, bool, error) {
	return 0, false, fmt.Errorf("cannot convert array to integer")
}

func (a jsonArray) ToDecimal(explicit bool) (fhirpath.Decimal, bool, error) {
	return fhirpath.Decimal{}, false, fmt.Errorf("cannot convert array to decimal")
}

func (a jsonArray) ToDate(explicit bool) (fhirpath.Date, bool, error) {
	return fhirpath.Date{}, false, fmt.Errorf("cannot convert array to date")
}

func (a jsonArray) ToTime(explicit bool) (fhirpath.Time, bool, error) {
	return fhirpath.Time{}, false, fmt.Errorf("cannot convert array to time")
}

func (a jsonArray) ToDateTime(explicit bool) (fhirpath.DateTime, bool, error) {
	return fhirpath.DateTime{}, false, fmt.Errorf("cannot convert array to datetime")
}

func (a jsonArray) ToQuantity(explicit bool) (fhirpath.Quantity, bool, error) {
	return fhirpath.Quantity{}, false, fmt.Errorf("cannot convert array to quantity")
}

func (a jsonArray) Equal(other fhirpath.Element, _noReverseTypeConversion ...bool) (bool, bool) {
	if otherArr, ok := other.(jsonArray); ok {
		return reflect.DeepEqual(a.value, otherArr.value), true
	}
	return false, false
}

func (a jsonArray) Equivalent(other fhirpath.Element, _noReverseTypeConversion ...bool) bool {
	eq, ok := a.Equal(other, _noReverseTypeConversion...)
	return eq && ok
}

func (a jsonArray) TypeInfo() fhirpath.TypeInfo {
	return fhirpath.SimpleTypeInfo{Name: "Array"}
}

func (a jsonArray) MarshalJSON() ([]byte, error) {
	return json.Marshal(a.value)
}

func (a jsonArray) String() string {
	return fmt.Sprintf("%v", a.value)
}

// jsonToElement converts a JSON value to a FHIRPath Element
func jsonToElement(value any) (fhirpath.Element, error) {
	switch v := value.(type) {
	case map[string]any:
		return jsonObject{value: v}, nil
	case []any:
		return jsonArray{value: v}, nil
	case string:
		return fhirpath.String(v), nil
	case json.Number:
		dec, err := newDecimalFromJSONNumber(v)
		if err != nil {
			return nil, err
		}
		return dec, nil
	case bool:
		return fhirpath.Boolean(v), nil
	case nil:
		return fhirpath.String(""), nil // Use empty string for nil values
	default:
		return nil, fmt.Errorf("unsupported type: %T", value)
	}
}

func newDecimalFromJSONNumber(num json.Number) (fhirpath.Decimal, error) {
	d := apd.New(0, 0)
	_, _, err := d.SetString(num.String())
	if err != nil {
		return fhirpath.Decimal{}, fmt.Errorf("invalid decimal: %v", num)
	}
	return fhirpath.Decimal{Value: d}, nil
}
