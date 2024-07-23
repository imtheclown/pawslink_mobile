// functions here deals with type custom type conversions, enums and related topics

function getEnumValueFromString<T>(enumType: T, value: string): T[keyof T] | undefined {
    // Loop through the enum keys and check if the corresponding value matches the input string
    for (const key in enumType) {
      if (enumType[key as keyof T] === value) {
        return enumType[key as keyof T];
      }
    }
    return undefined;
}
  
export {getEnumValueFromString}