import { DateTime } from 'luxon';

export function parseDate(value: string): string | undefined {
  if (!value) return undefined;
  try {
    const localeCurrent = getLocale(DateTime.now());
    console.log(localeCurrent);
    if (value.length <= 10){
      let dateVal = DateTime.fromFormat(value, 'D', { locale: localeCurrent });
      return dateVal.toISODate();
    }
    let dateVal = DateTime.fromFormat(value, 'f', { locale: localeCurrent });
    debugger;
    if (dateVal.invalidReason) {
      dateVal = DateTime.fromFormat(value, 'D', { locale: localeCurrent });
      return dateVal.toISODate();
    }
    return dateVal.toISO();
  }
  catch {
    console.log('Parsing exception? ' + value);
    return undefined;
  }
}

export function formatDate(fhirDateTime: string | undefined, emptyMessage?: string, dateOnly?: boolean): string {
  if (!fhirDateTime) return emptyMessage ?? "";
  const dateVal = DateTime.fromISO(fhirDateTime);
  if (!dateVal) {
    console.log('Parsing issue? ' + fhirDateTime);
    return emptyMessage ?? "";
  }
  try {
    if (fhirDateTime.length <= 10 || dateOnly) {
      return dateVal.toLocaleString(DateTime.DATE_SHORT, { locale: getLocale(dateVal) });
    }
    return dateVal.toLocaleString(DateTime.DATETIME_SHORT, { locale: getLocale(dateVal) });
  }
  catch
  {
    console.log('Parsing exception? ' + fhirDateTime);
    return emptyMessage ?? "";
  }
}

function getLocale(val: DateTime) {
  if (val.zoneName.startsWith('Australia')) return 'en-AU';
  if (navigator.languages != undefined)
    return navigator.languages[0];
  return navigator.language;
}
