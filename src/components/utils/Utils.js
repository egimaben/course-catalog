export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}
export const customSchemaToPlainObject = (customSchemaData) => {
  let plainObject = {};
  Object.keys(customSchemaData).forEach(key => {
    plainObject[key] = customSchemaData[key].value;
  })
  return plainObject;
}