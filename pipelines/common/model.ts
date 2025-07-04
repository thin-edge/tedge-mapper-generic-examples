/*
  Assertions
*/
export function assertNonEmptyValue(obj, key) {
  if (
    obj[key] === null ||
    obj[key] === undefined ||
    obj[key] === "" ||
    obj[key] === "" ||
    Number.isNaN(obj[key])
  ) {
    throw new Error(
      `Missing required value. expected object to contain non-empty key. key=${key}, object=${obj}`,
    );
  }
}

export function assertTruthy(obj, key) {
  if (!obj[key]) {
    throw new Error(`Expected value to be truthy. key=${key}, object=${obj}`);
  }
}

export function assertFinite(obj, key) {
  if (!Number.isFinite(obj[key])) {
    throw new Error(
      `Expected value to be finite. key=${key}, value=${obj[key]}`,
    );
  }
}
