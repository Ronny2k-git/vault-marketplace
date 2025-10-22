{
  /*
   * This file will be used to create functions to format numbers and Big numbers.
   */
}

// Create later a function to format numbers with Javascript Ecma script API.
// For example: const smallFormatter = new Intl.NumberFormat(.......etc)

const smallFormatter = Intl.NumberFormat("en", {});

console.log(smallFormatter);

export function formatNumber(
  value: number,
  formatter: Intl.NumberFormat = smallFormatter
) {
  return { value, formatter }; // Return the correct values later.
}
